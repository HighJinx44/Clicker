import './MidSec.css';
import { Clicker } from './Clicker';

export function MidSec({ counter, setCounter, stats }) {
  return (
    <>
      <div className="middle-section-container">
        <div className="top-middle-container"></div>
        <div className="bottom-middle-container">
          <Clicker
                  counter={counter}
                  setCounter={setCounter} 
                  stats={stats}
                />
        </div>
      </div>
    </>
  );
}