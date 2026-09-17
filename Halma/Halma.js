const fs = require("fs");
const path = require("path");

const directions = [
  { dx: -1, dy: 0 }, // left
  { dx: 1, dy: 0 }, // right
  { dx: 0, dy: -1 }, // up
  { dx: 0, dy: 1 }, // down
];

let width = 0;
let length = 0;

let startingPoint = null;
let nupud = [];

function readFile(filePath) {
  const absolutePath = path.resolve(__dirname, filePath);
  try {
    const data = fs.readFileSync(absolutePath, "utf8");
    const lines = data.trim().split(/\r?\n/);
    const [header, ...rows] = lines;
    const boardSizes = header.split(" ").map(Number);
    length = boardSizes[0];
    width = boardSizes[1];
    const board = Array.from({ length: length }, () =>
      Array(width).fill("null"),
    );
    rows.forEach((row, y) => {
      row.split("").forEach((symbol, x) => {
        if (symbol === "#") {
          startingPoint = { x, y };
        } else if (symbol === "*") {
          nupud.push({ x, y });
        }
        board[y][x] = symbol;
      });
    });
    return board;
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
  }
}

function step(currentPosition, direction) {
  const { x, y } = currentPosition;
  const { dx, dy } = direction;
  const isDirection = directions.some((dir) => dir.dx === dx && dir.dy === dy);
  if (!isDirection) {
    try {
      throw new Error("Invalid direction" + JSON.stringify(direction));
    } catch (error) {
      console.error(`Error in step function: ${error}`);
    }
  }
  return { x: x + dx, y: y + dy };
}

function jump(currentPosition, direction) {
  const { x, y } = currentPosition;
  const { dx, dy } = direction;
  if (!directions.some((dir) => dir.dx === dx && dir.dy === dy)) {
    try {
      throw new Error("Invalid direction" + JSON.stringify(direction));
    } catch (error) {
      console.error(`Error in jump function: ${error}`);
    }
  }
  return { x: x + dx * 2, y: y + dy * 2 };
}

function getValidMoves(board, position, isJump = false, visited = new Set()) {
  const validMoves = [];
  directions.forEach((direction) => {
    const stepPosition = step(position, direction);
    const jumpPosition = jump(position, direction);
    if (
      stepPosition.x >= 0 &&
      stepPosition.x < width &&
      stepPosition.y >= 0 &&
      stepPosition.y < length
    ) {
      if (board[stepPosition.y][stepPosition.x] === "." && !isJump) {
        isJump = false;
        validMoves.push(stepPosition);
      } else if (
        board[stepPosition.y][stepPosition.x] === "*" &&
        jumpPosition.x >= 0 &&
        jumpPosition.x < width &&
        jumpPosition.y >= 0 &&
        jumpPosition.y < length &&
        board[jumpPosition.y][jumpPosition.x] === "."
      ) {
        if (!visited.has(`${jumpPosition.x},${jumpPosition.y}`)) {
          visited.add(`${jumpPosition.x},${jumpPosition.y}`);
          validMoves.push(jumpPosition);
          const nextJumps = getValidMoves(board, jumpPosition, true, visited);
          validMoves.push(...nextJumps);
        }
      }
    }
  });

  return validMoves;
}

console.log(
  "Valid Moves:",
  getValidMoves(readFile("sisend.txt"), startingPoint),
);
