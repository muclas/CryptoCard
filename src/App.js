import React from 'react';
import CryptoCard from './components/crypto-card';

export default function App() {
  return (
    <div>
      <CryptoCard
        name="Bitcoin"
        symbol="BTC"
      />
    </div>
  );
}