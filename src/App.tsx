import { useState, useEffect } from 'react';

import './App.css';
import { Plant, Maturity, FlowerStatus } from './plant.entity'
import { Seed } from './seed.entity'

export default function App() {
  const baseUrl = "http://127.0.0.1:5000";

  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [allSeeds, setAllSeeds] = useState<Seed[]>([]);

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

  async function postTick() {
    await fetch(baseUrl + "/tick", { method: "POST" });
    getPlants();
    getSeeds();
  }

  async function plantSeed(id: number) {
    await fetch(baseUrl + "/plants/" + id, { method: "POST" });
    getPlants();
    getSeeds();
  }

  async function deletePlant(id: number) {
    await fetch(baseUrl + "/plants/" + id, { method: "DELETE" });
    getPlants();
  }

  async function deleteSeed(id: number) {
    await fetch(baseUrl + "/seeds/" + id, { method: "DELETE" });
    getSeeds();
  }

  useEffect(() => {
    getPlants();
    getSeeds();
  }, []);

  const plants = allPlants.map(plant =>
    <tr>
      <td>{plant.id}</td>
      <td>{plant.name}</td>
      <td>{Maturity[plant.maturity]}</td>
      <td>{FlowerStatus[plant.flowerStatus]}</td>
      <td>{plant.flowering ? 'Yes' : 'No'}</td>
      <td className='clickableRed' onClick={async () => deletePlant(plant.id)}>DESTROY</td>
    </tr>
  );

  const seeds = allSeeds.map(seed =>
    <tr>
      <td>{seed.id}</td>
      <td>{seed.genes.name}</td>
      <td>{seed.genes.flowering ? 'Yes' : 'No'}</td>
      <td className='clickable' onClick={async () => plantSeed(seed.id)}>PLANT</td>
      <td className='clickableRed' onClick={async () => deleteSeed(seed.id)}>DESTROY</td>
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
            <th>Flowering</th>
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
            <th />
            <th />
          </tr>
          {seeds}
        </table>
      </header>
    </div>
  );
}
