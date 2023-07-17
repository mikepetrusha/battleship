import { Message } from "../../types/types";

export const LogListItem = ({ time, message }: Message) => {
  return <p>{`[${time}] ${message}`}</p>;
};
