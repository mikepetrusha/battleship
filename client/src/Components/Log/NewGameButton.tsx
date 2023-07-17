import { StyledButton } from "../Display/Board/BoardButtons/BoardButtons.styles";
import { StyledDiv } from "./Log.styles";

interface IProp {
  newGame: () => void
}

export const NewGameButton = ({ newGame }: IProp) => {
  return (
    <StyledDiv>
      <StyledButton onClick={newGame}>New Game</StyledButton>
    </StyledDiv>
  );
};