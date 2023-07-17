import { columnLabel } from "../../../../constants";
import { StyledCoordinateLabel } from "./Coordinate.styles";

interface IProps {
  isrow: number,
  index: number
}

export const CoordinateLabelListItem = ({ isrow, index }: IProps) => {
  const label = isrow? index + 1 : columnLabel[index];

  return <StyledCoordinateLabel isrow={isrow}>{label}</StyledCoordinateLabel>;
};
