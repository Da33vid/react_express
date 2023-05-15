import React, { useState, useEffect } from 'react';

function Tamagotchi() {
  const [name, setName] = useState('');
  const [hunger, setHunger] = useState();
  const [energy, setEnergy] = useState();
  const [happiness, setHappiness] = useState();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const updateHealthBar = () => {
      const healthBar = document.getElementById('health-bar');
      const healthValue = Math.max(0, Math.min(100, hunger + energy));
      const healthColor = getBarColor(healthValue);
      healthBar.style.width = `${healthValue}%`;
      healthBar.style.backgroundColor = healthColor;
    };

    const updateHappinessBar = () => {
      const happinessBar = document.getElementById('happiness-bar');
      const happinessColor = getBarColor(happiness);
      happinessBar.style.width = `${happiness}%`;
      happinessBar.style.backgroundColor = happinessColor;
    };

    updateHealthBar();
    updateHappinessBar();
  }, [hunger, energy, happiness]);

  useEffect(() => {
    fetch(`http://localhost:3000/tamagotchi/`)
      .then((response) => response.json())
      .then((data) => {
        const tamagotchi = data[0];
        setName(tamagotchi.nombre);
        setHunger(tamagotchi.hambre);
        setEnergy(tamagotchi.energia);
        setHappiness(tamagotchi.felicidad);
        setDate(new Date(tamagotchi.fecha));
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/tamagotchi/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: name,
        hambre: hunger,
        energia: energy,
        felicidad: happiness,
        fecha: date.toISOString()
      })
    });
  }, [name, hunger, energy, happiness, date]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const feedTamagotchi = () => {
    setHunger(Math.max(0, hunger - 10));
    setHappiness(happiness + 10);
    setDate(new Date());
  };

  const playWithTamagotchi = () => {
    setEnergy(Math.max(0, energy - 10));
    setHappiness(happiness + 10);
    setDate(new Date());
  };

  const sleepTamagotchi = () => {
    setEnergy(100);
    setHappiness(Math.max(0, happiness - 10));
    setDate(new Date());
  };

  const getBarColor = (value) => {
    if (value > 80) {
      return 'green';
    } else if (value > 20) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  return (
    <div className="tamagotchi">
      <h1>Tamagotchi</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <div className="health-bar-container">
        <div id="health-bar" className="health-bar"></div>
        <p>Health: {hunger + energy}</p>
      </div>
      <div className="happiness-bar-container">
        <div id="happiness-bar" className="happiness-bar"></div>
        <p>Happiness: {happiness}</p>
      </div>
      <p>Last action: {date.toLocaleString()}</p>
      <button onClick={feedTamagotchi}>Feed</button>
      <button onClick={playWithTamagotchi}>Play</button>
      <button onClick={sleepTamagotchi}>Sleep</button>
    </div>
  );
}

export default Tamagotchi;
