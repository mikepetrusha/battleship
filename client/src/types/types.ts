export interface IInitialState {
    gameState: number,
    shipTilesState: number,
    messages: Message[],
    myShips: IMyShips[],
    myShipsShot: Coordinate[],
    opponentShips: IMyShips[],
    chosenTiles: Coordinate[],
    opponentShipsShot: Coordinate[],
    opponent: null | undefined | string,
    gotInitialOpponent: boolean,
    haveSendInitialMsg: boolean
}

export interface IMyShips {
    coordinates: Coordinate[]
}

export type Message = {
    message: string,
    time: string
}

export type Coordinate = {
    row: number,
    column: number
}

export interface IMyState {
    myBoard?: boolean,
    placedShips: IMyShips[],
    overlaySettings: string | null,
    title: string,
    showConfirmCancelButtons?: boolean,
    clearTiles?: () => void,
    clickTile: (coordinate: Coordinate) => void,
    chosenTiles: Coordinate[],
    confirmTiles?: () => void,
    shot: Coordinate[],
    active: boolean
}

export enum gameStateEnum {
    WaitingForPlayer = 0,
    PickingTiles = 1,
    WaitingForOpponentTiles = 2,
    PlayersTurnToShoot = 3,
    OpponentsTurnToShoot = 4,
    PlayerWon = 5,
    PlayerLost = 6
}