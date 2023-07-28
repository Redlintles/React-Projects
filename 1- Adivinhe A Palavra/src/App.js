import "./App.css";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import EndScreen from "./components/EndScreen";


import { useCallback, useEffect, useState } from "react";

function App() {

  const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" },
  ]

  const [gameStage, setGameStage] = useState(stages[0].name);

  function toGame() {
    setGameStage(stages[1].name)
  }
  function toEnd() {
    setGameStage(stages[2].name)
  }
  function toStart() {
    setGameStage(stages[0].name)
  }



  return (
    <main>
      {gameStage === "start" && <StartScreen changeScreen = {toGame}/>}
      {gameStage === "game" && <GameScreen changeScreen = {toEnd} />}
      {gameStage === "end" && <EndScreen changeScreen = {toStart} />}

    </main>
  );
}

export default App;
