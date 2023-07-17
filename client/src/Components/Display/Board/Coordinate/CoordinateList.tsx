import {CoordinateListItem} from "./CoordinateListItem";
import {
  checkIfSameCoordinate,
  checkIfLstIncludesCoordinate,
  isHit,
} from "../../../../utils/utils";
import { MISSED, SELECTED, HIT } from "../../../../constants";
import { Coordinate, IMyShips } from "../../../../types/types";
import { StyledRow } from "./Coordinate.styles";

interface IProps {
  myBoard?: boolean,
  placedShips: IMyShips[],
  clickTile: (coordinate: Coordinate) => void,
  chosenTiles: Coordinate[],
  shot: Coordinate[],
  row: number
}

export const CoordinateList = ({
  clickTile,
  row,
  placedShips,
  chosenTiles,
  shot,
}: IProps) => {
  const lst = [];

  for (let i = 0; i < 10; i++) {
    const coordinate = { row, column: i };

    const state = () => {
      const isShot = checkIfLstIncludesCoordinate(shot, coordinate);
      if (isShot) {
        const checkIsHit = isHit(placedShips, coordinate);
        if (checkIsHit) {
          return { type: HIT };
        }
        return { type: MISSED };
      }

      for (const selectCoordinate of chosenTiles) {
        const selected = checkIfSameCoordinate(selectCoordinate, coordinate);
        if (selected) return { type: SELECTED };
      }

      return { type: null };
    };

    lst.push(
      <CoordinateListItem
        {...{
          state: state(),
          key: i,
          clickHandler: () => clickTile(coordinate),
        }}
      />
    );
  }
  return <StyledRow>{lst}</StyledRow>;
};
