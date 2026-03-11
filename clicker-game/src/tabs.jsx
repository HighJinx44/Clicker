import "./tabs.css";
import { useState, useEffect } from "react";
import { FirstUpgrades } from "./Upgrades";
import { defaultUpgrades, upgradeDetails } from "../upgrades";

const allTabs = [
  {
    tab: {
      title: "First",
      content: FirstUpgrades,
    },
    unlockAt: 0,
  },
  {
    tab: {
      title: "Second",
      content: SecondTab,
    },
    unlockAt: 1000000,
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

const defaultUpgradeInfo = {
  generatePoints: false,
  generatorMultiplier: 1,
  incrementMultiplier: 1,
  increment: {
    U1: {
      amount: 0,
      multiplier: 1,
    },
  },
  increaseMaxLevel: {
    upgrade_4: 0,
  },
};

export function Tabs({ counter, setCounter, setStats, highestPoints }) {
  function handlePurchase(id) {
    const upgrade = upgrades.find((u) => u.id === id);
    if (counter < upgradeDetails[id].priceFunction(upgrade.level)) return;
    if (
      upgradeDetails[id].baseMaxLevel +
        (upgradeInfo.increaseMaxLevel[id] ?? 0) <=
      upgrade.level
    )
      return;
    setCounter(
      (prev) => prev - upgradeDetails[id].priceFunction(upgrade.level),
    );
    setUpgrades((previousUpgrades) => {
      return previousUpgrades.map((previousUpgrade) => {
        if (previousUpgrade.id !== id) return previousUpgrade;
        return {
          id: previousUpgrade.id,
          level: previousUpgrade.level + 1,
        };
      });
    });
  }

  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState();
  const activeTab = tabs.find((tab) => tab.title === activeTabId);

  const [upgrades, setUpgrades] = useState(
    JSON.parse(localStorage.getItem("upgrades")) || defaultUpgrades,
  );

  const [upgradeInfo, setUpgradeInfo] = useState({ ...defaultUpgradeInfo });

  
  useEffect(() => {
    let newTabList = [];
    allTabs.forEach((tab) => {
      if (tab.unlockAt <= highestPoints) {
        newTabList.push(tab.tab);
      }
    });
    setTabs(newTabList);
  }, [highestPoints]);
  

  useEffect(() => {
    const newStats = {
      increment: 1,
      generatePoints: false,
      generatorMultiplier: 1,
    };

    const newUpgradeInfo = { ...defaultUpgradeInfo };

    upgrades.forEach((upgrade) => {
      if (upgrade.level > 0) {
        upgradeDetails[upgrade.id].effect({
          upgradeInfo: newUpgradeInfo,
          level: upgrade.level,
          points: counter,
        });
      }
    });

    for (const key in newUpgradeInfo) {
      const upgradeInfoItem = newUpgradeInfo[key];

      if (newStats[key] !== undefined) {
        if (key === "increment") {
          for (const incKey in upgradeInfoItem) {
            const incrementUpgradeInfoItem = upgradeInfoItem[incKey];
            newStats.increment +=
              incrementUpgradeInfoItem.amount *
              incrementUpgradeInfoItem.multiplier;
          }
          newStats.increment *= newUpgradeInfo.incrementMultiplier;
        } else {
          newStats[key] = upgradeInfoItem;
        }
      }
    }

    setUpgradeInfo(newUpgradeInfo);
    setStats(newStats);
  }, [upgrades, setStats, counter]);

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
                  tab.title === activeTabId
                    ? "tab-selector selected-tab"
                    : "tab-selector"
                }
                onClick={() => {
                  setActiveTabId((previousTab) => {
                    if (previousTab === tab.title) {
                      return "";
                    }
                    return tab.title;
                  });
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
              highestPoints={highestPoints}
            />
          )}
        </div>
      </div>
    </>
  );
}
