 

const boardLength = 0;
const board = new Array(boardLength).fill(0).map(() => new Array(boardLength).fill("."));
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const path = require('path');
const sisend = path.join(__dirname, 'sisend.txt');

const fs = require('fs');

let startingPosition = [0, 0];

function getboard(input) {
    try {
        const data = fs.readFileSync(input, 'utf8');
        const lines = data.split('\n');
        for (let i = 0; i < lines.length && i < boardLength; i++) {
            for (let j = 0; j < lines[i].length && j < boardLength; j++) {
                board[i][j] = lines[i][j];
            }
        }
    } catch (error) {
        console.error("Error reading file:", error);
    }
    return board;
}

function move(direction, position) {
    return new Promise((resolve, reject) => {
        let newPosition = [position[0] + direction[0], position[1] + direction[1]];
        if (newPosition[0] >= 0 && newPosition[0] < boardLength && newPosition[1] >= 0 && newPosition[1] < boardLength) {
            resolve(newPosition);
        } else {
            reject("Invalid move");
        }
    })
}

function jumpOver(direction, position) {
    return new Promise((resolve, reject) => {
        let newPosition = [position[0] + direction[0] * 2, position[1] + direction[1] * 2];
        if (newPosition[0] >= 0 && newPosition[0] < boardLength && newPosition[1] >= 0 && newPosition[1] < boardLength) {
            resolve(newPosition);
        } else {
            reject("Invalid jump");
        }
    })
}

function printBoard() {
    console.log(board.map(row => row.join(" ")).join("\n"));
}

printBoard();
getboard(sisend);
printBoard();

