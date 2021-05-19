import { Box } from "rebass/styled-components";
import styled from "styled-components";

const handleColor = (color) => {
  switch (color) {
    case 1:
      return "#009DB0";
    case 2:
      return "#00D2A8";
    case 3:
      return "#00D363";
    case 4:
      return "#FFB200";
    case 5:
      return "#FF6A30";
    case 6:
      return "#FF5C17";
    case 7:
      return "#FF4838";
    case 8:
      return "#FF3625";
    default:
      return "#000000";
  }
};

const BaseCell = styled(Box)`
  background-color: ${(props) => props.theme.colors.greyblue};
  width: 35px;
  height 35px;
  margin: 2px;
  border-radius: 5px;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OpenedCell = styled(BaseCell)`
  background: #efefef;
  height: 33px;
  margin: 0;
  border: 0;
  color: ${(props) => handleColor(props?.children[0]?.props?.textColor)};
`;

const CoveredCell = styled(BaseCell)`
  height: 33px;
  margin: 0;
  border: 0;
`;

export { BaseCell, OpenedCell, CoveredCell };
