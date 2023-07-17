import {CoordinateList} from "./CoordinateList";
import {CoordinateLabelList} from "./CoordinateLabelList";
import { Coordinate as CoordinateType, IMyShips } from "../../../../types/types";
import { CoordinateSpace, RowColumn, StyledCoordinate } from "./Coordinate.styles";

interface IProps {
  myBoard: boolean | undefined,
  placedShips: IMyShips[],
  clickTile: (coordinate: CoordinateType) => void,
  chosenTiles: CoordinateType[],
  shot: CoordinateType[],
}

enum isrow{
  isrow= 1,
  isNotRow = 0
}

export const Coordinate = ({ placedShips, clickTile, chosenTiles, shot, myBoard }: IProps) => {
  const lst = [];
  for (let i = 0; i < 10; i++) {
    lst.push(
      <CoordinateList
        {...{
          key: i,
          clickTile,
          row: i,
          placedShips,
          chosenTiles,
          shot,
          myBoard,
        }}
      />
    );
  }

  return (
    <>
    <RowColumn>
      <CoordinateSpace></CoordinateSpace>
      <CoordinateLabelList isrow={isrow.isNotRow}/>
    </RowColumn>
    <RowColumn>
      <CoordinateLabelList isrow={isrow.isrow} />
      <StyledCoordinate>{lst}</StyledCoordinate>
    </RowColumn>
  </>
  );
};
