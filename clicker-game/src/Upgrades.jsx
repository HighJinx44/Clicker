import './Upgrades.css';
import { defaultUpgrades, upgradeDetails } from '../upgrades';
import { useState, useEffect } from 'react';

export function Upgrades({ counter, setCounter, stats, setStats }) {
  const [upgrades, setUpgrades] = useState(JSON.parse(localStorage.getItem('upgrades')) || defaultUpgrades);

  function handlePurchase(id) {
    const upgrade = upgrades.find(u => u.id === id);
    if (counter < upgrade.price) return;
    setCounter(prev => prev - upgrade.price);
    setUpgrades(previousUpgrades => {
      return previousUpgrades.map(previousUpgrade => {
        if (previousUpgrade.id !== id) return previousUpgrade;
        return {
          id: previousUpgrade.id,
          level: previousUpgrade.level+1,
          price: Math.round(upgradeDetails[previousUpgrade.id].priceFunction(previousUpgrade.price))
        };
      });
    });

  }

  useEffect(() => {
    
    const newStats = {
      increment: 1
    };
    
    upgrades.forEach(upgrade => {
      upgradeDetails[upgrade.id].effect(newStats, upgrade.level);
    });
    setStats(newStats);
  }, [upgrades, setStats]);

  useEffect(() => {
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
  }, [upgrades]);

  return (
    <div className="upgrade-outer-container">
      {upgrades.map(upgrade => {
        const id = upgrade.id;
        return (
          <div key={id} className="upgrade-container">
            <div className="upgrade-desc-container">
              {typeof (upgradeDetails[id].description) === 'function' ? upgradeDetails[id].description(stats) : upgradeDetails[id].description }
            </div>

            <button className={counter >= upgrade.price ? "upgrade-button buyable" : "upgrade-button"} onClick={() => {handlePurchase(id)}}>
              Purchase
            </button>

            <div className="upgrade-count">
              <div>{upgrade.level}/100</div>
              <div>{upgrade.price}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


