import moment from "moment";
import { columnLabel } from "../constants";
import { Coordinate, IMyShips, Message } from "../types/types";

export const getCurrentTime = () => moment().format("LTS");

export const getLastElm = (arr: Coordinate[]) => {
  const length = arr.length;
  const isEmpty = length === 0;
  if (isEmpty) return;
  const lastElm = arr[length - 1];
  return lastElm;
};

export const checkIfSameCoordinate = (
  { row: row1, column: column1 }: Coordinate,
  { row: row2, column: column2 }: Coordinate
) => {
  const sameRow = row1 === row2;
  const sameColumn = column1 === column2;
  return sameRow && sameColumn;
};

export const checkIfLstIncludesCoordinate = (
  coordinates: Coordinate[],
  checkedCoordinate: Coordinate
) => {
  for (const coordinate of coordinates) {
    const coordinateFound = checkIfSameCoordinate(
      coordinate,
      checkedCoordinate
    );
    if (coordinateFound) return true;
  }
  return false
};

export const checkIfSink = (coordinates: Coordinate[], shot: Coordinate[]) => {
  for (const coordinate of coordinates) {
    const isHit = checkIfLstIncludesCoordinate(shot, coordinate);
    if (!isHit) return false;
  }
  return true;
};

export const isWinner = (ships: IMyShips[], shot: Coordinate[]) => {
  for (const { coordinates } of ships) {
    const isSink = checkIfSink(coordinates, shot);
    if (!isSink) return false;
  }
  return true;
};

export const isHit = (ships: IMyShips[], checkCoordinate: Coordinate): boolean => {
  for (const ship of ships) {
    const { coordinates} = ship;
    const isOccupied = checkIfLstIncludesCoordinate(
      coordinates,
      checkCoordinate
    );
    if (isOccupied) return true;
  }
  return false
};

export const makeNewMessages = (messages: Message[], message: string) => {
  const newMsg = { message, time: getCurrentTime() };
  const newMessages = messages.concat([newMsg]);
  return newMessages;
};

export const makeMsgForShot = (isMine: boolean, ships: IMyShips[], coordinate: Coordinate) => {
  const checkisHit = isHit(ships, coordinate);
  const subject = isMine ? "You" : "Opponent";
  const result = checkisHit ? "HIT!" : "MISSED.";
  const { row, column } = coordinate;
  const columnLetter = columnLabel[column];
  const rowNum = row + 1;
  return `${subject} just shot at ${columnLetter}${rowNum}: ${result}`;
};