import {styled} from 'styled-components'

export const RowColumn = styled.div`
    display: flex;
`

export const CoordinateSpace = styled.div`
    width: 1.2em;
    height: 1.2em;
`

export const StyledCoordinate = styled.div`
    border: 0.15em solid black;
`

export const StyledRow = styled.div`
    display: flex;
`

export const Square = styled.div`
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 0.15em solid black;
    border-left: 0.15em solid black;
`

export const StyledCoordinateLabel = styled.div<{ isrow: number }>`
  width: ${({ isrow}) => (isrow? '1.5em' : '2.5375em')};
  height: ${({ isrow}) => (isrow? '2.5375em' : '1.5em')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
`;

export const StyledCoordinateLabeList = styled.div<{ isrow: number }>`
    display: ${(props) => props.isrow ? 'block' : "flex"};
`