import pandas as pd
import numpy as np
import joblib
import json
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from tensorflow.keras.models import load_model
import os


class PredictionInput(BaseModel):
    stasiun: str


app = FastAPI(title="API Prediksi Kualitas Udara")

origins = [
    "http://localhost:5173", 
    "https://skyywatchh.netlify.app/" #tambahin ini
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

model = "model.keras"
scaler = "minmax_scaler.pkl"
bekal_data = "historis_for_data_prediksi"
pollutant_columns = ["PM2.5", "PM10", "SO2", "CO", "O3", "NO2"]
input_window = 30
output_window = 15
model_columns = [
    "PM2.5",
    "PM10",
    "SO2",
    "CO",
    "O3",
    "NO2",
    "stasiun_DKI 1 : Bundaran HI",
    "stasiun_DKI 2 : Kelapa Gading",
    "stasiun_DKI 3 : Jagakarsa",
    "stasiun_DKI 4 : Lubang Buaya",
    "stasiun_DKI 5 : Kebon Jeruk",
]


@app.on_event("startup")
def load_artifacts():
    global model, scaler, bekal_data, model_columns, pollutant_columns
    print("--- Memuat semua artefak yang diperlukan ---")
    try:
        model = load_model('model.keras')
        scaler = joblib.load('minmax_scaler.pkl')
        bekal_data = pd.read_csv("historis_for_data_prediksi.csv", parse_dates=['tanggal'])
        
        # Definisikan kolom secara manual agar tidak bergantung pada file json
        pollutant_columns = ['PM2.5', 'PM10', 'SO2', 'CO', 'O3', 'NO2']
        model_columns = [
            'PM2.5', 'PM10', 'SO2', 'CO', 'O3', 'NO2',
            'stasiun_DKI 1 : Bundaran HI', 'stasiun_DKI 2 : Kelapa Gading',
            'stasiun_DKI 3 : Jagakarsa', 'stasiun_DKI 4 : Lubang Buaya',
            'stasiun_DKI 5 : Kebon Jeruk'
        ]
        print("[SUCCESS] Semua artefak berhasil dimuat.")
    except Exception as e:
        print(f"[FATAL ERROR] Gagal memuat artefak: {e}")


@app.post("/predict")
def predict(input_data: PredictionInput):
    if not model or bekal_data is None:
        raise HTTPException(status_code=503, detail="Model atau data input belum siap.")
    
    try:
        # Ambil data input dari "bekal" yang sudah dimuat
        input_df = bekal_data[bekal_data['stasiun'] == input_data.stasiun]
        if len(input_df) < input_window:
             raise ValueError(f"Data input untuk stasiun '{input_data.stasiun}' tidak cukup.")

        # Preprocessing, Prediksi, Postprocessing
        input_siap = preprocess_input_for_prediction(input_df)
        prediksi_scaled = model.predict(input_siap)
        prediksi_asli = postprocess_output(prediksi_scaled)
        
        # Format hasil akhir 
        hasil_akhir = format_prediction_to_json(prediksi_asli)
        
        return {"stasiun_prediksi": input_data.stasiun, "prediksi_15_hari": hasil_akhir}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan internal: {str(e)}")


# Fungsi preprocessing
def get_latest_data_for_station(stasiun_name, num_days):
    """FUNGSI SIMULASI. Ganti dengan query database Anda."""
    dates = pd.to_datetime(pd.date_range(end=pd.Timestamp.now(), periods=num_days))
    data = {"tanggal": dates, "stasiun": [stasiun_name] * num_days}
    for col in pollutant_columns:
        data[col] = np.random.rand(num_days) * (50 if "PM" in col else 20)
    return pd.DataFrame(data)

# Fungsi preprocessing
def preprocess_input_for_prediction(df):
    df_copy = df.copy()
    df_copy[pollutant_columns] = np.sqrt(df_copy[pollutant_columns].clip(lower=0))
    df_processed = pd.DataFrame(0, index=df_copy.index, columns=model_columns).astype('float32')
    df_processed[pollutant_columns] = df_copy[pollutant_columns]
    stasiun_col_name = f"stasiun_{df_copy['stasiun'].iloc[0]}"
    if stasiun_col_name in df_processed.columns:
        df_processed[stasiun_col_name] = 1.0
    df_processed[pollutant_columns] = scaler.transform(df_processed[pollutant_columns])
    input_array = df_processed.values
    return np.expand_dims(input_array, axis=0)

def postprocess_output(prediction_scaled):
    prediction_reshaped = prediction_scaled.reshape(output_window, len(pollutant_columns))
    prediction_sqrt = scaler.inverse_transform(prediction_reshaped)
    return np.square(prediction_sqrt)

def get_ispu_category(value):
    if value <= 50: return 'BAIK'
    elif value <= 100: return 'SEDANG'
    elif value <= 199: return 'TIDAK SEHAT'
    elif value <= 299: return 'SANGAT TIDAK SEHAT'
    else: return 'BERBAHAYA'

def format_prediction_to_json(prediction_array):
    # Dapatkan tanggal mulai dari info_terakhir.json atau dari data bekal
    try:
        with open('info_terakhir.json', 'r') as f:
            info_terakhir = json.load(f)
        tanggal_mulai = pd.to_datetime(info_terakhir['tanggal_terakhir']) + pd.Timedelta(days=1)
    except FileNotFoundError:
        # Fallback jika file info_terakhir.json tidak ada
        tanggal_mulai = bekal_data['tanggal'].max() + pd.Timedelta(days=1)

    prediction_dates = pd.date_range(start=tanggal_mulai, periods=output_window)
    
    # 1. Buat DataFrame dari hasil prediksi
    pred_df = pd.DataFrame(prediction_array, columns=pollutant_columns, index=prediction_dates)
    pred_df.index.name = 'tanggal'
    
    # 2. Bulatkan semua nilai polutan ke bilangan bulat
    pred_df[pollutant_columns] = pred_df[pollutant_columns].round(0).astype(int)
    
    # 3. Hitung kolom tambahan
    pred_df['max'] = pred_df[pollutant_columns].max(axis=1)
    pred_df['critical'] = pred_df[pollutant_columns].idxmax(axis=1)
    pred_df['categori'] = pred_df['max'].apply(get_ispu_category)
    
    # Reset indeks agar tanggal menjadi kolom biasa
    pred_df.reset_index(inplace=True)
    pred_df['tanggal'] = pred_df['tanggal'].dt.strftime('%Y-%m-%d')
    
    # 4. Konversi DataFrame yang sudah lengkap ke format JSON
    return json.loads(pred_df.to_json(orient='records'))

#Server
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)