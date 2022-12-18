export enum Maturity {
  Seed, Sprout, Seedling, Young, Mature
}

export class Plant {
  id: number;
  name: string;
  maturity: Maturity;
}
