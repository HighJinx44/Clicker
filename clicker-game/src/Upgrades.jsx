import "./Upgrades.css";
import { defaultUpgrades, upgradeDetails } from "../upgrades";
import { useState, useEffect } from "react";

export function Upgrades({ counter, setCounter, setStats }) {
  const [upgrades, setUpgrades] = useState(
    JSON.parse(localStorage.getItem("upgrades")) || defaultUpgrades,
  );
  const [upgradeInfo, setUpgradeInfo] = useState({
    U1: {
      increment: {
        amount: 0,
        multiplier: 1,
      },
    },
    U3: {
      incrementMultiplier: 1,
    },
  });

  function handlePurchase(id) {
    const upgrade = upgrades.find((u) => u.id === id);
    if (counter < upgrade.price) return;
    if (upgradeDetails[id].maxLevel <= upgrade.level) return;
    setCounter((prev) => prev - upgrade.price);
    setUpgrades((previousUpgrades) => {
      return previousUpgrades.map((previousUpgrade) => {
        if (previousUpgrade.id !== id) return previousUpgrade;
        return {
          id: previousUpgrade.id,
          level: previousUpgrade.level + 1,
          price: Math.round(
            upgradeDetails[previousUpgrade.id].priceFunction(
              previousUpgrade.price,
            ),
          ),
        };
      });
    });
  }

  useEffect(() => {
    const newStats = {
      increment: 1,
      generatePoints: false,
      generatePointsPercent: 50
    };

    //Calculate the base amount that the first upgrade would add to the increment
    //Do the maths from future upgrades
    //Add up all the upgrades that have an increment bonus and make that the final increment

    //Base increment for upgrade 1 is ALWAYS going to be 1, no need to save that
    //Calculate the amount by which upgrade 1 increases the increment factoring in other upgrades

    //IMPORTANT: HOW EACH UPGRADE AFFECTS OTHER UPGRADES SHOULD ONLY BE CALCULATED OUT HERE

    //A multiplier can be stored in each object that has an increment increase, and multipliers from future upgrades can be added to that multiplier
    //E.G: U2 provides a multiplier for ONLY U1, whereas U3 could provide a multiplier to the whole increment.
    //Therefore, the multiplier in U1 would increase based on U2, and then the general multiplier would be applied to the final increment

    //Upgrades that only provide one thing (E.G: If U3 were to start generating points) can be put as their own things in newUpgradeInfo


    //Don't save price, instead generate the price on load and keep reloading it when a new upgrade is purchased.
    const newUpgradeInfo = {
      generatePoints: false,
      U1: {
        increment: {
          amount: 0,
          multiplier: 1,
        },
      },
    };

    upgrades.forEach((upgrade) => {
      if (upgrade.level > 0) {
        upgradeDetails[upgrade.id].effect(newUpgradeInfo, upgrade.level);
      }
    });

    for (const key in newUpgradeInfo) {
      const upgradeInfoItem = newUpgradeInfo[key];
      if (upgradeInfoItem.increment) {
        newStats.increment +=
          upgradeInfoItem.increment.amount *
          upgradeInfoItem.increment.multiplier;
      }

      if (newStats[key] !== undefined) {
        newStats[key] = upgradeInfoItem;
      }
    }

    setUpgradeInfo(newUpgradeInfo);
    setStats(newStats);
  }, [upgrades, setStats]);

  useEffect(() => {
    localStorage.setItem("upgrades", JSON.stringify(upgrades));
  }, [upgrades]);

  return (
    <div className="upgrade-outer-container">
      {upgrades.map((upgrade) => {
        const id = upgrade.id;
        return (
          <div key={id} className="upgrade-container">
            <div className="upgrade-desc-container">
              <div className="upgrade-count-container">#{upgrades.indexOf(upgrade) + 1}</div>
              <div className="upgrade-desc">
              {typeof upgradeDetails[id].description === "function"
                ? upgradeDetails[id].description(upgradeInfo)
                : upgradeDetails[id].description}
              </div>
            </div>

            <button
              className={
                counter >= upgrade.price
                  ? "upgrade-button buyable"
                  : "upgrade-button"
              }
              onClick={() => {
                handlePurchase(id);
              }}
            >
              Purchase
            </button>

            <div className="upgrade-count">
              <div>{upgrade.level}/{upgradeDetails[id].maxLevel}</div>
              <div>{upgradeDetails[id].maxLevel > upgrade.level ? upgrade.price : 'Maxed'}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
