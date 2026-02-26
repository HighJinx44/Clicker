import "./Upgrades.css";
import { upgradeDetails } from "../upgrades";
import format from "./utils/formatNumber";

export function FirstUpgrades({
  counter,
  upgrades,
  upgradeInfo,
  handlePurchase,
}) {
  return (
    <>
      {upgrades.map((upgrade) => {
        const id = upgrade.id;
        return (
          upgradeDetails[id].baseMaxLevel + (upgradeInfo.increaseMaxLevel[id] ?? 0) > upgrade.level ?
          <div key={id} className="upgrade-container">
            <div className="upgrade-desc-container">
              <div className="upgrade-count-container">
                #{upgrades.indexOf(upgrade) + 1}
              </div>
              <div className="upgrade-desc">
                {typeof upgradeDetails[id].description === "function"
                  ? upgradeDetails[id].description(upgradeInfo)
                  : upgradeDetails[id].description}
              </div>
            </div>

            <button
              className={
                counter >= upgradeDetails[id].priceFunction(upgrade.level)
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
              <div>
                {upgrade.level}/{upgradeDetails[id].baseMaxLevel + (upgradeInfo.increaseMaxLevel[id] ?? 0)}
              </div>
              <div>
                {upgradeDetails[id].baseMaxLevel + (upgradeInfo.increaseMaxLevel[id] ?? 0) > upgrade.level
                  ? format(upgradeDetails[id].priceFunction(upgrade.level))
                  : "Maxed"}
              </div>
            </div>
          </div>
          : ''
        );
      })}
    </>
  );
}
