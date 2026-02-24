import { useState, useEffect, useRef } from 'react';
import { Clicker } from './Clicker';
import './App.css';
import { Tabs } from './tabs';
import './App.css';

function App() {
  const [counter, setCounter] = useState(JSON.parse(localStorage.getItem('amount')) || 8000);
  const [stats, setStats] = useState({
    increment: 1,
    generatePoints: false,
    generatePointsPercent: 100
  });
  
  const incrementRef = useRef(stats.increment);
  const generatePointsRef = useRef(stats.generatePoints);
  const generatePointsPercentRef = useRef(stats.generatePointsPercent);


  useEffect(() => {
    localStorage.setItem('amount', counter);
  }, [counter]);

  useEffect(() => {
    incrementRef.current = stats.increment;
    generatePointsRef.current = stats.generatePoints;
    generatePointsPercentRef.current = stats.generatePointsPercent;
  }, [stats]);

  useEffect(() => {
    const generatePointsTimer = setInterval(() => {
      if (!generatePointsRef.current) return;

      setCounter(prev => prev + (incrementRef.current/(100/generatePointsPercentRef.current))/10)
    }, 100);
    return () => clearInterval(generatePointsTimer);
  }, []);

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
