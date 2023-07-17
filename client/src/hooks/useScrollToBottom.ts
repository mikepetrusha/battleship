import { useRef, useEffect } from "react";
import { Message } from "../types/types";

export const useScrollToBottom = (messages: Message[]) => {
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (log && log.current) {
      log.current.scrollTop = log.current.scrollHeight;
    }
  }, [log, messages]);

  return log;
};
