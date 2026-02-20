import { useState, useEffect } from 'react';
import { Clicker } from './Clicker';
import './App.css';
import { Tabs } from './tabs';
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

  useEffect(() => {
    if (stats.generatePoints) {
      const generatePointsTimer = setInterval(() => {
        setCounter(prev => prev + stats.increment/(100/stats.generatePointsPercent))
      }, 1000);
      return () => clearInterval(generatePointsTimer);
    }

  }, [stats.generatePoints, stats.generatePointsPercent, stats.increment]);

  return (
    <>
      <Clicker
      counter={counter}
      setCounter={setCounter} 
      stats={stats}
      />
      <Tabs counter={counter} setCounter={setCounter} setStats={setStats}/>
    </>
  )
}

export default App
