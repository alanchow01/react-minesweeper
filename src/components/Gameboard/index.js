import React from "react";
import { useSelector } from "react-redux";

import { Flex, Box } from "rebass/styled-components";

import * as boardHelpers from "../../utils/helpers";
import Cell from "../Cell";
import GameHeader from "../GameHeader";

export const generateGrid = (board) => {
  const table = [];
  const boardDim = Math.sqrt(Object.keys(board).length);
  boardHelpers.forBoardSize(boardDim, (coordinate, row, col) => {
    if (!table[row]) {
      table[row] = [];
    }
    table[row][col] = board[coordinate];
  });
  return table;
};

const Gameboard = () => {
  const board = useSelector((state) => state.board);
  const gameboard = generateGrid(board);

  return (
    <Flex alignContent="center">
      <Box mx="auto">
        <GameHeader />
        {gameboard.map((cells, row) => (
          <Flex key={`mine-row-${row}`}>
            {cells.map((cell) => (
              <Cell key={`mine-cell-${cell.id}`} {...cell} />
            ))}
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};

export default Gameboard;
