export enum Maturity {
  Seed, Sprout, Seedling, Young, Mature
}

export enum FlowerStatus {
  None, Bud, Young, Grown
}

export enum FruitStatus {
  None, Small, Unripe, Ripe
}

export class Plant {
  id: number;
  name: string;
  flowering: boolean;
  fruiting: boolean;
  maturity: Maturity;
  flowerStatus: FlowerStatus;
  fruitStatus: FruitStatus;
}
