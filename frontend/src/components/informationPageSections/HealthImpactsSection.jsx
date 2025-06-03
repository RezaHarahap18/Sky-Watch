import React, { useState } from 'react';
import styles from '../../pages/InformationPage.module.css';

const shortTermImpactsData = {
  title: "Dampak Jangka Pendek",
  icon: "⏱️",
  items: [
    "Iritasi pada mata, hidung, tenggorokan, dan saluran pernapasan.",
    "Batuk dan dahak berlebih.",
    "Sesak napas dan kesulitan bernapas.",
    "Memicu serangan asma pada penderita asma.",
    "Memperburuk gejala bronkitis dan PPOK.",
    "Sakit kepala dan pusing.",
    "Kelelahan yang tidak biasa."
  ]
};

const longTermImpactsData = {
  title: "Dampak Jangka Panjang",
  icon: "🗓️",
  items: [
    "Peningkatan risiko infeksi saluran pernapasan.",
    "Perkembangan atau perburukan penyakit pernapasan kronis (asma, bronkitis kronis, PPOK).",
    "Penurunan fungsi paru-paru secara permanen.",
    "Peningkatan risiko penyakit kardiovaskular (serangan jantung, stroke).",
    "Peningkatan risiko kanker paru-paru dan beberapa jenis kanker lainnya.",
    "Dampak negatif pada perkembangan sistem saraf dan fungsi kognitif (terutama anak-anak).",
    "Masalah pada kehamilan (kelahiran prematur, berat badan lahir rendah)."
  ]
};

const vulnerableGroupsData = {
  title: "Kelompok Rentan",
  icon: "👥",
  items: [
    { group: "Anak-anak", reason: "Paru-paru mereka masih dalam tahap perkembangan dan cenderung lebih banyak beraktivitas di luar." },
    { group: "Lansia", reason: "Fungsi organ tubuh mungkin menurun dan seringkali memiliki kondisi kesehatan bawaan." },
    { group: "Orang dengan penyakit paru-paru", reason: "Seperti penderita asma, bronkitis, atau PPOK." },
    { group: "Orang dengan penyakit jantung", reason: "Polusi udara dapat memperburuk kondisi kardiovaskular." },
    { group: "Ibu hamil", reason: "Paparan polusi dapat berdampak pada kesehatan ibu dan perkembangan janin." },
    { group: "Pekerja luar ruangan", reason: "Terpapar polusi udara dalam durasi yang lebih lama." }
  ]
};

const accordionData = [shortTermImpactsData, longTermImpactsData, vulnerableGroupsData];

function AccordionItem({ title, icon, items, isOpen, onToggle }) {
  return (
    <div className={styles.accordionItem}>
      <button
        className={`${styles.accordionHeader} ${isOpen ? styles.active : ''}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`${styles.categoryIcon} me-2`}>{icon}</span>
        {title}
        <span className={styles.accordionToggleIcon}>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className={styles.accordionContent}>
          <ul className={`${styles.customList} mt-2`}>
            {items.map((item, index) => (
              <li key={index} className={styles.customListItem}>
                {typeof item === 'string' ? item : (
                  <>
                    <strong>{item.group}:</strong> {item.reason}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function HealthImpactsSection() {
  const initialOpenState = {};
  accordionData.forEach((_, index) => {
    initialOpenState[index] = false;
  });
  const [openSections, setOpenSections] = useState(initialOpenState);

  const handleToggle = (index) => {
    setOpenSections(prevOpenSections => ({
      ...prevOpenSections,
      [index]: !prevOpenSections[index]
    }));
  };

  return (
    <section id="dampak-kesehatan" className={`${styles.infoSection} ${styles.fadeInElement}`}>
      <div className="d-flex align-items-center mb-3">
        <span className={`${styles.sectionIcon} me-3`}>💔</span>
        <h2 className={styles.sectionTitle}>Dampak Polusi Udara Terhadap Kesehatan</h2>
      </div>
      <p className={styles.paragraph}>
        Paparan polusi udara, bahkan dalam jangka pendek, dapat memiliki berbagai dampak negatif
        bagi kesehatan manusia. Klik pada setiap kategori di bawah untuk melihat detailnya:
      </p>

      <div className={`${styles.accordionContainer} mt-4`}>
        {accordionData.map((sectionData, index) => (
          <AccordionItem
            key={index}
            title={sectionData.title}
            icon={sectionData.icon}
            items={sectionData.items}
            isOpen={openSections[index]}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>

      <p className={`${styles.paragraph} mt-4 fst-italic text-center text-muted`}>
        SKY WATCH hadir untuk memberikan informasi yang Anda butuhkan agar dapat mengambil
        tindakan pencegahan yang tepat bagi diri sendiri dan orang-orang yang Anda sayangi.
      </p>
    </section>
  );
}

export default HealthImpactsSection;