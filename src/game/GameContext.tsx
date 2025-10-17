import React,{createContext,useReducer,type ReactNode,type Dispatch} from "react";
import { gameReducer } from "./gameReducer";
import { initialState,type GameState,type GameAction } from "./gameReducer";

interface GameContextType {
    state:GameState,
    dispatch:Dispatch<GameAction>
}

export const GameContext = createContext<GameContextType|undefined>(undefined);

interface GameProviderProps{
    children:ReactNode
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
