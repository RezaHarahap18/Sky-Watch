import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 
import styles from './AqiGauge.module.css'; 

// Fungsi untuk menentukan warna gauge berdasarkan nilai AQI
const getAqiColor = (aqi) => {
  if (aqi <= 50) return "#28a745"; // Hijau (Baik)
  if (aqi <= 100) return "#ffc107"; // Kuning (Sedang)
  if (aqi <= 150) return "#fd7e14"; // Oranye (Tidak Sehat untuk Kelompok Sensitif)
  if (aqi <= 200) return "#dc3545"; // Merah (Tidak Sehat)
  if (aqi <= 300) return "#6f42c1"; // Ungu (Sangat Tidak Sehat)
  return "#721c24"; 
};

function AqiGauge({ aqiValue, category, criticalPollutant }) {
  const aqiColor = getAqiColor(aqiValue);

  return (
    <div className={styles.gaugeContainer}>
      <div style={{ width: '200px', height: '200px' }}>
        <CircularProgressbar
          value={aqiValue}
          text={`${aqiValue}`}
          maxValue={300} 
          strokeWidth={10}
          styles={buildStyles({
            // Warna
            pathColor: aqiColor,
            textColor: aqiColor,
            trailColor: '#e9ecef', 

            // Styling Teks
            textSize: '24px',

            // Animasi
            pathTransitionDuration: 0.8,
          })}
        />
      </div>
      <div className={styles.gaugeInfo}>
        <h3 style={{ color: aqiColor }} className={styles.gaugeCategory}>{category}</h3>
        <p className={styles.gaugeCriticalPollutant}>Polutan Kritis: <strong>{criticalPollutant}</strong></p>
      </div>
    </div>
  );
}

export default AqiGauge;