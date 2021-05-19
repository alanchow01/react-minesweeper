import { RESET_GAME, REVEAL_CELL, TOGGLE_FLAG } from "./types";

const resetGame = () => {
  return {
    type: RESET_GAME,
  };
};

const revealCell = (id) => {
  return {
    type: REVEAL_CELL,
    id,
  };
};

const toggleFlag = (id) => {
  return {
    type: TOGGLE_FLAG,
    id,
  };
};

export { resetGame, revealCell, toggleFlag };
