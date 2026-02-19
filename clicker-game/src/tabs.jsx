import "./tabs.css";
import { useState } from "react";
import { FirstUpgrades } from "./Upgrades";

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

function FirstTab() {
  return (
    <>
      <div className="first-tab">        
        This is the content of the first tab
      </div>
    </>
  );
}

function SecondTab() {
  return (
    <>
      <div className="first-tab">        
        This is the content of the second tab
      </div>
    </>
  );
}

function ThirdTab() {
  return (
    <>
      <div className="first-tab">        
        This is the content of the third tab
      </div>
    </>
  );
}

function FourthTab() {
  return (
    <>
      <div className="first-tab">        
        This is the content of the fourth tab
      </div>
    </>
  );
}

function FifthTab() {
  return (
    <>
      <div className="first-tab">        
        This is the content of the fifth tab
      </div>
    </>
  );
}

export function Tabs({ counter, setCounter, setStats }) {
  const [tabs, setTabs] = useState(initialTabs);
  const activeTab = tabs.find(tab => tab.active);

  return (
    <>
      <div className="tabs-container">
        <div className="tab-selector-container">
          {tabs.map((tab) => {
            return (
              <div key={tab.title} className={tab.active ? "tab-selector selected-tab" : "tab-selector"} onClick={() => {
                const newTabs = initialTabs.map(oldTab => {
                  if (oldTab.title !== tab.title) return oldTab;
                  return {
                    title: tab.title,
                    content: tab.content,
                    active: !tab.active
                  };
                });

                setTabs(newTabs);
                
              }}>
                {tab.title}
              </div>
            );
          })}
        </div>
        <div className="tab-content-container">
          {activeTab && <activeTab.content counter={counter} setCounter={setCounter} setStats={setStats}/>}
        </div>
      </div>
    </>
  );
}
