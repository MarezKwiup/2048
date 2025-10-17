import React, { useContext } from "react";
import { GameContext } from "../game/GameContext";

interface GameModalProps {
  message: string;
}

const GameModal: React.FC<GameModalProps> = ({ message }) => {
  const context = useContext(GameContext);
  if (!context) throw new Error("GameContext must be used within GameProvider");
  const { dispatch } = context;

  return (
    <div className="absolute inset-0 bg-transparent bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#f9f4ef] rounded-xl shadow-lg p-8 w-80 flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-[#776e65]">{message}</h2>
        <button
          onClick={() => {
            console.log("Restart button clicked!")
            dispatch({ type: "INIT" })
          }}
          className="px-6 py-3 bg-[#9D4EDD] text-white font-semibold rounded-lg hover:bg-[#7b2fa3] transition"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameModal;
