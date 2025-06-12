import React from 'react';
import styles from './PollutantDetails.module.css';

import { BiHappyBeaming, BiMask, BiHomeHeart, BiWind, BiRun, BiError, BiShieldQuarter, BiSun, BiGasPump } from 'react-icons/bi';

// Fungsi untuk mendapatkan rekomendasi berdasarkan kategori AQI
const getRecommendations = (category, criticalPollutant) => {
  const recommendations = {
    "BAIK": [
      { icon: <BiHappyBeaming />, text: "Kualitas udara sangat baik, ideal untuk beraktivitas di luar." },
    ],
    "SEDANG": [
      { icon: <BiMask />, text: "Kelompok sensitif disarankan mengurangi aktivitas fisik berat di luar ruangan." },
      { icon: <BiHomeHeart />, text: "Masyarakat umum masih bisa beraktivitas normal dengan kewaspadaan." },
    ],
    "TIDAK SEHAT": [
      { icon: <BiMask />, text: "Gunakan masker (N95/KN95 disarankan) jika harus beraktivitas di luar." },
      { icon: <BiRun />, text: "Kurangi aktivitas berat di luar ruangan, terutama bagi kelompok sensitif." },
      { icon: <BiWind />, text: "Pertimbangkan untuk menggunakan pembersih udara (air purifier) di dalam ruangan." },
    ],
    "SANGAT TIDAK SEHAT": [
      { icon: <BiError />, text: "PERINGATAN KESEHATAN! Hindari semua aktivitas di luar ruangan jika memungkinkan." },
      { icon: <BiHomeHeart />, text: "Jaga anak-anak, lansia, dan penderita gangguan pernapasan tetap di dalam ruangan." },
    ],
    "BERBAHAYA": [
      { icon: <BiShieldQuarter />, text: "BAHAYA! Semua orang berisiko tinggi terkena dampak serius. Tetap di dalam ruangan!" },
      { icon: <BiHomeHeart />, text: "Tutup semua jendela dan pintu, gunakan pembersih udara jika ada." },
    ]
  };

  let finalRecommendations = recommendations[category] || [];
  if (criticalPollutant === "O3") {
    finalRecommendations.push({ icon: <BiSun />, text: "Hindari olahraga outdoor pada siang/sore hari saat puncak ozon." });
  }
  if (criticalPollutant === "CO") {
    finalRecommendations.push({ icon: <BiGasPump />, text: "Waspadai area dengan lalu lintas padat atau ruang berventilasi buruk." });
  }

  return finalRecommendations;
};

function PollutantDetails({ dailyData }) {
  if (!dailyData) return null;

  const pollutants = [
    { name: 'PM2.5', value: dailyData['PM2.5'] },
    { name: 'PM10', value: dailyData['PM10'] },
    { name: 'SO₂', value: dailyData['SO2'] },
    { name: 'CO', value: dailyData['CO'] },
    { name: 'O₃', value: dailyData['O3'] },
    { name: 'NO₂', value: dailyData['NO2'] },
  ];

  const recommendations = getRecommendations(dailyData.categori, dailyData.critical);

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Rincian Polutan</h4>
        <div className={styles.pollutantGrid}>
          {pollutants.map(p => (
            <div key={p.name} className={styles.pollutantStatCard}>
              <div className={styles.pollutantName}>{p.name}</div>
              <div className={styles.pollutantValue}>{p.value}</div>
              <div className={styles.pollutantUnit}>µg/m³</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Saran Aktivitas</h4>
        <div className={styles.recommendationsList}>
          {recommendations.map((rec, index) => (
            <div key={index} className={styles.recommendationItem}>
              <span className={styles.recommendationIcon}>{rec.icon}</span> 
              <p className={styles.recommendationText}>{rec.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PollutantDetails;