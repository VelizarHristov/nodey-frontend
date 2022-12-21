import { useState, useEffect } from 'react';

import './App.css';
import { Plant, Maturity, FlowerStatus, FruitStatus } from './plant.entity'
import { Seed } from './seed.entity'
import { Fruit } from './fruit.entity';

export default function App() {
  const baseUrl = "http://127.0.0.1:5000";

  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [allSeeds, setAllSeeds] = useState<Seed[]>([]);
  const [allFruits, setAllFruits] = useState<Fruit[]>([]);

  async function getPlants(): Promise<void> {
    const res = await fetch(baseUrl + "/plants");
    const json = await res.json();
    setAllPlants(json);
  }

  async function getSeeds(): Promise<void> {
    const res = await fetch(baseUrl + "/seeds");
    const json = await res.json();
    setAllSeeds(json);
  }

  async function getFruits(): Promise<void> {
    const res = await fetch(baseUrl + "/fruits");
    const json = await res.json();
    setAllFruits(json);
  }

  async function postTick() {
    await fetch(baseUrl + "/tick", { method: "POST" });
    getPlants();
    getSeeds();
    getFruits();
  }

  async function plantSeed(id: number) {
    await fetch(baseUrl + "/plants/" + id, { method: "POST" });
    getPlants();
    getSeeds();
  }

  async function eatFruit(id: number) {
    await fetch(baseUrl + "/fruits/eat/" + id, { method: "POST" });
    getSeeds();
    getFruits();
  }

  async function deletePlant(id: number) {
    await fetch(baseUrl + "/plants/" + id, { method: "DELETE" });
    getPlants();
  }

  async function deleteSeed(id: number) {
    await fetch(baseUrl + "/seeds/" + id, { method: "DELETE" });
    getSeeds();
  }

  async function deleteFruit(id: number) {
    await fetch(baseUrl + "/fruits/" + id, { method: "DELETE" });
    getFruits();
  }

  useEffect(() => {
    getPlants();
    getSeeds();
    getFruits();
  }, []);

  const plants = allPlants.map(plant =>
    <tr>
      <td>{plant.id}</td>
      <td>{plant.name}</td>
      <td>{Maturity[plant.maturity]}</td>
      <td>{FlowerStatus[plant.flowerStatus]}</td>
      <td>{FruitStatus[plant.fruitStatus]}</td>
      <td>{plant.flowering ? 'Yes' : 'No'}</td>
      <td>{plant.fruiting ? 'Yes' : 'No'}</td>
      <td className='clickableRed' onClick={async () => deletePlant(plant.id)}>DESTROY</td>
    </tr>
  );

  const seeds = allSeeds.map(seed =>
    <tr>
      <td>{seed.id}</td>
      <td>{seed.genes.name}</td>
      <td>{seed.genes.flowering ? 'Yes' : 'No'}</td>
      <td>{seed.genes.fruiting ? 'Yes' : 'No'}</td>
      <td className='clickable' onClick={async () => plantSeed(seed.id)}>PLANT</td>
      <td className='clickableRed' onClick={async () => deleteSeed(seed.id)}>DESTROY</td>
    </tr>
  );

  const fruits = allFruits.map(fruit =>
    <tr>
      <td>{fruit.id}</td>
      <td>{fruit.genes.name}</td>
      <td>{fruit.genes.flowering ? 'Yes' : 'No'}</td>
      <td>{fruit.genes.fruiting ? 'Yes' : 'No'}</td>
      <td className='clickable' onClick={async () => eatFruit(fruit.id)}>EAT</td>
      <td className='clickableRed' onClick={async () => deleteFruit(fruit.id)}>DESTROY</td>
    </tr>
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className='clickable' onClick={postTick}>TICK</div>
        <h1>
          Listing plants
        </h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Maturity</th>
            <th>Flower status</th>
            <th>Fruit status</th>
            <th>Flowering</th>
            <th>Fruiting</th>
            <th />
          </tr>
          {plants}
        </table>
        <h1>
          Listing seeds
        </h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Flowering</th>
            <th>Fruiting</th>
            <th />
            <th />
          </tr>
          {seeds}
        </table>
        <h1>
          Listing fruits
        </h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Flowering</th>
            <th>Fruiting</th>
            <th />
            <th />
          </tr>
          {fruits}
        </table>
      </header>
    </div>
  );
}
