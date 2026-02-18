import "./tabs.css";
import { useEffect, useState } from "react";

const initialTabs = [
  {
    title: "First",
    content: FirstTab,
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

export function Tabs() {
  const [tabs, setTabs] = useState(initialTabs);
  const [currentTab, setCurrentTab] = useState();

  useEffect(() => {
    const activeTab = tabs.find(tab => tab.active);
    console.log(activeTab);
    if (activeTab !== undefined) setCurrentTab(activeTab.content);
  }, [tabs])

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
          {currentTab}
        </div>
      </div>
    </>
  );
}
