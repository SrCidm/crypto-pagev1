import React, { useState, useEffect, useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { Cripto } from '../ContextCripto';
import { Button, CircularProgress } from '@mui/material';
import { } from "chart.js/auto"

const InfoCoin = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState(null);
  const [volumeData, setVolumeData] = useState(null);
  const [days, setDays] = useState(30); 
  const { currency } = useContext(Cripto);

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(HistoricalChart(coin.SYMBOL, currency, days));
      const responseData = await response.json();
      setHistoricalData(responseData.Data.Data);
      setVolumeData(responseData.Data.Data); 
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line
  }, [coin.SYMBOL, currency, days]); 
  const generateChartData = () => {
    if (!historicalData) return {};
  
    const labels = historicalData.map(item => {
      const date = new Date(item.time * 1000); 
      return new Intl.DateTimeFormat('en-EN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
      }).format(date);
    });
    const data = historicalData.map(item => item.close);
  
    return {
      labels: labels,
      datasets: [
        {
          label: 'Crypto Price',
          data: data,
          fill: false,
          borderColor: 'rgb(0, 150, 250)',
          tension: 1,
        }
      ]
    };
  };

  const generateVolumeChartData = () => {
    if (!volumeData) return {};

    const labels = volumeData.map(() => ''); 
    const data = volumeData.map(item => item.volumefrom);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Volume',
          data: data,
          backgroundColor: 'rgba(0, 150, 200, 0.6)', 
          borderWidth: 1
        }
      ]
    };
  };

  const handleDaysChange = (newDays) => {
    setDays(newDays);
  };

  return (
    <div>
      <h2 style={{ fontWeight: "bold", fontFamily: "monospace",textAlign:"center",fontSize:"50px" }}>Chart of {coin.SYMBOL}</h2>
      <div style={{marginLeft:20}}>
        {historicalData ? (
          <Line data={generateChartData()} height={600} width={1000}/>
        ) : (
          <CircularProgress style={{ color: "rgb(0, 150, 250)" }} size={250} thickness={1} />
        )}
      </div>
      <div style={{marginLeft:20}}>
        {volumeData ? (
          <Bar data={generateVolumeChartData()} height={200} width={1000} options={{ scales: { x: { display: false } } }} /> // Opción para ocultar el eje X
        ) : (
          <CircularProgress style={{ color: "rgb(0, 150, 250)" }} size={250} thickness={1} />
        )}
      </div>
      <div style={{textAlign:"center"}}>
        <Button
          style={{marginRight:"3vh"}}
          size='small'
          variant="outlined"
          onClick={() => handleDaysChange(1)}
          disabled={days === 1} 
        >
          Today
        </Button>
        <Button
          style={{marginRight:"3vh"}}
          size='small'
          variant="outlined"
          onClick={() => handleDaysChange(7)}
          disabled={days === 7} 
        >
          Last 7 days
        </Button>
        <Button
          style={{marginRight:"3vh"}}
          size='small'
          variant="outlined"
          onClick={() => handleDaysChange(30)}
          disabled={days === 30} 
          >
          Last 30 days
        </Button>
      </div>
    </div>
  );
};

export default InfoCoin;

