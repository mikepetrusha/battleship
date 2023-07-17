import {Display} from "./Components/Display/Display";
import {LogList} from "./Components/Log/LogList";
import {Heading} from "./Components/Heading";
import { useGame } from "./hooks/useGame";

export const App = () => {
  const { myState, opponentState, logState } = useGame();

  return (
    <>
      <Heading />
      <Display {...{ myState, opponentState }} />
      <LogList {...logState} />
    </>
  );
};
