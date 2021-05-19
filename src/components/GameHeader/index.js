import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Flex } from "rebass/styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFlag,
  faSmileBeam,
  faSadCry,
  faMeh,
} from "@fortawesome/free-solid-svg-icons";

import * as boardHelpers from "../../utils/helpers";
import { resetGame } from "../../containers/Layout/actions";

const GameHeader = () => {
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0);
  const [resetTimer, setResetTimer] = useState(true);

  const flagCount = boardHelpers.flagCount(board);

  let gameStatus = "playing";

  if (boardHelpers.hasWon(board)) {
    gameStatus = "winner";
  }

  if (boardHelpers.hasLost(board)) {
    gameStatus = "lost";
  }

  if (boardHelpers.notPlaying(board)) {
    gameStatus = "notPlaying";
  }

  const tick = useCallback(() => {
    if (gameStatus === "notPlaying") {
      setCounter(0);
      setResetTimer(true);
    }

    if (gameStatus === "playing") {
      setCounter(resetTimer ? 0 : counter + 1);
      setResetTimer(false);
    } else {
      setResetTimer(true);
    }
  }, [counter, gameStatus, resetTimer]);

  const gameFace = (gameStatus) => {
    if (gameStatus === "lost") {
      return <FontAwesomeIcon icon={faSadCry} color="darkgrey" size="3x" />;
    }
    if (gameStatus === "winner") {
      return <FontAwesomeIcon icon={faSmileBeam} color="#00D363" size="3x" />;
    }
    return <FontAwesomeIcon icon={faMeh} color="#FFB200" size="3x" />;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      tick();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [tick]);

  return (
    <Flex alignItems="center" justifyContent="space-between" mb={3}>
      <Box width={1 / 4}>
        <FontAwesomeIcon icon={faFlag} color="#FF3625" /> {`${flagCount}`}
      </Box>
      <Box role="button" onClick={() => dispatch(resetGame())}>
        {gameFace(gameStatus)}
      </Box>
      <Box width={1 / 4} textAlign="right">
        <FontAwesomeIcon icon={faClock} color="#FFB200" /> {counter}
      </Box>
    </Flex>
  );
};

export default GameHeader;
