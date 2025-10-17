import {
  addRandomTile,
  createEmptyBoard,
  type TileValue,
  handleOperation,
  checkWin,
  checkLose,
} from "./utils";

export interface GameState {
  board: number[][];
  size: number;
  score: number;
  gameStatus?: "playing" | "won" | "lost";
  mergedPositions?: { r: number; c: number }[];
}

export type GameAction =
  | { type: "INIT" }
  | { type: "SET_SIZE"; payload: number }
  | { type: "UPDATE_SCORE"; payload: number }
  | { type: "ADD_RANDOM_TILE" }
  | { type: "MOVE_UP" }
  | { type: "MOVE_DOWN" }
  | { type: "MOVE_LEFT" }
  | { type: "MOVE_RIGHT" }
  | { type: "CLEAR_MERGES" };

export const initialState: GameState = {
  board: createEmptyBoard(4),
  size: 4,
  score: 0,
  gameStatus: "playing",
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        board: addRandomTile(
          addRandomTile(createEmptyBoard(state.size) as TileValue[][])
        ),
        score: 0,
        gameStatus: "playing",
      };
    case "SET_SIZE":
      return {
        ...state,
        size: action.payload,
        board: createEmptyBoard(action.payload),
        score: 0,
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        score: state.score + action.payload,
      };
    case "ADD_RANDOM_TILE":
      return {
        ...state,
        board: addRandomTile(state.board as TileValue[][]),
      };

    case "MOVE_UP":
    case "MOVE_DOWN":
    case "MOVE_LEFT":
    case "MOVE_RIGHT": {
      const moveDirection = action.type.split("_")[1];
      const { newBoard, scoreGain,merged } = handleOperation(
        state.board as TileValue[][],
        state.size,
        moveDirection
      );

      const boardUnchanged =
        JSON.stringify(newBoard) === JSON.stringify(state.board);

      if (boardUnchanged) return state;

      const boardWithAddedTile =  addRandomTile(newBoard);

      const newStatus = checkWin(boardWithAddedTile)
        ? "won"
        : checkLose(boardWithAddedTile)
        ? "lost"
        : "playing";

      return {
        ...state,
        board: boardWithAddedTile,
        score: state.score + scoreGain,
        gameStatus: newStatus,
        mergedPositions: merged ?? [],
      };
    }
    case 'CLEAR_MERGES':
        return {
            ...state,
            mergedPositions:[]
        }
    default:
      return state;
  }
}
