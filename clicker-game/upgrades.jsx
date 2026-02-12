export const defaultUpgrades = [
  {
    id: 'upgrade_1',
    level: 0,
    price: 10
  },
  {
    id: 'upgrade_2',
    level: 0,
    price: 50
  },
  {
    id: 'upgrade_3',
    level: 0,
    price: 400
  }
];

export const upgradeDetails = {
  upgrade_1: {
    description(stats) {
      return `Increase increment by 1`;
    },
    effect(stats, level) {
      stats.increment += level;
    },
    priceFunction(price) {
      price += 1;
      return price;
    }
  },
  upgrade_2: {
    description: 'Increase the increment increase from upgrade 1 by 0.1 per level',
    effect(stats, level) {
      console.log('Increase increment by 1')
    },
    priceFunction(price) {
      price *= 1.5;
      return price;
    }
  },
  upgrade_3: {
    description: 'This is description 3',
    effect(stats, level) {
      console.log('Increase Increment by 5');
    },
    priceFunction(price) {
      price *= 2;
      return price;
    }
  }
};