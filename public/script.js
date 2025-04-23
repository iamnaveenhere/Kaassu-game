// const board = document.getElementById("board");
// const result = document.getElementById("result");
// const walletDiv = document.getElementById("wallet");
// const restartBtn = document.getElementById("restart");

// let cells = [];
// let player = "X";
// let cpu = "O";
// let wallet = 0;
// let gameOver = false;

// function drawBoard() {
//   board.innerHTML = "";
//   cells = [];

//   for (let i = 0; i < 9; i++) {
//     const cell = document.createElement("div");
//     cell.classList.add("cell");
//     cell.dataset.index = i;

//     cell.addEventListener("click", () => {
//       if (!gameOver && cell.textContent === "") {
//         makeMove(cell, player);
//         if (!checkWinner(player)) cpuMove();
//       }
//     });

//     board.appendChild(cell);
//     cells.push(cell);
//   }
//   result.textContent = "";
//   gameOver = false;
// }

// function makeMove(cell, symbol) {
//   cell.textContent = symbol;
//   cell.classList.add("taken");
//   if (checkWinner(symbol)) {
//     endGame(symbol);
//   } else if (isDraw()) {
//     endGame("draw");
//   }
// }

// function cpuMove() {
//     let shouldPlaySmart = Math.random() > 0.3; // 70% chance to play smart
  
//     if (shouldPlaySmart) {
//       let bestScore = -Infinity;
//       let bestMove;
  
//       for (let i = 0; i < cells.length; i++) {
//         if (cells[i].textContent === "") {
//           cells[i].textContent = cpu;
//           let score = minimax(cells, 0, false);
//           cells[i].textContent = "";
//           if (score > bestScore) {
//             bestScore = score;
//             bestMove = i;
//           }
//         }
//       }
  
//       if (bestMove !== undefined) {
//         makeMove(cells[bestMove], cpu);
//         return;
//       }
//     }
  
//     // Otherwise, make a random move (not always smart)
//     let available = Array.from(cells).filter(cell => cell.textContent === "");
//     if (available.length > 0) {
//       let randomCell = available[Math.floor(Math.random() * available.length)];
//       makeMove(randomCell, cpu);
//     }
//   }
  
  

//   function minimax(boardState, depth, isMaximizing) {
//     if (checkWinner(cpu)) return 1;
//     if (checkWinner(player)) return -1;
//     if (isDraw()) return 0;
  
//     if (isMaximizing) {
//       let bestScore = -Infinity;
//       for (let i = 0; i < boardState.length; i++) {
//         if (boardState[i].textContent === "") {
//           boardState[i].textContent = cpu;
//           let score = minimax(boardState, depth + 1, false);
//           boardState[i].textContent = "";
//           bestScore = Math.max(score, bestScore);
//         }
//       }
//       return bestScore;
//     } else {
//       let bestScore = Infinity;
//       for (let i = 0; i < boardState.length; i++) {
//         if (boardState[i].textContent === "") {
//           boardState[i].textContent = player;
//           let score = minimax(boardState, depth + 1, true);
//           boardState[i].textContent = "";
//           bestScore = Math.min(score, bestScore);
//         }
//       }
//       return bestScore;
//     }
//   }
  

// function checkWinner(symbol) {
//   const winPatterns = [
//     [0,1,2],[3,4,5],[6,7,8], // Rows
//     [0,3,6],[1,4,7],[2,5,8], // Cols
//     [0,4,8],[2,4,6]          // Diags
//   ];

//   return winPatterns.some(pattern =>
//     pattern.every(i => cells[i].textContent === symbol)
//   );
// }

// function isDraw() {
//   return cells.every(cell => cell.textContent !== "");
// }

// function endGame(winner) {
//     gameOver = true;
//     let points = Math.floor(Math.random() * 50); // max 49
  
//     if (winner === player) {
//       result.textContent = `You Win! +${points} points`;
//       updateWallet(points);
//     } else if (winner === "draw") {
//       result.textContent = `Draw! No points`;
//     } else {
//       result.textContent = `CPU Wins! No points`;
//     }
//   }
  

// function updateWallet(points) {
//   fetch("/wallet/add", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ points })
//   })
//   .then(res => res.json())
//   .then(data => {
//     wallet = data.wallet;
//     walletDiv.textContent = `Wallet: ${wallet} points`;
//   });
// }

// restartBtn.addEventListener("click", drawBoard);

// function fetchWallet() {
//   fetch("/wallet")
//     .then(res => res.json())
//     .then(data => {
//       wallet = data.wallet;
//       walletDiv.textContent = `Wallet: ${wallet} points`;
//     });
// }

// drawBoard();
// fetchWallet();





const board = document.getElementById("board");
const result = document.getElementById("result");
const walletDiv = document.getElementById("wallet");
const restartBtn = document.getElementById("restart");

let currentBoard = Array(9).fill("");
let gameOver = false;


function drawBoard() {
  board.innerHTML = "";
  currentBoard.forEach((symbol, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = symbol;
    cell.dataset.index = i;

    if (symbol === "") {
      cell.addEventListener("click", () => makeMove(i));
    }

    board.appendChild(cell);
  });
}

function makeMove(index) {
  fetch("/game/play", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board: currentBoard, move: index })
  })
    .then(res => res.json())
    .then(data => {
      currentBoard = data.board;
      drawBoard();
      if (data.winner === "player") {
        result.textContent = `You win! +${data.points} pts`;
        gameOver = true;
      } else if (data.winner === "cpu") {
        result.textContent = `CPU wins!`;
        gameOver = true;
      } else if (data.winner === "draw") {
        result.textContent = `Draw!`;
        gameOver = true;
      } else {
        result.textContent = "";
      }

      if (data.wallet !== undefined) {
        walletDiv.textContent = `Wallet: ${data.wallet} points`;
      }
    });
}

function restartGame() {
  currentBoard = Array(9).fill("");
  result.textContent = "";
  gameOver = false; // Allow new moves
  drawBoard();
}

restartBtn.addEventListener("click", restartGame);
window.addEventListener("DOMContentLoaded", () => {
  fetch("/wallet")
    .then(res => res.json())
    .then(data => {
      walletDiv.textContent = `Wallet: ${data.wallet} points`;
    });

  restartGame();
});

