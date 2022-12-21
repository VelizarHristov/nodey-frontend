import { useState, useEffect } from 'react';

import './App.css';
import { Plant, Maturity, FlowerStatus } from './plant.entity'
import { Seed } from './seed.entity'

export default function App() {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [allSeeds, setAllSeeds] = useState<Seed[]>([]);

  async function getPlants(): Promise<void> {
    const res = await fetch("http://127.0.0.1:5000/plants");
    const json = await res.json();
    setAllPlants(json);
  }

  async function getSeeds(): Promise<void> {
    const res = await fetch("http://127.0.0.1:5000/seeds");
    const json = await res.json();
    setAllSeeds(json);
  }

  async function postTick() {
    await fetch("http://127.0.0.1:5000/tick", { method: "POST" });
    getPlants();
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
    </tr>
  );

  const seeds = allSeeds.map(seed =>
    <tr>
      <td>{seed.id}</td>
      <td>{seed.name}</td>
      <td>{seed.flowering ? 'Yes' : 'No'}</td>
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
          </tr>
          {seeds}
        </table>
      </header>
    </div>
  );
}
