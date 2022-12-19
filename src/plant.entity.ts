export enum Maturity {
  Seed, Sprout, Seedling, Young, Mature
}

export enum FlowerStatus {
  None, Bud, Young, Grown
}

export class Plant {
  id: number;
  name: string;
  flowering: boolean;
  maturity: Maturity;
  flowerStatus: FlowerStatus;
}
