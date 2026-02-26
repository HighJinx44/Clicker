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
  function handlePurchase(id) {
    const upgrade = upgrades.find((u) => u.id === id);
    if (counter < upgradeDetails[id].priceFunction(upgrade.level)) return;
    if (upgradeDetails[id].baseMaxLevel <= upgrade.level) return;
    setCounter((prev) => prev - upgradeDetails[id].priceFunction(upgrade.level));
    setUpgrades((previousUpgrades) => {
      return previousUpgrades.map((previousUpgrade) => {
        if (previousUpgrade.id !== id) return previousUpgrade;
        return {
          id: previousUpgrade.id,
          level: previousUpgrade.level + 1
        };
      });
    });
  }
  
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
    U4: {
      increaseMaxLevel: {
        upgradeNumber: 1,
        levelAmount: 0
      }
    }
  });
  
  useEffect(() => {
    const newStats = {
      increment: 1,
      generatePoints: false,
      generatePointsPercent: 100,
    };

    const newUpgradeInfo = {
      generatePoints: false,
      U1: {
        increment: {
          amount: 0,
          multiplier: 1,
        },
      },
      U4: {
        increaseMaxLevel: {
          upgradeNumber: 1,
          levelAmount: 0
        }
      }
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
