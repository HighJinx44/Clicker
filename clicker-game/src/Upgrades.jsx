import "./Upgrades.css";
import { upgradeDetails } from "../upgrades";

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
              <div>
                {upgrade.level}/{upgradeDetails[id].maxLevel}
              </div>
              <div>
                {upgradeDetails[id].maxLevel > upgrade.level
                  ? upgrade.price
                  : "Maxed"}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
