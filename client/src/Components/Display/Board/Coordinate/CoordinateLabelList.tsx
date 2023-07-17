import { StyledCoordinateLabeList } from "./Coordinate.styles";
import {CoordinateLabelListItem} from "./CoordinateLabelListItem";

interface IProps {
  isrow: number
}

export const CoordinateLabelList = ({ isrow}: IProps) => {
  const lst = [];

  for (let i = 0; i < 10; i++) {
    const elm = <CoordinateLabelListItem {...{ key: i, isrow, index: i }} />;
    lst.push(elm);
  }

  return <StyledCoordinateLabeList isrow={isrow}>{lst}</StyledCoordinateLabeList>;
};