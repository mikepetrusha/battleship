import { IMyState } from "../../types/types";
import {Board} from "./Board/Board";
import { StyledDisplay } from "./Display.styles";

interface IProps {
  myState: IMyState,
  opponentState: IMyState
}

export const Display = ({ myState, opponentState }: IProps) => {
  return (
    <StyledDisplay>
      <Board state={myState} />
      <Board state={opponentState} />
    </StyledDisplay>
  );
};
