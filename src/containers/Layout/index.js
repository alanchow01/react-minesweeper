import React from "react";
import { Box } from "rebass/styled-components";

import Gameboard from "../../components/Gameboard";

const Layout = () => (
  <Box width={1}>
    <Box
      py={3}
      mb={3}
      sx={{
        background: "black",
        textAlign: "center",
        color: "lightgray",
      }}
    >
      <h1>Minesweeper</h1>
    </Box>
    <Gameboard />
  </Box>
);

export default Layout;
