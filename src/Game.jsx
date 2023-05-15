import { useState, useEffect } from "react";
import options from "./Options";
import getResult from "./Results";
import OptionButton from "./OptionsButton";
import useChoices from "./UseChoices";

export default function Game() {
  const {
    userChoice,
    computerChoice,
    userMessage,
    computerMessage,
    result,
    disabled,
    handlePlay,
    reset,
  } = useChoices();
  const [playerName, setPlayerName] = useState("");

  const sendData = async (data) => {
  
      const response = await fetch("http://localhost:3000/partidas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
   
  };

  useEffect(() => {
    if (result !== null) {
      let resultado;
      if (result === 0) {
        resultado = "Empate";
      } else if (result === 1) {
        resultado = playerName;
      } else {
        resultado = "Gana la maquina";
      }
  
      const data = {
        fecha: new Date().toLocaleDateString(),
        jugador: playerName,
        resultado: resultado,
      };
      sendData(data);
    }
  }, [result]);
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="rounded-lg p-4 bg-gray-500">
        <h1 className="text-3xl mb-4 text-center font-bold">¡A jugar!</h1>
        <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        <h2 className="text-2xl mt-4 text-center font-bold">
          {playerName} vs Computadora
        </h2>


        <div className="max-w-md mx-auto">
          
          {options.map((option) => (
            <OptionButton
              key={option.id}
              option={option}
              handlePlay={handlePlay}
              disabled={disabled}
            />
          ))}
          {userChoice !== null && <p className="text-xl mt-4">{userMessage}</p>}
          {computerChoice !== null && (
            <p className="text-xl mt-4">{computerMessage}</p>
          )}
          {result !== null && (
            <div className="mt-8">
              {result === 0 && <p className="text-xl mt-4">🤷🏽‍♀️ Empate</p>}
              {result === 1 && (
                <p className="text-xl mt-4">
                  ✅ {playerName} ha ganado con {options[userChoice]?.name} contra{" "}
                  {options[computerChoice]?.name} el{" "}
                  {new Date().toLocaleString()}
                </p>
              )}
              {result === 2 && (
                <p className="text-xl mt-4">
                  ❌ {playerName} ha perdido con {options[userChoice]?.name} contra{" "}
                  {options[computerChoice]?.name} el{" "}
                  {new Date().toLocaleString()}
                </p>
              )}
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-black font-semibold py-2 px-4 mt-4 border-b-4 border-yellow-700"
                onClick={reset}
              >
                Jugar de nuevo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
