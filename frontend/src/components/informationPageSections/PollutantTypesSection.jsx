import React from 'react';
import styles from '../../pages/InformationPage.module.css';

const pollutantsData = [
  {
    id: 'pm25',
    name: 'PM2.5 (Partikulat Halus)',
    iconPlaceholder: '💨',
    iconBgClass: styles.iconBgParticulate,
    accentColorClass: styles.accentColorParticulate,
    description: 'Partikel udara sangat kecil (<2.5µm) yang dapat masuk jauh ke paru-paru dan aliran darah, menyebabkan masalah kesehatan serius.',
    sources: 'Asap kendaraan, industri, pembakaran sampah/hutan, debu konstruksi.',
    impacts: 'Iritasi, batuk, sesak napas, perburuk asma, risiko bronkitis, serangan jantung, stroke, kanker paru.'
  },
  {
    id: 'pm10',
    name: 'PM10 (Partikulat Kasar)',
    iconPlaceholder: '🌬️',
    iconBgClass: styles.iconBgParticulate,
    accentColorClass: styles.accentColorParticulate,
    description: 'Partikel udara <10µm, terhirup dan mengendap di saluran pernapasan atas serta paru-paru.',
    sources: 'Debu jalan/konstruksi, serbuk sari, spora jamur, emisi industri.',
    impacts: 'Iritasi saluran napas, batuk, mengi, perburuk asma dan bronkitis.'
  },
  {
    id: 'co',
    name: 'Karbon Monoksida (CO)',
    iconPlaceholder: '🚗',
    iconBgClass: styles.iconBgCO,
    accentColorClass: styles.accentColorCO,
    description: 'Gas beracun tidak berwarna & tidak berbau dari pembakaran tidak sempurna bahan bakar fosil.',
    sources: 'Asap kendaraan, pemanas/kompor gas rusak, asap rokok.',
    impacts: 'Mengurangi oksigen ke organ vital. Paparan tinggi bisa fatal.'
  },
  {
    id: 'o3',
    name: 'Ozon Permukaan Tanah (O₃)',
    iconPlaceholder: '☀️',
    iconBgClass: styles.iconBgO3,
    accentColorClass: styles.accentColorO3,
    description: 'Polutan sekunder terbentuk dari reaksi NOx dan VOC dengan sinar matahari.',
    sources: 'Reaksi kimia emisi kendaraan, industri, pelarut kimia.',
    impacts: 'Nyeri dada, batuk, iritasi tenggorokan, perburuk asma, kerusakan paru-paru permanen.'
  },
  {
    id: 'so2',
    name: 'Sulfur Dioksida (SO₂)',
    iconPlaceholder: '🏭',
    iconBgClass: styles.iconBgSO2,
    accentColorClass: styles.accentColorSO2,
    description: 'Gas tidak berwarna dengan bau menyengat, dari pembakaran bahan bakar fosil bersulfur.',
    sources: 'Pembangkit listrik batu bara, industri, kendaraan diesel.',
    impacts: 'Iritasi saluran pernapasan, perburuk asma dan bronkitis, hujan asam.'
  },
  {
    id: 'no2',
    name: 'Nitrogen Dioksida (NO₂)',
    iconPlaceholder: '🚦',
    iconBgClass: styles.iconBgNO2,
    accentColorClass: styles.accentColorNO2,
    description: 'Gas berwarna coklat kemerahan dengan bau tajam, terbentuk pada suhu tinggi dari pembakaran.',
    sources: 'Emisi kendaraan, pembangkit listrik, industri.',
    impacts: 'Iritasi paru-paru, menurunkan resistensi infeksi pernapasan, perburuk asma.'
  }
];

function PollutantDetailItem({ label, value }) {
  return (
    <div className={styles.pollutantDetailItem}>
      <span className={styles.pollutantDetailLabel}>{label}</span>
      <span className={styles.pollutantDetailSeparator}>:</span>
      <span className={styles.pollutantDetailValue}>{value}</span>
    </div>
  );
}

function PollutantCard({ iconPlaceholder, name, description, sources, impacts, iconBgClass, accentColorClass }) {
  return (
    <div className={styles.pollutantCard}>
      <div className={`${styles.pollutantCardIconContainer} ${iconBgClass}`}>
        <span className={styles.pollutantCardIcon}>{iconPlaceholder}</span>
      </div>
      <h3 className={`${styles.pollutantCardTitle} text-center`}>{name}</h3>
      <div className={`${styles.titleAccentLine} ${accentColorClass}`}></div>
      <div className={styles.pollutantCardContent}>
        <PollutantDetailItem label="Deskripsi" value={description} />
        <PollutantDetailItem
          label={<>Sumber<br />Utama</>}
          value={sources}
        />
        <PollutantDetailItem
          label={<>Dampak<br />Kesehatan</>}
          value={impacts}
        />
      </div>
    </div>
  );
}

function PollutantTypesSection() {
  return (
    <section id="jenis-polutan" className={`${styles.infoSection} ${styles.fadeInElement}`}>
      <div className="d-flex align-items-center mb-3">
        <span className={`${styles.sectionIcon} me-3`}>🧪</span>
        <h2 className={styles.sectionTitle}>Mengenal Polutan Udara Utama</h2>
      </div>
      <p className={styles.paragraph}>
        Kualitas udara dipengaruhi oleh berbagai macam zat pencemar (polutan) di udara.
        Memahami jenis-jenis polutan utama dapat membantu kita menyadari sumbernya dan potensi
        dampaknya terhadap kesehatan. Berikut adalah beberapa di antaranya:
      </p>

      <div className={styles.pollutantGridContainer}>
        {pollutantsData.map(pollutant => (
          <PollutantCard
            key={pollutant.id}
            iconPlaceholder={pollutant.iconPlaceholder}
            name={pollutant.name}
            description={pollutant.description}
            sources={pollutant.sources}
            impacts={pollutant.impacts}
            iconBgClass={pollutant.iconBgClass}
            accentColorClass={pollutant.accentColorClass}
          />
        ))}
      </div>
    </section>
  );
}

export default PollutantTypesSection;