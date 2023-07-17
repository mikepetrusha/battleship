import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor, faXmark, faBomb } from "@fortawesome/free-solid-svg-icons";
import { MISSED, SELECTED, HIT } from "../../../../constants";
import { Square } from "./Coordinate.styles";

type StateType = {
  type: string | null;
}

interface IProps {
  clickHandler: () => void,
  state: StateType
}



export const CoordinateListItem = ({ clickHandler, state }: IProps) => {
  const { type } = state;

  return (
    <Square onClick={clickHandler}>
      {type === SELECTED && <FontAwesomeIcon icon={faAnchor} />}
      {type === MISSED && <FontAwesomeIcon icon={faXmark} />}
      {type === HIT && <FontAwesomeIcon icon={faBomb} />}
    </Square>
  );
};
