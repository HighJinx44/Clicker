import { useState, useEffect, useRef } from 'react';
import { Clicker } from './Clicker';
import './App.css';
import { Tabs } from './tabs';
import './App.css';

function App() {
  const [counter, setCounter] = useState(JSON.parse(localStorage.getItem('amount')) || 0);
  const [highestPoints, setHighestPoints] = useState(JSON.parse(localStorage.getItem('highestAmount')) || 0);
  const [stats, setStats] = useState({
    increment: 1,
    generatePoints: false,
    generatePointsPercent: 100
  });
  
  const incrementRef = useRef(stats.increment);
  const generatePointsRef = useRef(stats.generatePoints);
  const generatorMultiplierRef = useRef(stats.generatorMultiplier);


  useEffect(() => {
    localStorage.setItem('amount', counter);
    setHighestPoints(prev => Math.max(prev, counter));
  }, [counter]);

  useEffect(() => {
    localStorage.setItem('highestAmount', highestPoints);
  }, [highestPoints])

  useEffect(() => {
    incrementRef.current = stats.increment;
    generatePointsRef.current = stats.generatePoints;
    generatorMultiplierRef.current = stats.generatorMultiplier;
  }, [stats]);

  useEffect(() => {
    const generatePointsTimer = setInterval(() => {
      if (!generatePointsRef.current) return;

      setCounter(prev => prev + (incrementRef.current * generatorMultiplierRef.current)/10)
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
      <Tabs counter={counter} setCounter={setCounter} setStats={setStats} highestPoints={highestPoints}/>
    </>
  )
}

export default App
