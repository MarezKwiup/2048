import React, { useState, useContext } from "react";
import { GameContext } from "../game/GameContext";

const SizeSelector: React.FC = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("GameContext must be used within GameProvider");
  const { dispatch } = context;
  const [boardSize, setBoardSize] = useState(4);

  const handleStart = () => {
    dispatch({ type: "SET_SIZE", payload: boardSize });
    dispatch({ type: "INIT" });
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <label className="text-lg font-medium text-[#776e65]">Board Size:</label>
      <select
        value={boardSize}
        onChange={(e) => setBoardSize(Number(e.target.value))}
        className="p-2 rounded-lg bg-[#ede0c8] text-[#776e65] font-semibold focus:outline-none"
      >
        {[3, 4, 5, 6, 8].map((size) => (
          <option key={size} value={size}>
            {size} × {size}
          </option>
        ))}
      </select>
      <button
        onClick={handleStart}
        className="px-5 py-2 bg-[#9D4EDD] text-white rounded-lg font-semibold hover:bg-[#7b2fa3] transition"
      >
        Start New Game
      </button>
    </div>
  );
};


export default SizeSelector;