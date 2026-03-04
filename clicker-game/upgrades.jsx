export const defaultUpgrades = [
  {
    id: "upgrade_1",
    level: 0,
  },
  {
    id: "upgrade_2",
    level: 0,
  },
  {
    id: "upgrade_3",
    level: 0,
  },
  {
    id: "upgrade_4",
    level: 0,
  },
  {
    id: "upgrade_5",
    level: 0,
  },
  {
    id: "upgrade_6",
    level: 0,
  },
];

export const upgradeDetails = {
  upgrade_1: {
    description(info) {
      return `Increase increment by ${info.increment.U1.multiplier * info.incrementMultiplier}`;
    },
    effect({ upgradeInfo, level }) {
      upgradeInfo.increment.U1.amount = level;
    },
    priceFunction(level) {
      return this.basePrice * Math.pow(1.5, level);
    },
    basePrice: 10,
    baseMaxLevel: 10,
  },
  upgrade_2: {
    description(info) {
      return `Increase the increment increase from #1 by ${info.incrementMultiplier}`;
    },
    effect({ upgradeInfo, level }) {
      upgradeInfo.increment.U1.multiplier = level + 1;
    },
    priceFunction(level) {
      return this.basePrice * Math.pow(2.5, level);
    },
    basePrice: 100,
    baseMaxLevel: 20,
  },
  upgrade_3: {
    description: "Start generating 100% of your increment per second",
    effect({ upgradeInfo }) {
      upgradeInfo.generatePoints = true;
    },
    priceFunction() {
      return this.basePrice;
    },
    basePrice: 1500,
    baseMaxLevel: 1,
  },
  upgrade_4: {
    description: "Multiply increment by 3x",
    effect({ upgradeInfo, level }) {
      upgradeInfo.incrementMultiplier *= Math.pow(3, level);
    },
    priceFunction(level) {
      return this.basePrice * Math.pow(8, level);
    },
    basePrice: 5000,
    baseMaxLevel: 1,
  },
  upgrade_5: {
    description: "Increase #4's max level by 1",
    effect({ upgradeInfo, level }) {
      upgradeInfo.increaseMaxLevel.upgrade_4 = level;
    },
    priceFunction(level) {
      return this.basePrice * Math.pow(5, level);
    },
    basePrice: 25000,
    baseMaxLevel: 3,
  },
  upgrade_6: {
    description: "Increase generation based on current clicks (points^0.08)",
    effect({ upgradeInfo, points }) {
      upgradeInfo.generatorMultiplier *= Math.pow(points, 0.08);
    },
    priceFunction() {
      return this.basePrice;
    },
    basePrice: 30000,
    baseMaxLevel: 1,
  },
};
