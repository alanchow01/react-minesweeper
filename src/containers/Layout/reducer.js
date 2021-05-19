import * as boardHelpers from "../../utils/helpers";

const defaultStore = {
  board: {},
};

const minesweeperReducer = (state = defaultStore, action = { type: "" }) => {
  switch (action.type) {
    case "RESET_GAME": {
      const boardSize = 16;
      const mineLocations = boardHelpers.generateMines(boardSize, 40);
      const board = boardHelpers.resetGame(boardSize, mineLocations);
      return { ...state, board };
    }

    case "REVEAL_CELL": {
      const board = boardHelpers.revealCell(state.board, action.id);
      return { ...state, board };
    }

    case "TOGGLE_FLAG": {
      const board = boardHelpers.toggleFlag(state.board, action.id);
      return { ...state, board };
    }

    default: {
      return state;
    }
  }
};

export default minesweeperReducer;
