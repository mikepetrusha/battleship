import {styled} from 'styled-components'

interface IStyledBoardProps {
  active?: string;
}

export const StyledBoardWrapper = styled.div`
  display: flex;
  position: relative;
`

export const StyledOverlay = styled.div<{show: string | null}>`
  position: absolute;
  display: ${({show}) => show ? 'flex' : 'none'};
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 1.5em;
  background-color: #000000cc;
  z-index: 2;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`

export const StyledBoard = styled.div<IStyledBoardProps>`
  border-radius: 1.5em;
  padding: 0 1em 1.3em;
  text-align: center;
  z-index: 1;
  background-color: #64f269;

  ${({ active }) =>
    active &&
    `
    box-shadow: 0px 0px 3em #64f269;
  `}
`