import React from 'react';
import styles from '../../pages/InformationPage.module.css';

const tipsSaatBuruk = [
  { icon: '🏠', text: "<strong>Pantau Informasi AQI:</strong> Gunakan Sky Watch sebelum beraktivitas di luar." },
  { icon: '🚶‍♀️', text: "<strong>Kurangi Aktivitas Luar Ruangan:</strong> Batasi waktu di luar, terutama aktivitas fisik berat, saat AQI tidak sehat." },
  { icon: '😷', text: "<strong>Gunakan Masker yang Tepat:</strong> Jika harus keluar, gunakan masker N95/KN95 yang terpasang dengan benar." },
  {
    icon: '🌬️',
    text: "<strong>Jaga Udara Dalam Ruangan Tetap Bersih:</strong>",
    subItems: [
      "Tutup jendela dan pintu saat kualitas udara luar buruk.",
      "Gunakan pembersih udara (air purifier) dengan filter HEPA jika memungkinkan.",
      "Hindari merokok atau menggunakan produk aerosol di dalam ruangan."
    ]
  },
  { icon: '🧑', text: "<strong>Perhatikan Gejala Kesehatan:</strong> Segera konsultasi dokter jika mengalami gejala pernapasan atau iritasi yang tidak biasa." }
];

const langkahProaktif = [
  { icon: '🚗', text: "<strong>Kurangi Penggunaan Kendaraan Pribadi:</strong> Pilih transportasi umum, bersepeda, atau berjalan kaki." },
  { icon: '💡', text: "<strong>Hemat Energi:</strong> Matikan lampu dan peralatan elektronik saat tidak digunakan untuk mengurangi emisi." },
  { icon: '♻️', text: "<strong>Hindari Membakar Sampah:</strong> Kelola sampah dengan bijak untuk mencegah polusi tambahan." },
  { icon: '🌳', text: "<strong>Tanam Pohon dan Tanaman:</strong> Tanaman membantu menyaring udara dan menghasilkan oksigen." },
  { icon: '🗣️', text: "<strong>Edukasi Lingkungan Sekitar:</strong> Bagikan informasi pentingnya kualitas udara kepada orang lain." }
];

function TipList({ items }) {
  return (
    <ul className={styles.tipsCategoryList}>
      {items.map((item, index) => (
        <li key={index} className={styles.tipsCategoryListItem}>
          <span className={styles.tipsCategoryListIcon}>{item.icon}</span>
          <span dangerouslySetInnerHTML={{ __html: item.text }} />
          {item.subItems && (
            <ul className={styles.tipsSubList}>
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex} className={styles.tipsSubListItem}>
                  {subItem}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function ProtectionTipsSection() {
  return (
    <section id="cara-melindungi-diri" className={`${styles.infoSection} ${styles.fadeInElement}`}>
       <div className="d-flex align-items-center mb-3">
        <span className={`${styles.sectionIcon} me-3`}>🛡️</span>
        <h2 className={styles.sectionTitle}>Cara Melindungi Diri & Langkah Proaktif</h2>
      </div>
      <p className={styles.paragraph}>
        Mengetahui kualitas udara adalah langkah pertama. Langkah berikutnya adalah mengambil tindakan
        untuk melindungi diri Anda dan keluarga, serta berkontribusi pada udara yang lebih bersih.
      </p>

      <div className="row mt-4 pt-2 g-4">
        <div className="col-lg-6 d-flex">
          <div className={`${styles.tipsPanel} w-100`}>
            <div className="d-flex align-items-center mb-3">
              <span className={`${styles.categoryIcon} ${styles.iconBadAir} me-2`}>⚠️</span>
              <h3 className={`${styles.subSectionTitle} mb-0`}>Saat Kualitas Udara Buruk:</h3>
            </div>
            <TipList items={tipsSaatBuruk} />
          </div>
        </div>

        <div className="col-lg-6 d-flex">
          <div className={`${styles.tipsPanel} ${styles.panelProactive} w-100`}>
            <div className="d-flex align-items-center mb-3">
              <span className={`${styles.categoryIcon} ${styles.iconProactive} me-2`}>🌿</span>
              <h3 className={`${styles.subSectionTitle} mb-0`}>Langkah Proaktif untuk Udara Lebih Baik:</h3>
            </div>
            <TipList items={langkahProaktif} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProtectionTipsSection;