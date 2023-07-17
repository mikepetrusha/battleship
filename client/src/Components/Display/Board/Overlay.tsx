import { StyledOverlay } from "./Board.styles";

interface IProps { 
  settings: string | null
}

export const Overlay = ({ settings }: IProps) => {
  return (
    <StyledOverlay show={settings}>
      <h2>{settings && settings}</h2>
    </StyledOverlay>
  );
};