import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

function JakartaMap() {
  const [geoData, setGeoData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const pollutants = [
    { name: "PM2.5", value: 88 },
    { name: "PM10", value: 120 },
    { name: "SO2", value: 35 },
    { name: "CO", value: 7 },
    { name: "O3", value: 60 },
    { name: "NO2", value: 90 }
  ];

  const current = pollutants[activeIndex];
  const status = current.value <= 50 ? "Baik" : current.value <= 100 ? "Sedang" : "Buruk";
  const statusColor = status === "Baik" ? "green" : status === "Sedang" ? "orange" : "red";

  useEffect(() => {
    fetch('/id-jk.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data));
  }, []);

  const geoStyle = {
    fillColor: statusColor,
    weight: 2,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.4,
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? pollutants.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === pollutants.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="map-wrapper">
      <div className="info-card shadow">
        <div className="d-flex justify-content-between align-items-center">
          <button onClick={handlePrev} className="btn btn-sm btn-outline-primary">&lt;</button>
          <div className="text-center mx-2">
            <h6 style={{ marginBottom: 4 }}>{current.name}: {current.value} µg/m³</h6>
            <p style={{ marginBottom: 0 }}>
              Status: <strong style={{ color: statusColor }}>{status}</strong>
            </p>
          </div>
          <button onClick={handleNext} className="btn btn-sm btn-outline-primary">&gt;</button>
        </div>
      </div>

      <MapContainer
        center={[-6.2, 106.8]}
        zoom={10}
        className='custom-map'
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && <GeoJSON data={geoData} style={geoStyle} />}
      </MapContainer>
    </div>
  );
}

export default JakartaMap;
