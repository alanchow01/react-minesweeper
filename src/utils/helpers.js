const initCellState = {
  isMine: false,
  hasFlag: false,
  isOpen: false,
  count: 0,
  id: null,
};

const SEPARATOR = ",";

const parseCoordinates = (id) => {
  const coords = id.split(SEPARATOR);
  const row = Number(coords[0]);
  const col = Number(coords[1]);
  return { row, col };
};

const forBoardSize = (boardSize, callback) => {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const coordinate = [row, col].join(SEPARATOR);
      callback(coordinate, row, col);
    }
  }
};

const forSurroundCells = (coordinate, callback) => {
  const p = parseCoordinates(coordinate);

  for (let x = p.row - 1; x <= p.row + 1; x++) {
    for (let y = p.col - 1; y <= p.col + 1; y++) {
      if (x >= 0 || y >= 0) {
        const surroundCoord = [x, y].join(SEPARATOR);
        callback(surroundCoord, x, y);
      }
    }
  }
};

const revealCell = (board, id) => {
  if (board[id].isOpen || board[id].hasFlag) {
    return board;
  }

  const cell = { ...board[id], isOpen: true };
  const newBoard = { ...board, [id]: cell };
  if (cell.count === 0 && !cell.isMine) {
    return openAround(newBoard, id);
  }
  return newBoard;
};

const toggleFlag = (board, id) => {
  if (board[id].isOpen) {
    return board;
  }
  const cell = { ...board[id], hasFlag: !board[id].hasFlag };
  const newBoard = { ...board, [id]: cell };
  return newBoard;
};

const openAround = (board, id) => {
  let newBoard = { ...board };

  forSurroundCells(id, (coordinate) => {
    if (
      newBoard[coordinate] &&
      !newBoard[coordinate].isMine &&
      !newBoard[coordinate].isOpen
    ) {
      newBoard = revealCell(newBoard, coordinate);
    }
  });
  return newBoard;
};

const open = (board, id) => {
  if (board[id].isOpen || board[id].hasFlag) {
    return board;
  }

  const cell = { ...board[id], isOpen: true };
  const newBoard = { ...board, [id]: cell };
  if (cell.count === 0 && !cell.isMine) {
    return openAround(newBoard, id);
  }
  return newBoard;
};

const emptyBoard = (boardSize) => {
  const board = {};
  forBoardSize(boardSize, (coordinate) => {
    board[coordinate] = { ...initCellState, id: coordinate };
  });
  return board;
};

const resetGame = (boardSize, mineLocations) => {
  const board = emptyBoard(boardSize);

  mineLocations.forEach((coordinate) => {
    board[coordinate].isMine = true;
  });

  forBoardSize(boardSize, (coordinate) => {
    if (!board[coordinate].isMine) {
      forSurroundCells(coordinate, (mineCheckCoord) => {
        if (board[mineCheckCoord] && board[mineCheckCoord].isMine) {
          board[coordinate].count += 1;
        }
      });
    }
  });
  return board;
};

const hasLost = (board) =>
  Object.values(board).some((cell) => cell.isMine && cell.isOpen);

const hasWon = (board) => {
  if (hasLost(board)) {
    return false;
  }

  const nonOpenCount = Object.values(board).filter(
    (cell) => !cell.isOpen
  ).length;
  const flaggedMineCount = Object.values(board).filter(
    (cell) => cell.isMine && cell.hasFlag
  ).length;
  return nonOpenCount === flaggedMineCount;
};

const notPlaying = (board) => {
  const openAndFlagged = Object.values(board).filter(
    (cell) => cell.hasFlag || cell.isOpen
  ).length;
  return openAndFlagged === 0;
};

const flagCount = (board) =>
  Object.values(board).filter((cell) => cell.hasFlag).length;

const mineLocations = (boardSize, mineCount) => {
  const locations = [];

  while (locations.length < mineCount) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    const coords = `${x},${y}`;
    if (!locations.includes(coords)) {
      locations.push(coords);
    }
  }
  return locations;
};

const generateMines = (boardSize, mineCount) =>
  mineLocations(boardSize, mineCount);

export {
  generateMines,
  emptyBoard,
  flagCount,
  forBoardSize,
  forSurroundCells,
  revealCell,
  resetGame,
  toggleFlag,
  hasWon,
  notPlaying,
  hasLost,
  open,
};
