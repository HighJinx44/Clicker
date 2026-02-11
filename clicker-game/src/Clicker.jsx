import './Clicker.css';
import format from './utils/formatNumber';

export function Clicker({ counter, setCounter, stats }) {
  
  function incrementCounter() {
    setCounter(format(counter+stats.increment));
    localStorage.setItem('amount', JSON.stringify(format(counter+stats.increment)));
  }
  
  return (
    <>
      <div className="counter-container">
        <div className="counter">{format(counter)}</div>
        <button onClick={incrementCounter} className="click-button">+{format(stats.increment)}</button>
      </div>
    </>
  );
}