import "./tabs.css";
import { useState, useEffect } from "react";
import { FirstUpgrades } from "./Upgrades";
import { defaultUpgrades, upgradeDetails } from "../upgrades";

const initialTabs = [
  {
    title: "First",
    content: FirstUpgrades,
    active: false,
  },
  {
    title: "Second",
    content: SecondTab,
    active: false,
  },
  {
    title: "Third",
    content: ThirdTab,
    active: false,
  },
  {
    title: "Fourth",
    content: FourthTab,
    active: false,
  },
  {
    title: "Fifth",
    content: FifthTab,
    active: false,
  },
];

function SecondTab() {
  return (
    <>
      <div className="first-tab">This is the content of the second tab</div>
    </>
  );
}

function ThirdTab() {
  return (
    <>
      <div className="first-tab">This is the content of the third tab</div>
    </>
  );
}

function FourthTab() {
  return (
    <>
      <div className="first-tab">This is the content of the fourth tab</div>
    </>
  );
}

function FifthTab() {
  return (
    <>
      <div className="first-tab">This is the content of the fifth tab</div>
    </>
  );
}

export function Tabs({ counter, setCounter, setStats }) {
  const [tabs, setTabs] = useState(initialTabs);
  const activeTab = tabs.find((tab) => tab.active);
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
  useEffect(() => {
    const newStats = {
      increment: 1,
      generatePoints: false,
      generatePointsPercent: 50,
    };

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
  /*
  ISSUE: Currently, the first upgrade tab is the only tab that has upgrades.
  When the user opens the website, the upgrades should load from out here,
  so that the user doesn't have to open the first tab to load the upgrades that the first tab provides.
  This would also fix this issue for the future upgrade tabs.

  Steps to take:
  - Find how the upgrades are loaded, and pull that functionality out to this.
  - Make sure this remains compatible with the first upgrades tab, and every tab after that.

  - Potentially add a useEffect that loads all the upgrades the first time, with something like an empty array,
  or have a dependency 'upgrades' so that every time upgrades changes, it all re-calculates and renders.
  */

  useEffect(() => {
    localStorage.setItem("upgrades", JSON.stringify(upgrades));
  }, [upgrades]);

  return (
    <>
      <div className="tabs-container">
        <div className="tab-selector-container">
          {tabs.map((tab) => {
            return (
              <div
                key={tab.title}
                className={
                  tab.active ? "tab-selector selected-tab" : "tab-selector"
                }
                onClick={() => {
                  const newTabs = initialTabs.map((oldTab) => {
                    if (oldTab.title !== tab.title) return oldTab;
                    return {
                      title: tab.title,
                      content: tab.content,
                      active: !tab.active,
                    };
                  });

                  setTabs(newTabs);
                }}
              >
                {tab.title}
              </div>
            );
          })}
        </div>
        <div className="tab-content-container">
          {activeTab && (
            <activeTab.content
              counter={counter}
              upgrades={upgrades}
              upgradeInfo={upgradeInfo}
              handlePurchase={handlePurchase}
            />
          )}
        </div>
      </div>
    </>
  );
}
