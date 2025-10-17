# 2048 Game

A fully functional **2048 game** built with **React**, **TypeScript**, and **TailwindCSS**. This project demonstrates state management with **React Context + Reducer** and implements the full game logic including tile merging, scoring, and win/loss detection.

---

## Features

- Classic 2048 gameplay with a dynamic grid size (3×3 to 8×8).
- Keyboard controls for moving tiles: Arrow keys.
- Score tracking and display.
- Win/Loss detection with modal popups.
- Responsive UI built with **TailwindCSS**.
- Random tile generation and smooth merging logic.

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd 2048
```
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```
## Gameplay
- Use Arrow keys to move tiles.
- Tiles with the same number merge into one when they collide.
- Your goal is to reach the 2048 tile.
- You can start a new game or change the board size anytime using the selector.

## Implementation Details

### Uses a 2-d matrix data structure to store the current state and handle updates

### 1. Board Initialization
- utils.ts provides createEmptyBoard() to generate an empty board and addRandomTile() to add new tiles.

### 2. Game State Management
- GameContext + useReducer manages the game state, including board, score, and game status.

### 3. Game Logic

- handleOperation() handles moves in all four directions with proper tile merging.

- checkWin() and checkLose() detect game end conditions.

### 4. UI Components

- Board.tsx renders the game board and handles keyboard input.

- Cell.tsx renders individual tiles with color codes.

- SizeSelect.tsx allows the user to select board size.

- GameModal.tsx displays a modal on win/loss.

### 5. Styling

- TailwindCSS is used for responsive and modern UI design.

## Technologies Used

- React
- TypeScript
- TailwindCSS
- Vite (build tool and development server)
- Responsive UI built with **TailwindCSS**.





