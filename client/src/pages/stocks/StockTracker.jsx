// src/components/StockTracker.jsx
import React, { useState } from 'react';
import axios from 'axios';

const StockTracker = () => {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY';

  const fetchStockData = async (symbol) => {
    try {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol,
          interval: '5min',
          apikey: API_KEY,
        },
      });
      const data = response.data;
      if (data['Error Message']) {
        setError('Invalid symbol. Please try again.');
        setStockData(null);
      } else {
        const timeSeries = data['Time Series (5min)'];
        const latestTime = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestTime];
        setStockData({
          symbol: symbol.toUpperCase(),
          time: latestTime,
          open: latestData['1. open'],
          high: latestData['2. high'],
          low: latestData['3. low'],
          close: latestData['4. close'],
          volume: latestData['5. volume'],
        });
        setError('');
      }
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      setStockData(null);
    }
  };

  const handleInputChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStockData(symbol);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Stock Price Tracker</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={symbol}
            onChange={handleInputChange}
            placeholder="Enter stock symbol"
            className="border p-2 mr-2 flex-grow rounded"
          />
          <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-blue-600">
            Look Up
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {stockData && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Stock Data for {stockData.symbol}</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="font-medium">Time:</div>
            <div>{stockData.time}</div>
            <div className="font-medium">Open:</div>
            <div>{stockData.open}</div>
            <div className="font-medium">High:</div>
            <div>{stockData.high}</div>
            <div className="font-medium">Low:</div>
            <div>{stockData.low}</div>
            <div className="font-medium">Close:</div>
            <div>{stockData.close}</div>
            <div className="font-medium">Volume:</div>
            <div>{stockData.volume}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockTracker;
