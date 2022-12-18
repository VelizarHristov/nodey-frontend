import { useState, useEffect } from 'react';

import './App.css';
import { Plant, Maturity } from './plant.entity'

export default function App() {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);

  async function getPlants(): Promise<void> {
    const res = await fetch("http://127.0.0.1:5000/plants");
    const json = await res.json();
    setAllPlants(json);
  }

  async function postTick() {
    await fetch("http://127.0.0.1:5000/tick", { method: "POST" });
    getPlants();
  }

  useEffect(() => {
    getPlants();
  }, []);

  const plants = allPlants.map(plant =>
    <tr>
      <td>{plant.id}</td>
      <td>{plant.name}</td>
      <td>{Maturity[plant.maturity]}</td>
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
          </tr>
          {plants}
        </table>
      </header>
    </div>
  );
}
