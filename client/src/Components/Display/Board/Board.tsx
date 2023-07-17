import {Coordinate} from "./Coordinate/Coordinate";
import {Overlay} from "./Overlay";
import {BoardButtons} from "./BoardButtons/BoardButtons";
import { IMyState } from "../../../types/types";
import { StyledBoard, StyledBoardWrapper } from "./Board.styles";

interface IProps {
  state: IMyState
}

export const Board = ({ state }: IProps) => {
  const {
    myBoard,
    placedShips,
    overlaySettings,
    title,
    showConfirmCancelButtons,
    clearTiles,
    clickTile,
    chosenTiles,
    confirmTiles,
    shot,
    active,
  } = state;

  return (
    <StyledBoardWrapper>
      <StyledBoard active={active ? "true" : undefined}>
        <h3>{title}</h3>

        <Coordinate
          {...{ placedShips, clickTile, chosenTiles, shot, myBoard }}
        />
      </StyledBoard>

      <Overlay settings={overlaySettings} />
      
      {showConfirmCancelButtons && (
        <BoardButtons {...{ clearTiles, confirmTiles }} />
      )}
    </StyledBoardWrapper>
  );
};