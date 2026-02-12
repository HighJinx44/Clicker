import "./Clicker.css";

export function Clicker({ counter, setCounter, stats }) {
  function incrementCounter() {
    setCounter(Math.round(counter + stats.increment));
    localStorage.setItem(
      "amount",
      JSON.stringify(Math.round(counter + stats.increment)),
    );
  }

  return (
    <>
      <div className="counter-container">
        <div className="counter">
          {stats.generatePoints ? <div className="points-per-second">
            {Math.round((stats.increment/100)*stats.generatePointsPercent)} P/s
          </div> : ''}
          {Math.round(counter)}</div>
        <button onClick={incrementCounter} className="click-button">
          +{Math.round(stats.increment)}
        </button>
      </div>
    </>
  );
}
