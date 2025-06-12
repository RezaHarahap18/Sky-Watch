import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './PredictionChart.module.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}/${month}`;
};


function PredictionChart({ predictionData, onChartClick }) {
  if (!predictionData || predictionData.length === 0) {
    return <p>Data prediksi tidak tersedia untuk ditampilkan di grafik.</p>;
  }

  return (
    <div className={styles.chartContainer}>
      <h4 className={styles.chartTitle}>Grafik Tren Prediksi AQI (15 Hari)</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={predictionData}
          onClick={onChartClick} 
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          className={styles.clickableChart} 
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="tanggal" 
            tickFormatter={formatDate}
            fontSize={12}
            tick={{ fill: '#555' }}
          />
          <YAxis 
            fontSize={12} 
            tick={{ fill: '#555' }}
            domain={[0, 'dataMax + 20']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '14px' }} />
          <Line 
            type="monotone" 
            dataKey="max"
            stroke="#007bff"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Prediksi AQI (max)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PredictionChart;