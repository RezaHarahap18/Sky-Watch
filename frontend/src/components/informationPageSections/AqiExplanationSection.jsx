import React from 'react';
import styles from '../../pages/InformationPage.module.css';

const aqiCategories = [
  { range: "0 - 50", category: "Baik", colorClass: styles.colorCellBaik, textColorClass: styles.textDark, description: "Kualitas udara memuaskan, risiko kesehatan minimal." },
  { range: "51 - 100", category: "Sedang", colorClass: styles.colorCellSedang, textColorClass: styles.textDark, description: "Kualitas udara dapat diterima, namun ada potensi dampak bagi kelompok sensitif." },
  { range: "101 - 150", category: "Tidak Sehat untuk Kelompok Sensitif", colorClass: styles.colorCellTidakSehatKelompokSensitif, textColorClass: styles.textDark, description: "Kelompok sensitif dapat mengalami dampak kesehatan. Masyarakat umum cenderung tidak terdampak." },
  { range: "151 - 200", category: "Tidak Sehat", colorClass: styles.colorCellTidakSehat, textColorClass: styles.textDark, description: "Setiap orang berisiko mengalami dampak kesehatan; kelompok sensitif berisiko lebih serius." },
  { range: "201 - 300", category: "Sangat Tidak Sehat", colorClass: styles.colorCellSangatTidakSehat, textColorClass: styles.textDark, description: "Peringatan kesehatan darurat. Seluruh populasi sangat mungkin terdampak." },
  { range: "300+", category: "Berbahaya", colorClass: styles.colorCellBerbahaya, textColorClass: styles.textDark, description: "Kondisi berbahaya bagi semua orang! Hindari aktivitas luar." }
];

function AqiExplanationSection() {
  return (
    <section id="apa-itu-aqi" className={`${styles.infoSection} ${styles.fadeInElement}`}>
      <div className="d-flex align-items-center mb-3">
        <span className={`${styles.sectionIcon} me-3`}>📊</span>
        <h2 className={styles.sectionTitle}>Apa Itu Indeks Kualitas Udara (AQI)?</h2>
      </div>
      <p className={styles.paragraph}>
        Indeks Kualitas Udara (AQI) adalah standar pengukuran yang digunakan untuk menggambarkan
        seberapa bersih atau tercemarnya udara di suatu lokasi, serta potensi dampaknya terhadap kesehatan.
        Semakin tinggi nilai AQI, semakin tinggi pula tingkat polusi udara dan risiko kesehatan yang terkait.
        Sky Watch menggunakan standar ini untuk memberikan Anda informasi yang akurat dan mudah dipahami.
      </p>

      <h3 className={styles.subSectionTitle}>Memahami Skala Kategori AQI</h3>
      <p className={styles.paragraph}>
        Skala AQI dibagi menjadi beberapa kategori dengan kode warna untuk memudahkan identifikasi visual.
        Setiap kategori menunjukkan tingkat perhatian kesehatan yang berbeda:
      </p>
      
      <div className="row g-3 my-4"> 
        {aqiCategories.map(cat => (
          <div key={cat.category} className="col-lg-4 col-md-6 col-sm-12 d-flex">
            <div className={`${styles.aqiCategoryCardAlt} p-3 rounded shadow-sm h-100 w-100`}>
              <div className={`${styles.colorAccent} ${cat.colorClass}`}></div>
              <div className={styles.cardContent}>
                <div className={`fw-bold mb-1 ${cat.textColorClass}`.trim()}>{cat.category}</div>
                <div className={`${styles.aqiCategoryRangeAlt} ${cat.textColorClass ? '' : styles.textDark}`.trim()}>{cat.range}</div>
                <small className={`${styles.cardDescriptionAlt} ${cat.textColorClass ? '' : styles.textDark}`.trim()}>{cat.description}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className={`${styles.paragraph} mt-4 fst-italic text-muted text-center`}>
        Gunakan informasi AQI dari Sky Watch untuk merencanakan aktivitas Anda dan melindungi kesehatan keluarga.
      </p>
    </section>
  );
}

export default AqiExplanationSection;