export const defaultUpgrades = [
  {
    id: 'upgrade_1',
    maxLevel: 50,
    level: 0,
    price: 10
  },
  {
    id: 'upgrade_2',
    maxLevel: 20,
    level: 0,
    price: 500
  },
  {
    id: 'upgrade_3',
    maxLevel: 1,
    level: 0,
    price: 10000
  }
];

export const upgradeDetails = {
  upgrade_1: {
    description(info) {
      return `Increase increment by ${info.U1.increment.multiplier}`;
    },
    effect(upgradeInfo, level) {
      upgradeInfo.U1.increment.amount += level;
    },
    priceFunction(price) {
      price *= 2;
      return price;
    }
  },
  upgrade_2: {
    description: 'Increase the increment increase from upgrade 1 by 1 per level',
    effect(upgradeInfo, level) {
      upgradeInfo.U1.increment.multiplier += level;
    },
    priceFunction(price) {
      price *= 2.5;
      return price;
    }
  },
  upgrade_3: {
    description: 'Start generating 50% of your increment per second',
    effect(upgradeInfo, level) {
      upgradeInfo.generatePoints = true;
    },
    priceFunction(price) {
      price *= 2;
      return price;
    }
  }
};