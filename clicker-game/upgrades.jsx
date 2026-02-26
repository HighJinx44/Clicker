export const defaultUpgrades = [
  {
    id: 'upgrade_1',
    level: 0
  },
  {
    id: 'upgrade_2',
    level: 0
  },
  {
    id: 'upgrade_3',
    level: 0
  },
  {
    id: 'upgrade_4',
    level: 0
  }
];

export const upgradeDetails = {
  upgrade_1: {
    description(info) {
      return `Increase increment by ${info.increment.U1.multiplier}`;
    },
    effect(upgradeInfo, level) {
      upgradeInfo.increment.U1.amount = level;
    },
    priceFunction(level) {
      return this.basePrice*Math.pow(1.5, level);
    },
    basePrice: 10,
    baseMaxLevel: 10
  },
  upgrade_2: {
    description: 'Increase the increment increase from #1 by 1',
    effect(upgradeInfo, level) {
      upgradeInfo.increment.U1.multiplier += level;
    },
    priceFunction(level) {
      return this.basePrice*Math.pow(2.5, level);
    },
    basePrice: 100,
    baseMaxLevel: 20
  },
  upgrade_3: {
    description: 'Start generating 100% of your increment per second',
    effect(upgradeInfo) {
      upgradeInfo.generatePoints = true;
    },
    priceFunction() {
      return this.basePrice;
    },
    basePrice: 1500,
    baseMaxLevel: 1
  },
  upgrade_4: {
    description: "Increase #1's max level by 5",
    effect(upgradeInfo, level) {
      upgradeInfo.U4.increaseMaxLevel.levelAmount += 5*level;
    },
    priceFunction() {
      return this.basePrice;
    },
    basePrice: 8000,
    baseMaxLevel: 1
  }
};