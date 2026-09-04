const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let win = 7;

function minimax(position, isBotTurn) {
  if (position >= win) {
    return isBotTurn ? 0 : 1;
  }
  if (isBotTurn) {
    const move1 = minimax(position + 1, false);
    const move2 = minimax(position + 2, false);
    return Math.max(move1, move2);
  }
  const move1 = minimax(position + 1, true);
  const move2 = minimax(position + 2, true);
  return Math.min(move1, move2);
}

function botBestMove(position) {
  const move1 = minimax(position + 1, false);
  const move2 = minimax(position + 2, false);
  return move2 > move1 ? 2 : 1;
}

function buildTree(position, isBotTurn, step = 0) {
  let entry = step === 0 ? "" : " ".repeat(step - 1) + "└─ ";
  console.log(entry + `${position} (${isBotTurn})`);

  if (position >= win) {
    return;
  }
  let next = isBotTurn ? 0 : 1;

  for (let i = 1; i <= 2; i++) {
    const newPosition = position + i;
    if (newPosition <= win) {
      buildTree(newPosition, next, step + 1);
    }
  }
}

//buildTree(1, false);

function playGame() {
  console.log("Welcome to the game! The goal is to reach 7.");
  console.log("You can add 1 or 2 to the current number on your turn.");
  console.log("Choose who goes first: (1) You or (2) Bot");

  let isBotTurn = false;
  let position = 1;

  function printBoard(position) {
    let board = "";
    for (let i = 1; i <= win; i++) {
      board += position === i ? ` [${position}]` : ` ${i}`;
    }
    console.log(`Board:${board}`);
  }

  function startGame() {
    rl.question("Enter 1 or 2: ", (first) => {
      if (first.trim() !== "1" && first.trim() !== "2") {
        console.log("Invalid input. Please enter 1 or 2: ");
        startGame();
        return;
      }

      isBotTurn = first.trim() === "2";
      console.log(
        `Starting position: ${position}. ${isBotTurn ? "Bot goes" : "You go"} first.`,
      );
      printBoard(position);
      takeTurn();
    });
  }

  function takeTurn() {
    if (position >= win) {
      console.log(`Game over! ${isBotTurn ? "You win" : "Bot wins"}!`);
      rl.close();
      return;
    }

    if (isBotTurn) {
      const botMove = botBestMove(position);
      console.log(`Bot is thinking...`);
      setTimeout(() => {
        position += botMove;
        console.log(`Bot adds ${botMove}. New position: ${position}`);
        printBoard(position);
        isBotTurn = false;
        takeTurn();
      }, 1000);
      return;
    }

    rl.question("Your turn! Enter 1 or 2: ", (input) => {
      const num = parseInt(input.trim(), 10);
      if (num !== 1 && num !== 2) {
        console.log("Invalid input. Please enter 1 or 2: ");
        takeTurn();
        return;
      }
      position += num;
      console.log(`You add ${num}. New position: ${position}`);
      printBoard(position);
      isBotTurn = true;
      takeTurn();
    });
  }

  startGame();
}
playGame();
