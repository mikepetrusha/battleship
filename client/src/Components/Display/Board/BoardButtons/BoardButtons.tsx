import { StyledButton } from "./BoardButtons.styles";

interface IProps {
  confirmTiles?: () => void,
  clearTiles?: () => void,
}

export const BoardButtons = ({ clearTiles, confirmTiles }: IProps) => {
  return (
    <div>
      <StyledButton onClick={confirmTiles}>
        Confirm
      </StyledButton>
      <StyledButton onClick={clearTiles}>
        Clear
      </StyledButton>
    </div>
  );
};
