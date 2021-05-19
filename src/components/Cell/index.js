import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Box } from "rebass/styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";

import { revealCell, toggleFlag } from "../../containers/Layout/actions";

import { BaseCell, OpenedCell, CoveredCell } from "./styles";

const OpenCell = ({ count, isMine }) => (
  <OpenedCell>
    {!isMine && <Box textColor={count}>{count === 0 ? "" : count}</Box>}
    {isMine && <FontAwesomeIcon icon={faBomb} color="black" />}
  </OpenedCell>
);

const ClosedCell = () => <CoveredCell />;
const FlagCell = () => <FontAwesomeIcon icon={faFlag} color="#FF3625" />;

const Cell = ({ id, count, isMine, isOpen, hasFlag }) => {
  const dispatch = useDispatch();
  return (
  <BaseCell
    onClick={() => dispatch(revealCell(id))}
    onContextMenu={(e) => {
      e.preventDefault();
      dispatch(toggleFlag(id));
    }}
  >
    {!isOpen && !hasFlag && <ClosedCell />}
    {!isOpen && hasFlag && <FlagCell />}
    {isOpen && <OpenCell isMine={isMine} count={count} />}
  </BaseCell>
)};

OpenCell.propTypes = {
  count: PropTypes.number.isRequired,
  isMine: PropTypes.bool.isRequired,
};

Cell.propTypes = {
  ...OpenCell.propTypes,
  id: PropTypes.string.isRequired,
  hasFlag: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Cell