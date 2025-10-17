import React, { useContext, useEffect } from "react";
import { GameProvider, GameContext } from "./game/GameContext";
import Cell from "./components/cell";
import type { TileValue } from "./game/utils";
import GameModal from "./components/GameModal";
import SizeSelector from "./components/SizeSelect";

function Board() {
  const context = useContext(GameContext);
  if (!context) throw new Error("GameContext must be used within GameProvider");
  const { state, dispatch } = context;

  useEffect(() => {
    dispatch({ type: "INIT" });

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          console.log("Move Up");
          dispatch({ type: "MOVE_UP" });
          break;
        case "ArrowDown":
          console.log("Move down");
          dispatch({ type: "MOVE_DOWN" });
          break;
        case "ArrowLeft":
          console.log("Move Left");
          dispatch({ type: "MOVE_LEFT" });
          break;
        case "ArrowRight":
          console.log("Move Right");
          dispatch({ type: "MOVE_RIGHT" });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-50 mt-4 justify-between">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[#3D3329] text-6xl font-extrabold">2048</h1>
          <p className="text-[#3D3329]">Join tiles to reach 2048!</p>
        </div>
        <div className="flex mt-5 flex-col items-center justify-center">
          <div className="bg-[#DAD4C9] items-center mt-3 aspect-square border-0 p-2 rounded-md gap-2 flex flex-col">
            <h2 className="text-[#7F7268]">Score</h2>
            <h2 className="text-[#3E3429] text-3xl font-bold">{state.score}</h2>
          </div>
          <button
            className="bg-[#CB7F34] hover:bg-[#CB8641] p-2 mt-2 text-white border-0 rounded-md"
            onClick={() => {
              dispatch({ type: "INIT" });
            }}
          >
            New Game
          </button>
        </div>
      </div>

      <SizeSelector />

      <div
        className="grid gap-2 bg-[#9C8B7C] p-2 rounded-lg mt-4"
        style={{
          gridTemplateColumns: `repeat(${state.size}, 1fr)`,
          gap: "0.5rem",
          width: "min(90vw,400px)",
        }}
      >
        {state.board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="aspect-square flex items-center justify-center bg-[#cdc1b4] text-[#776e65] font-bold rounded-md shadow-inner"
            >
              <Cell value={cell as TileValue} />
            </div>
          ))
        )}
      </div>

      {state.gameStatus === "won" && <GameModal message="You Win" />}
      {state.gameStatus === "lost" && <GameModal message="Game Over" />}

      <p className="text-[#7F7268] mt-2 ">Use arrow keys to move tiles. Tiles with the same number merge into one!</p>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Board />
    </GameProvider>
  );
}
