// // server.js
// import express from "express";
// import path from "path";
// import bodyParser from "body-parser";
// import cors from "cors";
// import { fileURLToPath } from "url";

// const app = express();
// const PORT = 4000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "public")));
// app.use(cors());
// app.use(bodyParser.json());

// let wallet = 0;
// let currentBoard = Array(9).fill("");
// let gameOver = false;

// const WIN_PATTERNS = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// function checkWinner(board, symbol) {
//   return WIN_PATTERNS.some((pattern) => pattern.every((i) => board[i] === symbol));
// }

// function isDraw(board) {
//   return board.every((cell) => cell !== "");
// }

// function minimax(board, depth, isMax, player, cpu) {
//   if (checkWinner(board, cpu)) return 1;
//   if (checkWinner(board, player)) return -1;
//   if (isDraw(board)) return 0;

//   const symbol = isMax ? cpu : player;
//   let bestScore = isMax ? -Infinity : Infinity;

//   for (let i = 0; i < board.length; i++) {
//     if (board[i] === "") {
//       board[i] = symbol;
//       const score = minimax(board, depth + 1, !isMax, player, cpu);
//       board[i] = "";
//       bestScore = isMax ? Math.max(score, bestScore) : Math.min(score, bestScore);
//     }
//   }

//   return bestScore;
// }

// function getBestCpuMove(board, player, cpu) {
//   let bestScore = -Infinity;
//   let move = -1;

//   for (let i = 0; i < board.length; i++) {
//     if (board[i] === "") {
//       board[i] = cpu;
//       const score = minimax(board, 0, false, player, cpu);
//       board[i] = "";
//       if (score > bestScore) {
//         bestScore = score;
//         move = i;
//       }
//     }
//   }

//   return move;
// }

// app.post("/game/play", (req, res) => {
//   const { move } = req.body;
//   const player = "X";
//   const cpu = "O";

//   if (gameOver || typeof move !== "number" || currentBoard[move] !== "") {
//     return res.status(400).json({ error: "Invalid move" });
//   }

//   currentBoard[move] = player;

//   if (checkWinner(currentBoard, player)) {
//     gameOver = true;
//     const points = Math.floor(Math.random() * 50);
//     wallet += points;
//     return res.json({ board: currentBoard, winner: "player", points, wallet });
//   }

//   if (isDraw(currentBoard)) {
//     gameOver = true;
//     return res.json({ board: currentBoard, winner: "draw", points: 0, wallet });
//   }

//   const cpuIndex = getBestCpuMove(currentBoard, player, cpu);
//   if (cpuIndex >= 0) currentBoard[cpuIndex] = cpu;

//   if (checkWinner(currentBoard, cpu)) {
//     gameOver = true;
//     return res.json({ board: currentBoard, winner: "cpu", points: 0, wallet });
//   }

//   if (isDraw(currentBoard)) {
//     gameOver = true;
//     return res.json({ board: currentBoard, winner: "draw", points: 0, wallet });
//   }

//   res.json({ board: currentBoard, winner: null, points: 0, wallet });
// });

// app.get("/wallet", (req, res) => {
//   res.json({ wallet });
// });

// app.post("/game/restart", (req, res) => {
//   currentBoard = Array(9).fill("");
//   gameOver = false;
//   res.json({ board: currentBoard });
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });




// import express from "express";
// import path from "path";
// import bodyParser from "body-parser";
// import cors from "cors";
// import { fileURLToPath } from "url";

// const app = express();
// const PORT = 4000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "public")));
// app.use(cors());
// app.use(bodyParser.json());

// let wallet = 0;
// let currentBoard = Array(9).fill("");
// let gameOver = false;

// const WIN_PATTERNS = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// function checkWinner(board, symbol) {
//   return WIN_PATTERNS.some((pattern) => pattern.every((i) => board[i] === symbol));
// }

// function isDraw(board) {
//   return board.every((cell) => cell !== "");
// }

// // Simpler CPU strategy
// function getBestCpuMove(board, player, cpu) {


//   const smartChance = 80; // % of time CPU plays smart

//   const randomNum = Math.floor(Math.random() * 100) + 1; //Math.random() * 100 gives a decimal between 0 and 99.999... Math.floor() cuts off the decimal part — so now you get integers from 0 to 49. Adding +1 turns it into a range from 1 to 50. Math.floor(Math.random() * 50) gives 0 to 49. Math.floor(Math.random() * 50) + 1	gives ✅ 1 to 50.
//   if (randomNum >= smartChance) {
//     // Play random (dumb) move
//     const emptyIndexes = board
//       .map((val, idx) => val === "" ? idx : -1)
//       .filter(idx => idx !== -1);

//     return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
//   }



//    // Play smart (try to win or block)
//   // 1. Try to win
//   for (let i = 0; i < board.length; i++) {
//     if (board[i] === "") {
//       board[i] = cpu;
//       if (checkWinner(board, cpu)) {
//         return i;
//       }
//       board[i] = "";
//     }
//   }

//   // 2. Block player from winning
//   for (let i = 0; i < board.length; i++) {
//     if (board[i] === "") {
//       board[i] = player;
//       if (checkWinner(board, player)) {
//         board[i] = "";
//         return i;
//       }
//       board[i] = "";
//     }
//   }

//   // 3. Pick random empty spot
//   const emptyIndexes = board
//                        .map((val, idx) => val === "" ? idx : -1)
//                        .filter(idx => idx !== -1);
//   if (emptyIndexes.length > 0) {
//     return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
//   }

//   return -1; // No moves
// }

// app.post("/game/play", (req, res) => {
//   const { move } = req.body;
//   const player = "X";
//   const cpu = "O";

//   if (gameOver || typeof move !== "number" || currentBoard[move] !== "") {
//     return res.status(400).json({ error: "Invalid move" });
//   }

//   currentBoard[move] = player;

//   if (checkWinner(currentBoard, player)) {
//     gameOver = true;
//     const points = Math.floor(Math.random() * 50);
//     wallet += points;
//     return res.json({ board: currentBoard, winner: "player", points, wallet });
//   }

//   if (isDraw(currentBoard)) {
//     gameOver = true;
//     return res.json({ board: currentBoard, winner: "draw", points: 0, wallet });
//   }

//   const cpuIndex = getBestCpuMove(currentBoard, player, cpu);
//   if (cpuIndex >= 0) currentBoard[cpuIndex] = cpu;

//   if (checkWinner(currentBoard, cpu)) {
//     gameOver = true;
//     return res.json({ board: currentBoard, winner: "cpu", points: 0, wallet });
//   }

//   if (isDraw(currentBoard)) {
//     gameOver = true;
//     return res.json({ board: currentBoard, winner: "draw", points: 0, wallet });
//   }

//   res.json({ board: currentBoard, winner: null, points: 0, wallet });
// });

// app.get("/wallet", (req, res) => {
//   res.json({ wallet });
// });

// app.post("/game/restart", (req, res) => {
//   currentBoard = Array(9).fill("");
//   gameOver = false;
//   res.json({ board: currentBoard });
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });




import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const PORT = 4000;

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());

// Game state
let wallet = 0;
let currentBoard = Array(9).fill("");
let gameOver = false;

// Winning patterns for Tic-Tac-Toe
const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Check if given symbol has a winning combination
function checkWinner(board, symbol) {
  return WIN_PATTERNS.some((pattern) => pattern.every((i) => board[i] === symbol));
}

// Check if the board is full with no winner
function isDraw(board) {
  return board.every((cell) => cell !== "");
}

// Simpler CPU strategy
function getBestCpuMove(board, player, cpu) {
  const smartChance = 80; // % of time CPU plays smart

  const randomNum = Math.floor(Math.random() * 100) + 1;

  // 20% chance to play random (dumb) move
  if (randomNum >= smartChance) {
    const emptyIndexes = board
      .map((val, idx) => val === "" ? idx : -1)
      .filter(idx => idx !== -1);

    return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  }

  // 1. Try to win
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = cpu;
      if (checkWinner(board, cpu)) {
        return i;
      }
      board[i] = "";
    }
  }

  // 2. Block player from winning
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = player;
      if (checkWinner(board, player)) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }
  }

  // 3. Pick random empty spot
  const emptyIndexes = board
    .map((val, idx) => val === "" ? idx : -1)
    .filter(idx => idx !== -1);

  return emptyIndexes.length > 0
    ? emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)]
    : -1;
}

// Handle player move and CPU response
app.post("/game/play", (req, res) => {
  const { move } = req.body;
  const player = "X";
  const cpu = "O";

  if (gameOver || typeof move !== "number" || currentBoard[move] !== "") {
    return res.status(400).json({ error: "Invalid move" });
  }

  // Player move
  currentBoard[move] = player;

  // Player wins
  if (checkWinner(currentBoard, player)) {
    gameOver = true;
    const points = Math.floor(Math.random() * 50);
    wallet += points;
    return res.json({ board: currentBoard, winner: "player", points, wallet });
  }

  // Draw after player move
  if (isDraw(currentBoard)) {
    gameOver = true;
    return res.json({ board: currentBoard, winner: "draw", points: 0, wallet });
  }

  // CPU move
  const cpuIndex = getBestCpuMove(currentBoard, player, cpu);
  if (cpuIndex >= 0) currentBoard[cpuIndex] = cpu;

  // CPU wins
  if (checkWinner(currentBoard, cpu)) {
    gameOver = true;
    return res.json({ board: currentBoard, winner: "cpu", points: 0, wallet });
  }

  // Draw after CPU move
  if (isDraw(currentBoard)) {
    gameOver = true;
    return res.json({ board: currentBoard, winner: "draw", points: 0, wallet });
  }

  // Game continues
  res.json({ board: currentBoard, winner: null, points: 0, wallet });
});

// Return current wallet points
app.get("/wallet", (req, res) => {
  res.json({ wallet });
});

// Restart the game board
app.post("/game/restart", (req, res) => {
  currentBoard = Array(9).fill("");
  gameOver = false;
  res.json({ board: currentBoard });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
