let win = 5;

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

buildTree(1, false);
