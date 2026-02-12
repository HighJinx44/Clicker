import { useState, useEffect } from 'react';
import { Clicker } from './Clicker';
import { Upgrades } from './Upgrades';
import './App.css';

function App() {
  const [counter, setCounter] = useState(JSON.parse(localStorage.getItem('amount')) || 0);
  const [stats, setStats] = useState({
    increment: 1,
    generatePoints: false,
    generatePointsPercent: 50
  });

  useEffect(() => {
    localStorage.setItem('amount', counter);
  }, [counter]);

  return (
    <>
      <Clicker
      counter={counter}
      setCounter={setCounter} 
      stats={stats}
      />
      <Upgrades 
      counter={counter}
      setCounter={setCounter}
      stats={stats}
      setStats={setStats}
      />
    </>
  )
}

export default App
