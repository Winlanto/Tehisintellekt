//1. Kodutöö: Minimax algoritm
//Isolation Game
//See mang algab boardLength x boardLength ruudustikuga, kus mängija ja bot alustavad algasendist nt (5) ning liigutavad oma positsiooni vasakule, paremale, üles või alla. Kui mängija või bot liigub, põletatakse see positsioon ja seda ei saa enam kasutada. Mäng lõpeb, kui üks osapool ei saa enam liikuda. Mängija võidab, kui bot ei saa enam liikuda, ja bot võidab, kui mängija ei saa enam liikuda.
//
//       1 | 2 | 3
//     ---+-------
//       4 | 5 | 6
//     -----------
//       7 | 8 | 9
//
//
//
//     |   | x | 0 |
//     -------------
//     |   | x |   |    - x positsioon on juba kasutatud; 0 positsioon on mängija või boti positsioon
//     -------------
//     |   |   |   |

const boardLength = 3;

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let boardSize = boardLength * boardLength;
let burnedPositions = new Set();

function move(position, direction) {
  let nextPosition = position;
  if (direction === "right") {
    if (position % boardLength < boardLength - 1) {
      nextPosition++;
    }
  }
  if (direction === "left") {
    if (position % boardLength > 0) {
      nextPosition--;
    }
  }
  if (direction === "up") {
    if (position >= boardLength) {
      nextPosition -= boardLength;
    }
  }
  if (direction === "down") {
    if (position < boardSize - boardLength) {
      nextPosition += boardLength;
    }
  }
  return nextPosition !== position ? nextPosition : null;
}

function getAvailableMoves(position, burnedPositions) {
  const availableMoves = [];
  ["left", "right", "up", "down"].forEach((direction) => {
    const nextPosition = move(position, direction);
    if (nextPosition !== null && !burnedPositions.has(nextPosition)) {
      availableMoves.push({ direction, position: nextPosition });
    }
  });
  return availableMoves;
}

// 0 inimene; 1 bot
function minimax(position, burnedPositions, isBotTurn) {
  let availableMoves = getAvailableMoves(position, burnedPositions);
  if (availableMoves.length === 0) {
    return isBotTurn ? 0 : 1;
  }

  let scores = [];

  if (isBotTurn) {
    for (let move of availableMoves) {
      let nextBurnedPositions = new Set(burnedPositions);
      nextBurnedPositions.add(move.position);
      let score = minimax(move.position, nextBurnedPositions, false);
      scores.push(score);
    }
    return Math.max(...scores);
  } else {
    for (let move of availableMoves) {
      let nextBurnedPositions = new Set(burnedPositions);
      nextBurnedPositions.add(move.position);
      let score = minimax(move.position, nextBurnedPositions, true);
      scores.push(score);
    }
    return Math.min(...scores);
  }
}

// console.log(move(0, "left"));
// console.log(move(1, "down"));
// console.log(getAvailableMoves(0, burnedPositions));
// console.log(minimax(0, burnedPositions, true));

function buildTree(position, burnedPositions, isBotTurn, step = 0) {
  let availableMoves = getAvailableMoves(position, burnedPositions);
  let entry = step === 0 ? "" : " ".repeat(step - 1) + "└─ ";
  console.log(entry + `${position} (${isBotTurn})`);
  if (availableMoves.length === 0) {
    return;
  }
  for (let move of availableMoves) {
    const nextBurnedPositions = new Set(burnedPositions);
    nextBurnedPositions.add(move.position);
    buildTree(move.position, nextBurnedPositions, !isBotTurn, step + 1);
  }
}

let testBurntPositions = new Set([0, 1, 2, 5, 8]);

//buildTree(5, burnedPositions, true);

function botBestMove(position, burnedPositions) {
  const availableMoves = getAvailableMoves(position, burnedPositions);
  if (availableMoves.length === 0) {
    console.log("No available moves for bot.");
    return null;
  }
  let bestMove = null;
  let bestScore = -1;
  for (let move of availableMoves) {
    let nextBurnedPositions = new Set(burnedPositions);
    nextBurnedPositions.add(move.position);
    let score = minimax(move.position, nextBurnedPositions, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

//console.log(botBestMove(5, burnedPositions));

function printBoard(position, burnedPositions, isbotTurn) {
  let board = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const pos = i * 3 + j;
      if (pos === position) {
        isbotTurn ? (board += " [B]") : (board += " [P]");
      } else if (burnedPositions.has(pos)) {
        board += " [X]";
      } else {
        board += ` [${pos + 1}]`;
      }
    }
    board += "\n";
  }
  console.log(`\n${board}`);
}

function startGame() {
  const startingPosition = 1;
  burnedPositions.add(startingPosition);
  console.log("\n\t\tWelcome to the Isolation Game!");
  console.log(
    `\n\tYou and the bot will take turns moving on a ${boardLength}x${boardLength} grid.`,
  );
  console.log("\tThe goal is to trap your opponent so they cannot move.");
  console.log(
    "\tYou can move up, down, left, or right from your current position.",
  );
  rl.question(
    "\nChoose who goes first: (1) You player (P) or (2) Bot (B). Enter 1 or 2: ",
    (answer) => {
      let isBotTurn = answer.trim() === "2";
      console.log(
        `Starting position: ${startingPosition + 1}. ${isBotTurn ? "Bot goes" : "You go"} first.`,
      );
      takeTurn(startingPosition, burnedPositions, isBotTurn);
    },
  );

  function takeTurn(position, burnedPositions, isBotTurn) {
    printBoard(position, burnedPositions, isBotTurn);
    if (getAvailableMoves(position, burnedPositions).length === 0) {
      console.log(`${isBotTurn ? "You win!" : "Bot wins!"}`);
      rl.close();
      return;
    }
    if (isBotTurn) {
      const botMove = botBestMove(position, burnedPositions);
      console.log("Bot is thinking...");
      if (botMove) {
        setTimeout(() => {
          console.log(`\nBot moved to position ${botMove.position + 1}.`);
          const nextBurnedPositions = new Set(burnedPositions);
          nextBurnedPositions.add(botMove.position);
          takeTurn(botMove.position, nextBurnedPositions, false);
        }, 1000);
      }
    } else {
      rl.question("Enter your move (up, down, left, right): ", (direction) => {
        const newPosition = move(position, direction.trim().toLowerCase());
        if (newPosition !== null && !burnedPositions.has(newPosition)) {
          const nextBurnedPositions = new Set(burnedPositions);
          nextBurnedPositions.add(newPosition);
          takeTurn(newPosition, nextBurnedPositions, true);
        } else {
          console.log("Invalid move. Please try again.");
          takeTurn(position, burnedPositions, false);
        }
      });
    }
  }
}

startGame();
