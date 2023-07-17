import { Coordinate, IMyShips, Message } from '../types/types';
import { checkIfLstIncludesCoordinate, checkIfSameCoordinate, checkIfSink, getLastElm, isHit, isWinner, makeMsgForShot, makeNewMessages } from './utils';

describe('getLastElm', () => {
  it('should return undefined if the array is empty', () => {
    const emptyArray: Coordinate[] = [];
    const result = getLastElm(emptyArray);
    expect(result).toBeUndefined();
  });

  it('should return the last element of the array', () => {
    const coordinatesArray: Coordinate[] = [
      { row: 1, column: 2 },
      { row: 3, column: 4 },
      { row: 5, column: 6 },
    ];
    const result = getLastElm(coordinatesArray);
    expect(result).toEqual({ row: 5, column: 6 });
  });
});

describe('checkIfSameCoordinate', () => {
  it('should return true for two identical coordinates', () => {
    const coordinate1: Coordinate = { row: 1, column: 2 };
    const coordinate2: Coordinate = { row: 1, column: 2 };

    const result = checkIfSameCoordinate(coordinate1, coordinate2);
    expect(result).toBe(true);
  });

  it('should return false for two different coordinates', () => {
    const coordinate1: Coordinate = { row: 1, column: 2 };
    const coordinate2: Coordinate = { row: 3, column: 4 };

    const result = checkIfSameCoordinate(coordinate1, coordinate2);
    expect(result).toBe(false);
  });
});

describe('checkIfLstIncludesCoordinate', () => {
  it('should return true when coordinate is in the list', () => {
    const coordinates: Coordinate[] = [
      { row: 1, column: 2 },
      { row: 3, column: 4 },
      { row: 5, column: 6 },
    ];
    const checkedCoordinate: Coordinate = { row: 3, column: 4 };

    const result = checkIfLstIncludesCoordinate(coordinates, checkedCoordinate);
    expect(result).toBe(true);
  });

  it('should return false when coordinate is not in the list', () => {
    const coordinates: Coordinate[] = [
      { row: 1, column: 2 },
      { row: 3, column: 4 },
      { row: 5, column: 6 },
    ];
    const checkedCoordinate: Coordinate = { row: 7, column: 8 };

    const result = checkIfLstIncludesCoordinate(coordinates, checkedCoordinate);
    expect(result).toBe(false);
  });

  it('should return false for an empty list of coordinates', () => {
    const coordinates: Coordinate[] = [];
    const checkedCoordinate: Coordinate = { row: 1, column: 2 };

    const result = checkIfLstIncludesCoordinate(coordinates, checkedCoordinate);
    expect(result).toBe(false);
  });
});

describe('checkIfSink', () => {
  it('should return true when all coordinates are hit', () => {
    const coordinates: Coordinate[] = [
      { row: 1, column: 2 },
      { row: 3, column: 4 },
      { row: 5, column: 6 },
    ];
    const shot: Coordinate[] = [
      { row: 1, column: 2 },
      { row: 3, column: 4 },
      { row: 5, column: 6 },
    ];

    const result = checkIfSink(coordinates, shot);
    expect(result).toBe(true);
  });

  it('should return false when not all coordinates are hit', () => {
    const coordinates: Coordinate[] = [
      { row: 1, column: 2 },
      { row: 3, column: 4 },
      { row: 5, column: 6 },
    ];
    const shot: Coordinate[] = [
      { row: 1, column: 2 },
      { row: 3, column: 4 },
    ];

    const result = checkIfSink(coordinates, shot);
    expect(result).toBe(false);
  });
});

describe('isWinner', () => {
  it('should return true when all ships are sunk', () => {
    const ships: IMyShips[] = [
      { coordinates: [{ row: 1, column: 2 }, { row: 3, column: 4 }] },
    ];
    const shot: Coordinate[] = [
      { row: 1, column: 2 },
      { row: 3, column: 4 },
    ];

    const result = isWinner(ships, shot);
    expect(result).toBe(true);
  });

  it('should return false when not all ships are sunk', () => {
    const ships: IMyShips[] = [
      { coordinates: [{ row: 1, column: 2 }, { row: 3, column: 4 }] }
    ];
    const shot: Coordinate[] = [
      { row: 1, column: 2 }
    ];

    const result = isWinner(ships, shot);
    expect(result).toBe(false);
  });
});

describe('isHit', () => {
  it('should return true if coordinate is occupied by a ship', () => {
    const ships: IMyShips[] = [
      { coordinates: [{ row: 5, column: 6 }, { row: 7, column: 8 }] }
    ];
    const checkCoordinate: Coordinate = { row: 5, column: 6 };

    const result = isHit(ships, checkCoordinate);
    expect(result).toBe(true);
  });

  it('should return false if coordinate is not occupied by any ship', () => {
    const ships: IMyShips[] = [
      { coordinates: [{ row: 1, column: 2 }, { row: 3, column: 4 }] }
    ];
    const checkCoordinate: Coordinate = { row: 9, column: 10 };

    const result = isHit(ships, checkCoordinate);
    expect(result).toBe(false);
  });

  it('should return false for an empty list of ships', () => {
    const ships: IMyShips[] = [];
    const checkCoordinate: Coordinate = { row: 1, column: 2 };

    const result = isHit(ships, checkCoordinate);
    expect(result).toBe(false);
  });
});

describe('makeNewMessages', () => {
  it('should add a new message to the messages list', () => {
    const messages: Message[] = [
      { message: 'Welcome to Battleship!', time: '11:30 AM' },
      { message: 'Select your ships', time: '11:35 AM' },
    ];
    const newMessage = 'Test message';

    const newMessages = makeNewMessages(messages, newMessage);

    expect(newMessages).toHaveLength(3); // New message added to the list
    expect(newMessages[2].message).toBe(newMessage);
    expect(typeof newMessages[2].time).toBe('string'); // Assuming time is a string in the format '11:30 AM'
  });
});


describe('makeMsgForShot', () => {
  it('should create a message for a successful shot (HIT)', () => {
    const isMine = true;
    const ships: IMyShips[] = [
      { coordinates: [{ row: 0, column: 0 }, { row: 0, column: 1 }] }
    ];
    const coordinate: Coordinate = { row: 0, column: 1 };

    const message = makeMsgForShot(isMine, ships, coordinate);
    expect(message).toContain('You just shot at B1: HIT!');
  });

  it('should create a message for an unsuccessful shot (MISSED)', () => {
    const isMine = false;
    const ships: IMyShips[] = [
      { coordinates: [{ row: 0, column: 0 }, { row: 0, column: 1 }] },
    ];
    const coordinate: Coordinate = { row: 2, column: 2 };

    const message = makeMsgForShot(isMine, ships, coordinate);
    expect(message).toContain('Opponent just shot at C3: MISSED.');
  });
});



