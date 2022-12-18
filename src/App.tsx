import { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import { Plant } from './plant.entity'

export default function App() {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const f = async (): Promise<void> => {
      const res = await fetch("http://127.0.0.1:5000/plants");
      const json = await res.json();
      setAllPlants(json);
    };
    f();
  }, []);
  const plants = allPlants.map(plant =>
    <tr>
      <td>{plant.id}</td>
      <td>{plant.name}</td>
    </tr>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Listing plants
        </h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
          {plants}
        </table>
      </header>
    </div>
  );
}
