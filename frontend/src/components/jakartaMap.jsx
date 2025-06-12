import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet'; 
import { useEffect, useState } from 'react';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './JakartaMap.module.css';

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import markerShadowPng from "leaflet/dist/images/marker-shadow.png"
const defaultIcon = new Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// --- DATA GAYA PETA ---
const mapStyles = {
  light: {
    name: "Terang",
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  },
  dark: {
    name: "Gelap",
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  },
  standard: {
    name: "Standar",
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
};
// --- AKHIR DATA GAYA PETA ---


const getAqiColor = (category) => {
  if (category === "BAIK") return "green";
  if (category === "SEDANG") return "orange";
  if (category === "TIDAK SEHAT") return "red";
  if (category === "SANGAT TIDAK SEHAT") return "purple";
  if (category === "BERBAHAYA") return "#700000";
  return "grey";
};

function JakartaMap({ dailyData, coords }) { 
  const [geoData, setGeoData] = useState(null);
  const [currentMapStyleKey, setCurrentMapStyleKey] = useState('light'); 

  useEffect(() => {
    fetch('/id-jk.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data));
  }, []);

  if (!dailyData || !coords) {
    return <div>Memuat data peta...</div>;
  }

  const position = [coords.lat, coords.lon];
  const statusColor = getAqiColor(dailyData.categori);

  const geoStyle = {
    fillColor: statusColor,
    weight: 1, 
    opacity: 0.5,
    color: 'grey',
    fillOpacity: 0.3,
  };

  return (
    <div className={styles.mapContainerWrapper}>
      <h4 className={styles.mapTitle}>Lokasi Stasiun Pemantauan</h4>
      <div className={styles.mapRelativeContainer}> 
        <MapContainer
          key={`<span class="math-inline">\{dailyData\.stasiun\_prediksi\}\-</span>{currentMapStyleKey}`} 
          center={position}
          zoom={13}
          className={styles.mapContainer}
        >
          {/* --- TOMBOL PEMILIH GAYA PETA --- */}
          <div className={styles.mapStyleSwitcher}>
            {Object.keys(mapStyles).map(styleKey => (
              <button
                key={styleKey}
                className={`${styles.styleButton} ${currentMapStyleKey === styleKey ? styles.activeButton : ''}`}
                onClick={() => setCurrentMapStyleKey(styleKey)}
              >
                {mapStyles[styleKey].name}
              </button>
            ))}
          </div>
          {/* --- AKHIR TOMBOL PEMILIH --- */}

          <TileLayer
            attribution={mapStyles[currentMapStyleKey].attribution}
            url={mapStyles[currentMapStyleKey].url}
          />

          {geoData && <GeoJSON data={geoData} style={geoStyle} />}

          {/* Menampilkan marker di lokasi stasiun */}
          <Marker position={position} icon={defaultIcon}>
            <Popup>
              <strong>{dailyData.stasiun_prediksi || "Stasiun Terpilih"}</strong>
              <br />
              Prediksi AQI: {dailyData.max} ({dailyData.categori})
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default JakartaMap;