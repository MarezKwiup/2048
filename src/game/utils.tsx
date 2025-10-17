export function createEmptyBoard(size: number = 4): number[][] {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

export type TileValue =
  | 0
  | 2
  | 4
  | 8
  | 16
  | 32
  | 64
  | 128
  | 256
  | 512
  | 1024
  | 2048;

export const ColorCodes: Record<
  TileValue,
  { background: string; text: string }
> = {
  0: { background: "#BDAC97", text: "#75c183" },
  2: { background: "#eee4da", text: "#776e65" },
  4: { background: "#ede0c8", text: "#776e65" },
  8: { background: "#f2b179", text: "#f9f6f2" },
  16: { background: "#f59563", text: "#f9f6f2" },
  32: { background: "#f67c5f", text: "#f9f6f2" },
  64: { background: "#f65e3b", text: "#f9f6f2" },
  128: { background: "#edcf72", text: "#f9f6f2" },
  256: { background: "#edcc61", text: "#f9f6f2" },
  512: { background: "#edc850", text: "#f9f6f2" },
  1024: { background: "#edc53f", text: "#f9f6f2" },
  2048: { background: "#edc22e", text: "#f9f6f2" },
};

export function addRandomTile(board: TileValue[][]): TileValue[][] {
  const emptyCells: { row: number; col: number }[] = [];

  board.forEach((row, i) =>
    row.forEach((cell, j) => {
      if (cell == 0) emptyCells.push({ row: i, col: j });
    })
  );

  if (emptyCells.length === 0) return board;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);

  const { row, col } = emptyCells[randomIndex];

  const newValue: TileValue = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map((r) => [...r]);
  newBoard[row][col] = newValue;
  return newBoard;
}

interface MergeResult {
  newRow: TileValue[];
  scoreGain: number;
}

function handleRowMerge(row: TileValue[], size: number): MergeResult {
  let scoreGain = 0;
  const newRow: TileValue[] = new Array(size).fill(0);
  let currVal = -1;
  let currIndex = -1;
  for (let i = 0; i < row.length; i++) {
    if (row[i] === 0) continue;
    if ((row[i] as number) === currVal) {
      newRow[currIndex] = (currVal * 2) as TileValue;
      scoreGain = currVal * 2;
      currIndex++;
      currVal = -1;
    } else {
      currIndex++;
      newRow[currIndex] = row[i];
      currVal = row[i];
    }
  }
  return { newRow, scoreGain };
}

interface OperationResult {
  newBoard: TileValue[][];
  scoreGain: number;
}

export function handleOperation(
  board: TileValue[][],
  size: number,
  move: string
): OperationResult {
  const newBoard: TileValue[][] = Array.from({ length: size }, () =>
    Array(size).fill(0)
  );
  let totalScore = 0;
  switch (move) {
    case "UP": {
      for (let i = 0; i < board.length; i++) {
        let arr: TileValue[] = [];
        for (let j = 0; j < board.length; j++) {
          arr.push(board[j][i]);
        }
        const { newRow, scoreGain } = handleRowMerge(arr, size);
        totalScore += scoreGain;
        for (let j = 0; j < board.length; j++) {
          newBoard[j][i] = newRow[j] as TileValue;
        }
      }
      break;
    }
    case "DOWN": {
      for (let i = 0; i < board.length; i++) {
        let arr: TileValue[] = [];
        for (let j = board.length - 1; j >= 0; j--) {
          arr.push(board[j][i]);
        }
        const { newRow, scoreGain } = handleRowMerge(arr, size);
        newRow.reverse();
        totalScore += scoreGain;
        for (let j = board.length - 1; j >= 0; j--) {
          newBoard[j][i] = newRow[j];
        }
      }
      break;
    }
    case "LEFT": {
      for (let i = 0; i < board.length; i++) {
        let arr: TileValue[] = [];
        for (let j = 0; j < board.length; j++) {
          arr.push(board[i][j]);
        }
        const { newRow, scoreGain } = handleRowMerge(arr, size);
        totalScore += scoreGain;
        for (let j = 0; j < board.length; j++) {
          newBoard[i][j] = newRow[j];
        }
      }
      break;
    }
    case "RIGHT": {
      for (let i = 0; i < board.length; i++) {
        let arr: TileValue[] = [];
        for (let j = board.length - 1; j >= 0; j--) {
          arr.push(board[i][j]);
        }
        const { newRow, scoreGain } = handleRowMerge(arr, size);
        newRow.reverse();
        totalScore += scoreGain;
        for (let j = board.length - 1; j >= 0; j--) {
          newBoard[i][j] = newRow[j];
        }
      }
      break;
    }

    default:
      return { newBoard: board, scoreGain: 0 };
  }

  return { newBoard, scoreGain: totalScore };
}

export function checkWin(board: TileValue[][]): boolean {
  return board.some((row) => row.includes(2048));
}

export function checkLose(board: TileValue[][]): boolean {
  const size = board.length;

  if (board.some((row) => row.includes(0))) return false;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const value = board[i][j];
      if (
        (i < size - 1 && board[i + 1][j] === value) ||
        (j < size - 1 && board[i][j + 1] === value)
      ) {
        return false;
      }
    }
  }
  return true;
}
