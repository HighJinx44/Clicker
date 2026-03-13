import "./Clicker.css";
import format from "./utils/formatNumber";

export function Clicker({ counter, setCounter, stats }) {
  function incrementCounter() {
    setCounter((prev) => prev + stats.increment);
    localStorage.setItem("amount", JSON.stringify(counter + stats.increment));
  }

  return (
    <>
      <div className="counter-container">
        <div className="counter">
          <div className="counter-text">
            {format(counter, 3)}
            {stats.generatePoints ? (
              <div className="points-per-second">
                {format(stats.increment * stats.generatorMultiplier)} P/s
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <button onClick={incrementCounter} className="click-button">
          +{format(stats.increment)}
        </button>
      </div>
    </>
  );
}
