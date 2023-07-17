import {LogListItem} from "./LogListItem";
import {NewGameButton} from "./NewGameButton";
import {useScrollToBottom} from "../../hooks/useScrollToBottom";
import { Message } from "../../types/types";
import { StyledLogDisplay, StyledLogs } from "./Log.styles";

interface IProps {
  messages: Message[],
  newGame: () => void
}

export const LogList = ({ messages, newGame }: IProps) => {
  const log = useScrollToBottom(messages);

  const elms = messages.map(({ time, message }, index) => {
    return <LogListItem {...{ time, message, key: index }} />;
  });

  return (
    <StyledLogDisplay>
      <StyledLogs ref={log}>
        {elms}
      </StyledLogs>
      <NewGameButton {...{ newGame }} />
    </StyledLogDisplay>
  );
};