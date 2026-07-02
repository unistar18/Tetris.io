const COLS = 10;
const ROWS = 20;
const BUFFER_ROWS = ROWS;
const boardEl = document.getElementById("board");
const bufferBoardEl = document.getElementById("buffer-board");
const nextPieceEl = document.getElementById("next-piece");
const levelDotsEl = document.getElementById("level-dots");
const restartBtn = document.getElementById("restart-btn");

const tetrominoes = {
  I: {
    color: "#38bdf8",
    states: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
    ],
  },
  O: {
    color: "#facc15",
    states: [
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  T: {
    color: "#a78bfa",
    states: [
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  J: {
    color: "#60a5fa",
    states: [
      [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  L: {
    color: "#fb923c",
    states: [
      [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  S: {
    color: "#4ade80",
    states: [
      [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
  Z: {
    color: "#fb7185",
    states: [
      [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
  },
};

const JLSTZ_KICKS = {
  "0>1": [
    { dx: 0, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: 1 },
    { dx: 0, dy: -2 },
    { dx: -1, dy: -2 },
  ],
  "1>2": [
    { dx: 0, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 1, dy: -1 },
    { dx: 0, dy: 2 },
    { dx: 1, dy: 2 },
  ],
  "2>3": [
    { dx: 0, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
    { dx: 0, dy: -2 },
    { dx: 1, dy: -2 },
  ],
  "3>0": [
    { dx: 0, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: -1 },
    { dx: 0, dy: 2 },
    { dx: -1, dy: 2 },
  ],
  "0>3": [
    { dx: 0, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
    { dx: 0, dy: -2 },
    { dx: 1, dy: -2 },
  ],
  "3>2": [
    { dx: 0, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 1, dy: -1 },
    { dx: 0, dy: 2 },
    { dx: 1, dy: 2 },
  ],
  "2>1": [
    { dx: 0, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: 1 },
    { dx: 0, dy: -2 },
    { dx: -1, dy: -2 },
  ],
  "1>0": [
    { dx: 0, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: -1 },
    { dx: 0, dy: 2 },
    { dx: -1, dy: 2 },
  ],
};

const I_KICKS = {
  "0>1": [
    { dx: 0, dy: 0 },
    { dx: -2, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: -2, dy: -1 },
    { dx: 1, dy: 2 },
  ],
  "1>2": [
    { dx: 0, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 2, dy: 0 },
    { dx: -1, dy: 2 },
    { dx: 2, dy: -1 },
  ],
  "2>3": [
    { dx: 0, dy: 0 },
    { dx: 2, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 2, dy: 1 },
    { dx: -1, dy: -2 },
  ],
  "3>0": [
    { dx: 0, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: -2, dy: 0 },
    { dx: 1, dy: -2 },
    { dx: -2, dy: 1 },
  ],
  "0>3": [
    { dx: 0, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 2, dy: 0 },
    { dx: -1, dy: 2 },
    { dx: 2, dy: -1 },
  ],
  "3>2": [
    { dx: 0, dy: 0 },
    { dx: 2, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 2, dy: 1 },
    { dx: -1, dy: -2 },
  ],
  "2>1": [
    { dx: 0, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: -2, dy: 0 },
    { dx: 1, dy: -2 },
    { dx: -2, dy: 1 },
  ],
  "1>0": [
    { dx: 0, dy: 0 },
    { dx: -2, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: -2, dy: -1 },
    { dx: 1, dy: 2 },
  ],
};

function copyMatrix(matrix) {
  return matrix.map((row) => [...row]);
}

function canPlace(matrix, row, col, targetBoard) {
  for (let r = 0; r < matrix.length; r += 1) {
    for (let c = 0; c < matrix[r].length; c += 1) {
      if (!matrix[r][c]) continue;
      const nextRow = row + r;
      const nextCol = col + c;
      if (nextCol < 0 || nextCol >= COLS || nextRow >= ROWS) return false;
      if (nextRow >= 0 && targetBoard[nextRow][nextCol]) return false;
    }
  }
  return true;
}

function getSrsKicks(type, fromState, toState) {
  if (type === "I") {
    return I_KICKS[`${fromState}>${toState}`] || [];
  }
  if (type === "O") {
    return [{ dx: 0, dy: 0 }];
  }
  return JLSTZ_KICKS[`${fromState}>${toState}`] || [];
}

function getStateMatrix(type, state) {
  return tetrominoes[type].states[state].map((row) => [...row]);
}

function isValidMovement(
  piece,
  deltaRow,
  deltaCol,
  matrix = piece.matrix,
  targetBoard = board,
) {
  return canPlace(
    matrix,
    piece.row + deltaRow,
    piece.col + deltaCol,
    targetBoard,
  );
}

let board = [];
let board2 = [];
let bufferBoard = [];
let bufferRows = [];
let currentPiece = null;
let nextPiece = null;
let currentPiece2 = null;
let nextPiece2 = null;
let level = 1;
let linesClearedTotal = 0;
let gameStartTime = 0;
let dropTimer = null;
let dropTimer2 = null;
let gameOver = false;
let gamePaused = false;
let gameMode = null;
let selectedControlPlayer = "p1";
const horizontalMoveRepeatDelay = 110;
const horizontalMoveRepeatInterval = 45;
const horizontalRepeatState = {
  p1: { left: false, right: false },
  p2: { left: false, right: false },
};
const horizontalRepeatTimers = {
  p1: { left: null, right: null },
  p2: { left: null, right: null },
};

document.body.tabIndex = -1;

const defaultKeyBindings = {
  p1: {
    left: "ArrowLeft",
    right: "ArrowRight",
    rotate: "ArrowDown",
    hardDrop: " ",
  },
  p2: {
    left: "a",
    right: "d",
    rotate: "s",
    hardDrop: "Control",
  },
};

let keyBindings = {
  p1: { ...defaultKeyBindings.p1 },
  p2: { ...defaultKeyBindings.p2 },
};

function createBoard() {
  const board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const bottomRows = [ROWS - 2, ROWS - 1];

  bottomRows.forEach((rowIndex) => {
    const gapCount = Math.random() < 0.5 ? 1 : 2;
    const gapPositions = new Set();

    while (gapPositions.size < gapCount) {
      gapPositions.add(Math.floor(Math.random() * COLS));
    }

    for (let col = 0; col < COLS; col += 1) {
      if (!gapPositions.has(col)) {
        board[rowIndex][col] = "#9ca3af";
      }
    }
  });

  return board;
}

function createBufferBoard() {
  return Array.from({ length: BUFFER_ROWS }, () => Array(COLS).fill(null));
}

function createCellElement() {
  const cell = document.createElement("div");
  cell.className = "cell";
  return cell;
}

function drawBoard() {
  boardEl.innerHTML = "";
  boardEl.style.setProperty("--rows", ROWS);
  boardEl.style.setProperty("--cols", COLS);
  const cells = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const cell = createCellElement();
      const occupied = board[row][col];
      if (occupied) {
        cell.classList.add("filled");
        cell.style.background = occupied;
      }
      cells.push(cell);
    }
  }
  boardEl.append(...cells);
}

function drawBufferBoard() {
  bufferBoardEl.innerHTML = "";
  const cells = [];
  const sourceBoard = gameMode === "two" ? board2 : bufferBoard;
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const cell = createCellElement();
      const occupied = sourceBoard[row][col];
      if (occupied) {
        cell.classList.add("filled");
        cell.style.background = occupied;
      }
      cells.push(cell);
    }
  }
  bufferBoardEl.append(...cells);
}

function overlayPiece(piece, boardElement) {
  if (!piece) return;
  piece.matrix.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (!value) return;
      const boardRow = piece.row + rowIndex;
      const boardCol = piece.col + colIndex;
      if (
        boardRow >= 0 &&
        boardRow < ROWS &&
        boardCol >= 0 &&
        boardCol < COLS
      ) {
        const cell = boardElement.children[boardRow * COLS + boardCol];
        if (cell) {
          cell.classList.add("filled");
          cell.style.background = piece.color;
        }
      }
    });
  });
}

function updateLevelUI() {
  levelDotsEl.innerHTML = "";
  for (let i = 0; i < 5; i += 1) {
    const dot = document.createElement("span");
    dot.className = `level-dot${i < level ? " active" : ""}`;
    levelDotsEl.appendChild(dot);
  }
}

function drawPiecePreview() {
  nextPieceEl.innerHTML = "";
  const matrix = nextPiece.matrix;
  const occupiedPositions = [];

  matrix.forEach((row, r) => {
    row.forEach((value, c) => {
      if (value) {
        occupiedPositions.push({ row: r, col: c });
      }
    });
  });

  if (!occupiedPositions.length) return;

  const rows = occupiedPositions.map((pos) => pos.row);
  const cols = occupiedPositions.map((pos) => pos.col);
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);
  const width = maxCol - minCol + 1;
  const height = maxRow - minRow + 1;

  nextPieceEl.style.gridTemplateColumns = `repeat(${width}, 18px)`;
  nextPieceEl.style.gridTemplateRows = `repeat(${height}, 18px)`;

  occupiedPositions.forEach((pos) => {
    const cell = createCellElement();
    cell.classList.add("filled");
    cell.style.background = nextPiece.color;
    cell.style.gridRowStart = pos.row - minRow + 1;
    cell.style.gridColumnStart = pos.col - minCol + 1;
    nextPieceEl.appendChild(cell);
  });
}

function drawPiecePreview2() {
  nextPiece2El.innerHTML = "";
  if (!nextPiece2) return;

  const matrix = nextPiece2.matrix;
  const occupiedPositions = [];

  matrix.forEach((row, r) => {
    row.forEach((value, c) => {
      if (value) {
        occupiedPositions.push({ row: r, col: c });
      }
    });
  });

  if (!occupiedPositions.length) return;

  const rows = occupiedPositions.map((pos) => pos.row);
  const cols = occupiedPositions.map((pos) => pos.col);
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);
  const width = maxCol - minCol + 1;
  const height = maxRow - minRow + 1;

  nextPiece2El.style.gridTemplateColumns = `repeat(${width}, 18px)`;
  nextPiece2El.style.gridTemplateRows = `repeat(${height}, 18px)`;

  occupiedPositions.forEach((pos) => {
    const cell = createCellElement();
    cell.classList.add("filled");
    cell.style.background = nextPiece2.color;
    cell.style.gridRowStart = pos.row - minRow + 1;
    cell.style.gridColumnStart = pos.col - minCol + 1;
    nextPiece2El.appendChild(cell);
  });
}

function randomPiece() {
  const types = Object.keys(tetrominoes);
  const type = types[Math.floor(Math.random() * types.length)];
  return {
    type,
    color: tetrominoes[type].color,
    state: 0,
    matrix: getStateMatrix(type, 0),
  };
}

function isValidMovement(
  piece,
  deltaRow,
  deltaCol,
  matrix = piece.matrix,
  targetBoard = board,
) {
  if (!piece) return false;
  for (let row = 0; row < matrix.length; row += 1) {
    for (let col = 0; col < matrix[row].length; col += 1) {
      if (!matrix[row][col]) continue;
      const nextRow = piece.row + row + deltaRow;
      const nextCol = piece.col + col + deltaCol;
      if (nextCol < 0 || nextCol >= COLS || nextRow >= ROWS) return false;
      if (nextRow >= 0 && targetBoard[nextRow][nextCol]) return false;
    }
  }
  return true;
}

function rotatePiece(player = "p1") {
  if (gameOver) return false;
  const piece = player === "p1" ? currentPiece : currentPiece2;
  const targetBoard = player === "p1" ? board : board2;
  if (!piece) return false;

  const fromState = piece.state;
  const toState = (fromState + 3) % 4;
  const candidateMatrix = getStateMatrix(piece.type, toState);
  const kicks = getSrsKicks(piece.type, fromState, toState);

  for (const kick of kicks) {
    const candidateRow = piece.row + kick.dy;
    const candidateCol = piece.col + kick.dx;
    if (canPlace(candidateMatrix, candidateRow, candidateCol, targetBoard)) {
      piece.row = candidateRow;
      piece.col = candidateCol;
      piece.state = toState;
      piece.matrix = candidateMatrix;
      draw();
      return true;
    }
  }

  return false;
}

function movePiece(deltaRow, deltaCol, player = "p1") {
  if (gameOver) return false;
  const piece = player === "p1" ? currentPiece : currentPiece2;
  const targetBoard = player === "p1" ? board : board2;
  if (!piece) return false;

  if (isValidMovement(piece, deltaRow, deltaCol, piece.matrix, targetBoard)) {
    piece.row += deltaRow;
    piece.col += deltaCol;
    draw();
    return true;
  }

  if (deltaRow === 1) {
    lockPiece(player);
  }
  return false;
}

function spawnPiece(player = "p1") {
  if (player === "p1") {
    currentPiece = nextPiece || randomPiece();
    nextPiece = randomPiece();
    drawPiecePreview();
    currentPiece.row = 0;
    currentPiece.col = Math.floor((COLS - currentPiece.matrix[0].length) / 2);

    if (!isValidMovement(currentPiece, 0, 0, currentPiece.matrix, board)) {
      gameOver = true;
      clearInterval(dropTimer);
      clearInterval(dropTimer2);
      alert("Game over!");
    }
    return;
  }

  currentPiece2 = nextPiece2 || randomPiece();
  nextPiece2 = randomPiece();
  drawPiecePreview2();
  currentPiece2.row = 0;
  currentPiece2.col = Math.floor((COLS - currentPiece2.matrix[0].length) / 2);

  if (!isValidMovement(currentPiece2, 0, 0, currentPiece2.matrix, board2)) {
    gameOver = true;
    clearInterval(dropTimer);
    clearInterval(dropTimer2);
    alert("Game over!");
  }
}

function lockPiece(player = "p1") {
  const targetBoard = player === "p1" ? board : board2;
  const piece = player === "p1" ? currentPiece : currentPiece2;
  const preLockBoard = targetBoard.map((row) => row.map((cell) => cell));

  piece.matrix.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (!value) return;
      const boardRow = piece.row + rowIndex;
      const boardCol = piece.col + colIndex;
      if (boardRow >= 0) {
        targetBoard[boardRow][boardCol] = "#9ca3af";
      }
    });
  });

  const { clearedCount, transferRows } = clearFullRows(
    targetBoard,
    preLockBoard,
    player,
  );
  linesClearedTotal += clearedCount;
  resetDropTimers();

  if (transferRows.length) {
    if (gameMode === "two") {
      const opponent = player === "p1" ? "p2" : "p1";
      transferToOpponentBoard(transferRows, opponent);
    } else if (player === "p1") {
      transferToBufferBoard(transferRows);
    }
  }

  if (targetBoard.every((row) => row.every(Boolean))) {
    level = Math.min(level + 1, 5);
    board = createBoard();
    board2 = createBoard();
    bufferBoard = createBufferBoard();
    updateLevelUI();
    resetDropTimers();
  }

  spawnPiece(player);
  draw();
}

function clearFullRows(targetBoard, preLockBoard, player = "p1") {
  const fullRows = [];
  const remainingRows = [];

  targetBoard.forEach((row, rowIndex) => {
    if (row.every(Boolean)) {
      fullRows.push(rowIndex);
    } else {
      remainingRows.push(row);
    }
  });

  const transferRows = [];
  if (fullRows.length >= 2) {
    const rowsToTransfer = fullRows.slice(-2);
    rowsToTransfer.forEach((rowIndex) => {
      transferRows.push(preLockBoard[rowIndex].map((cell) => cell));
    });
  }

  while (remainingRows.length < ROWS) {
    remainingRows.unshift(Array(COLS).fill(null));
  }

  if (player === "p1") {
    board = remainingRows;
  } else {
    board2 = remainingRows;
  }

  return { clearedCount: fullRows.length, transferRows };
}

function transferToOpponentBoard(rowsToTransfer, targetPlayer) {
  if (!rowsToTransfer.length) return;
  const target = targetPlayer === "p1" ? board : board2;
  const newRows = rowsToTransfer.map((row) => row.map((cell) => cell));
  const preservedRows = target.slice(rowsToTransfer.length);
  const updatedBoard = [...preservedRows, ...newRows];

  if (targetPlayer === "p1") {
    board = updatedBoard;
  } else {
    board2 = updatedBoard;
  }
}

function transferToBufferBoard(rowsToTransfer) {
  if (!rowsToTransfer.length) return;

  const newRows = rowsToTransfer.map((row) => row.map((cell) => cell));
  bufferRows = [...bufferRows, ...newRows];

  if (bufferRows.length > ROWS) {
    const overflowCount = bufferRows.length - ROWS;
    bufferRows = bufferRows.slice(-overflowCount);
    if (level < 5) {
      level += 1;
      updateLevelUI();
    }
    resetDropTimers();
  }

  const rowsToRender = bufferRows.slice(-ROWS);
  const paddedEmptyRows = Array.from(
    { length: ROWS - rowsToRender.length },
    () => Array(COLS).fill(null),
  );
  bufferBoard = [...paddedEmptyRows, ...rowsToRender];
}

function draw() {
  drawBoard();
  drawBufferBoard();

  overlayPiece(currentPiece, boardEl);
  if (gameMode === "two") {
    overlayPiece(currentPiece2, bufferBoardEl);
  }
}

function resetDropTimers() {
  if (dropTimer) clearInterval(dropTimer);
  if (dropTimer2) clearInterval(dropTimer2);
  const elapsedSeconds = Math.floor((Date.now() - gameStartTime) / 1000);
  let speed;

  if (elapsedSeconds < 60) {
    speed = 800;
  } else if (elapsedSeconds < 90) {
    speed = 600;
  } else if (elapsedSeconds < 120) {
    speed = 400;
  } else {
    speed = 200;
  }

  dropTimer = setInterval(() => movePiece(1, 0, "p1"), speed);
  if (gameMode === "two") {
    dropTimer2 = setInterval(() => movePiece(1, 0, "p2"), speed);
  }
}

function clearHorizontalRepeatTimers() {
  Object.values(horizontalRepeatTimers).forEach((playerTimers) => {
    Object.values(playerTimers).forEach((timerId) => {
      if (timerId) clearInterval(timerId);
    });
  });

  Object.keys(horizontalRepeatState).forEach((player) => {
    horizontalRepeatState[player].left = false;
    horizontalRepeatState[player].right = false;
  });

  Object.keys(horizontalRepeatTimers).forEach((player) => {
    horizontalRepeatTimers[player].left = null;
    horizontalRepeatTimers[player].right = null;
  });
}

function startHorizontalRepeat(player, direction) {
  const side = direction < 0 ? "left" : "right";
  const state = horizontalRepeatState[player];

  if (state[side]) return;

  state[side] = true;
  if (direction < 0) state.right = false;
  else state.left = false;

  movePiece(0, direction, player);

  const timerId = setTimeout(() => {
    if (
      !gameMode ||
      gameOver ||
      gamePaused ||
      !horizontalRepeatState[player][side]
    ) {
      horizontalRepeatTimers[player][side] = null;
      return;
    }

    const piece = player === "p1" ? currentPiece : currentPiece2;
    const targetBoard = player === "p1" ? board : board2;
    if (!piece) return;

    while (isValidMovement(piece, 0, direction, piece.matrix, targetBoard)) {
      piece.col += direction;
    }

    draw();

    const intervalId = setInterval(() => {
      if (
        !gameMode ||
        gameOver ||
        gamePaused ||
        !horizontalRepeatState[player][side]
      ) {
        clearInterval(intervalId);
        horizontalRepeatTimers[player][side] = null;
        return;
      }

      movePiece(0, direction, player);
    }, horizontalMoveRepeatInterval);

    horizontalRepeatTimers[player][side] = intervalId;
  }, horizontalMoveRepeatDelay);

  horizontalRepeatTimers[player][side] = timerId;
}

function stopHorizontalRepeat(player, direction) {
  const side = direction < 0 ? "left" : "right";
  const state = horizontalRepeatState[player];
  state[side] = false;

  const timerId = horizontalRepeatTimers[player][side];
  if (timerId) {
    clearInterval(timerId);
    horizontalRepeatTimers[player][side] = null;
  }
}

function startGame() {
  clearHorizontalRepeatTimers();
  board = createBoard();
  board2 = createBoard();
  bufferBoard = createBufferBoard();
  bufferRows = [];
  linesClearedTotal = 0;
  level = 1;
  gameOver = false;
  gamePaused = false;
  gameStartTime = Date.now();
  nextPiece = randomPiece();
  nextPiece2 = randomPiece();
  spawnPiece("p1");
  if (gameMode === "two") {
    spawnPiece("p2");
  } else {
    currentPiece2 = null;
    nextPiece2 = null;
    nextPiece2El.innerHTML = "";
  }
  stopBtn.textContent = "Stop";
  draw();
  drawPiecePreview();
  drawPiecePreview2();
  updateLevelUI();
  updateBindingsUI();
  resetDropTimers();
}

function stopGame() {
  clearHorizontalRepeatTimers();
  gamePaused = true;
  if (dropTimer) clearInterval(dropTimer);
  if (dropTimer2) clearInterval(dropTimer2);
  stopBtn.textContent = "Play";
}

function resumeGame() {
  if (!gameMode || !gamePaused) return;
  gamePaused = false;
  stopBtn.textContent = "Stop";
  resetDropTimers();
}

function togglePause() {
  if (gameOver) return;
  if (gamePaused) {
    resumeGame();
  } else {
    stopGame();
  }
}

function handleKey(event) {
  if (!gameMode || gameOver || gamePaused) return;
  const key = event.key;
  const p1 = keyBindings.p1;
  const p2 = keyBindings.p2;

  if (key === p1.left) {
    event.preventDefault();
    if (!event.repeat) {
      startHorizontalRepeat("p1", -1);
    }
    return;
  }
  if (key === p1.right) {
    event.preventDefault();
    if (!event.repeat) {
      startHorizontalRepeat("p1", 1);
    }
    return;
  }
  if (key === p1.rotate) {
    event.preventDefault();
    rotatePiece("p1");
    return;
  }
  if (key === p1.hardDrop) {
    event.preventDefault();
    while (movePiece(1, 0, "p1")) {}
    return;
  }

  if (gameMode === "two") {
    if (key === p2.left) {
      event.preventDefault();
      if (!event.repeat) {
        startHorizontalRepeat("p2", -1);
      }
      return;
    }
    if (key === p2.right) {
      event.preventDefault();
      if (!event.repeat) {
        startHorizontalRepeat("p2", 1);
      }
      return;
    }
    if (key === p2.rotate) {
      event.preventDefault();
      rotatePiece("p2");
      return;
    }
    if (key === p2.hardDrop) {
      event.preventDefault();
      while (movePiece(1, 0, "p2")) {}
      return;
    }
  }
}

function handleKeyUp(event) {
  if (!gameMode || gameOver || gamePaused) return;
  const key = event.key;
  const p1 = keyBindings.p1;
  const p2 = keyBindings.p2;

  if (key === p1.left) {
    stopHorizontalRepeat("p1", -1);
    return;
  }
  if (key === p1.right) {
    stopHorizontalRepeat("p1", 1);
    return;
  }

  if (gameMode === "two") {
    if (key === p2.left) {
      stopHorizontalRepeat("p2", -1);
      return;
    }
    if (key === p2.right) {
      stopHorizontalRepeat("p2", 1);
      return;
    }
  }
}

const changeControlsBtn = document.getElementById("change-controls-btn");
const stopBtn = document.getElementById("stop-btn");
const keyLeftDisplay = document.getElementById("key-left-display");
const keyRightDisplay = document.getElementById("key-right-display");
const keyRotateDisplay = document.getElementById("key-rotate-display");
const keyHardDropDisplay = document.getElementById("key-harddrop-display");
const controlsModal = document.getElementById("controls-modal");
const controlsModalBackdrop = document.getElementById(
  "controls-modal-backdrop",
);
const closeControlsModal = document.getElementById("close-controls-modal");
const closeControlsBtn = document.getElementById("close-controls-btn");
const controlsList = document.getElementById("controls-list");
const controlsInstructions = document.getElementById("controls-instructions");
const modeModal = document.getElementById("mode-modal");
const modeModalBackdrop = document.getElementById("mode-modal-backdrop");
const onePlayerBtn = document.getElementById("one-player-btn");
const twoPlayerBtn = document.getElementById("two-player-btn");
const player2Preview = document.getElementById("player2-preview");
const nextPiece2El = document.getElementById("next-piece-2");
const rightPanelLabel = document.getElementById("right-panel-label");
const levelRow = document.getElementById("level-row");
const playerSelect = document.getElementById("player-select");
const player1ControlsBtn = document.getElementById("player1-controls-btn");
const player2ControlsBtn = document.getElementById("player2-controls-btn");

restartBtn.addEventListener("click", () => {
  if (gameMode) startGame();
});
stopBtn.addEventListener("click", togglePause);
changeControlsBtn.addEventListener("click", openControlsModal);
closeControlsModal.addEventListener("click", closeControlsModalWindow);
closeControlsBtn.addEventListener("click", closeControlsModalWindow);
controlsModalBackdrop.addEventListener("click", closeControlsModalWindow);
modeModalBackdrop.addEventListener("click", () => {});
onePlayerBtn.addEventListener("click", () => selectMode("one"));
twoPlayerBtn.addEventListener("click", () => selectMode("two"));
player1ControlsBtn.addEventListener("click", () => switchControlPlayer("p1"));
player2ControlsBtn.addEventListener("click", () => switchControlPlayer("p2"));
document.addEventListener("keydown", handleKey);
document.addEventListener("keyup", handleKeyUp);

function selectMode(mode) {
  gameMode = mode;
  modeModal.classList.remove("open");
  modeModal.setAttribute("aria-hidden", "true");
  if (mode === "one") {
    rightPanelLabel.textContent = "Buffer";
    player2Preview.classList.add("hidden");
    if (levelRow) levelRow.classList.remove("hidden");
  } else {
    rightPanelLabel.textContent = "Player 2";
    player2Preview.classList.remove("hidden");
    if (levelRow) levelRow.classList.add("hidden");
  }
  startGame();
}

startGame();

function openControlsModal() {
  selectedControlPlayer = "p1";
  player1ControlsBtn.classList.add("selected");
  player2ControlsBtn.classList.remove("selected");
  controlsModal.classList.add("open");
  renderControlOptions();
}

function switchControlPlayer(player) {
  selectedControlPlayer = player;
  player1ControlsBtn.classList.toggle("selected", player === "p1");
  player2ControlsBtn.classList.toggle("selected", player === "p2");
  renderControlOptions();
}

function closeControlsModalWindow() {
  controlsModal.classList.remove("open");
  controlsInstructions.textContent = "Select an action and press a new key.";
  document.removeEventListener("keydown", remapListener, true);
}

function renderControlOptions() {
  controlsList.innerHTML = "";

  const header = document.createElement("div");
  header.className = "control-player-header";
  header.textContent = `Editing controls for ${selectedControlPlayer === "p1" ? "Player 1" : "Player 2"}`;
  controlsList.appendChild(header);

  const actions = [
    { key: "left", label: "Move left" },
    { key: "right", label: "Move right" },
    { key: "rotate", label: "Rotate" },
    { key: "hardDrop", label: "Hard drop" },
  ];

  actions.forEach((action) => {
    const row = document.createElement("div");
    row.className = "control-row";

    const label = document.createElement("span");
    label.className = "control-label";
    label.textContent = action.label;

    const value = document.createElement("button");
    value.className = "control-btn";
    value.type = "button";
    value.textContent =
      keyBindings[selectedControlPlayer][action.key] === " "
        ? "Space"
        : keyBindings[selectedControlPlayer][action.key];
    value.addEventListener("click", () => startKeyRemap(action));

    row.append(label, value);
    controlsList.appendChild(row);
  });
}

let remapListener = null;
function startKeyRemap(action) {
  controlsInstructions.textContent = `Press the new key for ${action.label}.`;
  document.removeEventListener("keydown", remapListener, true);

  remapListener = function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    keyBindings[selectedControlPlayer][action.key] = event.key;
    updateBindingsUI();
    renderControlOptions();
    controlsInstructions.textContent = `${action.label} is now set to ${event.key === " " ? "Space" : event.key}.`;
    document.removeEventListener("keydown", remapListener, true);
  };

  document.addEventListener("keydown", remapListener, true);
}

function updateBindingsUI() {
  keyLeftDisplay.textContent =
    keyBindings.p1.left === " " ? "Space" : keyBindings.p1.left;
  keyRightDisplay.textContent =
    keyBindings.p1.right === " " ? "Space" : keyBindings.p1.right;
  keyRotateDisplay.textContent =
    keyBindings.p1.rotate === " " ? "Space" : keyBindings.p1.rotate;
  keyHardDropDisplay.textContent =
    keyBindings.p1.hardDrop === " " ? "Space" : keyBindings.p1.hardDrop;
}
