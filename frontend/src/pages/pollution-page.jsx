import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import JakartaMap from '../components/jakartaMap';
import AqiGauge from '../components/AqiGauge';
import PollutantDetails from '../components/PollutantDetails';
import PredictionChart from '../components/PredictionChart';
import Footer from "../components/footer";
import '../styles/style.css';

function PollutionPage() {
  const stasiunOptions = [
    "DKI 1 : Bundaran HI",
    "DKI 2 : Kelapa Gading",
    "DKI 3 : Jagakarsa",
    "DKI 4 : Lubang Buaya",
    "DKI 5 : Kebon Jeruk"
  ];
  
  const stationCoordinates = {
    "DKI 1 : Bundaran HI": { lat: -6.1954, lon: 106.8229 },
    "DKI 2 : Kelapa Gading": { lat: -6.1557, lon: 106.9073 },
    "DKI 3 : Jagakarsa": { lat: -6.3292, lon: 106.8255 },
    "DKI 4 : Lubang Buaya": { lat: -6.2847, lon: 106.8997 },
    "DKI 5 : Kebon Jeruk": { lat: -6.1979, lon: 106.7592 }
  };

  const [selectedStation, setSelectedStation] = useState(stasiunOptions[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [predictionData, setPredictionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictionData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://127.0.0.1:8000/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stasiun: selectedStation }),
        });

        if (!response.ok) throw new Error(`Gagal mengambil data untuk stasiun ${selectedStation}`);
        
        const data = await response.json();
        setPredictionData(data);
        
        setSelectedDate(new Date(data.prediksi_15_hari[0].tanggal + 'T00:00:00'));
      } catch (e) {
        setError(e.message);
        console.error("Gagal mengambil data prediksi:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPredictionData();
  }, [selectedStation]);

  const handleChartClick = (chartData) => {
    if (chartData && chartData.activePayload && chartData.activePayload.length > 0) {
      const clickedDateString = chartData.activePayload[0].payload.tanggal;
      setSelectedDate(new Date(clickedDateString + 'T00:00:00'));
    }
  };

  let currentPrediction = null;
  let minDate = null;
  let maxDate = null;

  if (predictionData) {
    const dates = predictionData.prediksi_15_hari.map(p => new Date(p.tanggal + 'T00:00:00'));
    minDate = dates[0];
    maxDate = dates[dates.length - 1];

    const selectedDateString = selectedDate.toISOString().split('T')[0];
    currentPrediction = predictionData.prediksi_15_hari.find(p => p.tanggal === selectedDateString);
    
    if (!currentPrediction) {
      currentPrediction = predictionData.prediksi_15_hari[0];
    }
  }

  return (
    <>
        <div className="container mt-5 pt-4 mb-5">
          <div className="text-center pt-3 pb-2">
          <h2 className="mb-3">Dashboard Kualitas Udara Jakarta</h2>
        </div>

        <div className="row justify-content-center align-items-center g-3 my-4 p-3 bg-light rounded shadow-sm">
          {/* Kolom untuk Pemilih Stasiun */}
          <div className="col-lg-6">
            <div className="row align-items-center">
              <div className="col-4 text-end">
                <label htmlFor="station-select" className="form-label fw-bold mb-0">Stasiun:</label>
              </div>
              <div className="col-8">
                <select
                  id="station-select"
                  className="form-select"
                  value={selectedStation}
                  onChange={(e) => setSelectedStation(e.target.value)}
                  disabled={isLoading}
                >
                  {stasiunOptions.map(stasiun => (
                    <option key={stasiun} value={stasiun}>{stasiun}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Kolom untuk Pemilih Tanggal */}
          <div className="col-lg-6">
            <div className="row align-items-center">
              <div className="col-4 text-end">
                <label htmlFor="date-picker" className="form-label fw-bold mb-0">Tanggal:</label>
              </div>
              <div className="col-8">
                <DatePicker
                  id="date-picker"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  minDate={minDate}
                  maxDate={maxDate}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {isLoading && <div className="text-center"><h4>Memuat data untuk {selectedStation}...</h4></div>}
        {error && <div className="text-center text-danger"><h4>Error: {error}</h4></div>}

        {!isLoading && !error && predictionData && currentPrediction && (
          <>
            <div className="text-center mb-3">
              <p className="h5 text-muted">Data Prediksi untuk: <strong>{currentPrediction.tanggal}</strong></p>
            </div>

            <div className="row justify-content-center my-4">
              <div className="col-auto">
                <AqiGauge
                  aqiValue={currentPrediction.max}
                  category={currentPrediction.categori}
                  criticalPollutant={currentPrediction.critical}
                />
              </div>
            </div>
            
            <PollutantDetails dailyData={currentPrediction} />

            <PredictionChart 
              predictionData={predictionData.prediksi_15_hari} 
              onChartClick={handleChartClick} 
            />

            <JakartaMap 
              dailyData={currentPrediction} 
              coords={stationCoordinates[selectedStation]}
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default PollutionPage;