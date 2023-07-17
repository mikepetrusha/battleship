import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { checkIfLstIncludesCoordinate, checkIfSameCoordinate, getCurrentTime, isWinner, makeNewMessages } from '../../utils/utils';
import { MSG_ENTER_NEW_GAME } from '../../constants';
import { emitShot } from '../../hooks/useGame';
import { Coordinate, IInitialState, IMyShips, gameStateEnum } from '../../types/types'


const initialState: IInitialState = {
    gameState: gameStateEnum.WaitingForPlayer,
    shipTilesState: 0,
    messages: [{ time: getCurrentTime(), message: "Welcome to Battleship!" }],
    myShips: [],
    myShipsShot: [],
    opponentShips: [],
    chosenTiles: [],
    opponentShipsShot: [],
    opponent: undefined,
    gotInitialOpponent: false,
    haveSendInitialMsg: false,
  };

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        new_Opponent: (state, action: PayloadAction<string>) => {
            const opponent = action.payload;
            const newGameState = opponent ? gameStateEnum.PickingTiles : gameStateEnum.WaitingForPlayer

            return state = {
                ...state,
                opponent,
                gotInitialOpponent: true,
                gameState: newGameState
            }
        },

        new_Message: (state, action: PayloadAction<string>) => {
            const {messages} = state
            const newMessages = makeNewMessages(messages, action.payload)

            return{
                ...state,
                haveSendInitialMsg: true,
                messages: newMessages
            }
        },

        new_Game: (state) => {
            const {messages} = state
            const newMessages = makeNewMessages(messages, MSG_ENTER_NEW_GAME)

            return {
                ...initialState,
                messages: newMessages
            }
        },

        opponent_Left: (state) => {
            const {messages} = state
            return {
                ...initialState,
                messages,
                haveSendInitialMsg: true
            }
        },

        clear_Tiles: (state) => {
            return {
                ...state,
                chosenTiles: []
            }
        },

        select_Tile: (state, action: PayloadAction<Coordinate>) => {
            const {myShips, chosenTiles} = state
            if(myShips === null) return state
            for(const {coordinates} of myShips){
                const isOccupied = checkIfLstIncludesCoordinate(coordinates, action.payload)
                if(isOccupied) return state
            }

            const isSelected = checkIfLstIncludesCoordinate(chosenTiles, action.payload)
            const newChosenTiles = isSelected ? chosenTiles.filter((coordinate) => !checkIfSameCoordinate(coordinate, action.payload)) : chosenTiles.concat([action.payload])

            return {
                ...state,
                chosenTiles: newChosenTiles
            }
        },

        confirm_Tile: (state) => {
            const {chosenTiles, myShips} = state
            const newShip = {coordinates: chosenTiles}
            const newMyShips = myShips.concat([newShip])

            return {
                ...state,
                myShips: newMyShips,
                shipTilesState: 1
            }
        },

        complete_Selection: (state) => {
            return {
                ...state,
                gameState: gameStateEnum.WaitingForOpponentTiles
            }
        },

        set_Opponent_Ships: (state, action: PayloadAction<IMyShips[]>) => {
            const {gameState} = state
            const newGameState = gameState === gameStateEnum.WaitingForOpponentTiles ? gameStateEnum.PlayersTurnToShoot : gameState
    
            return {
                ...state,
                opponentShips: action.payload,
                gameState: newGameState
            }
        },

        opponents_Turn: (state) => {
            return {
                ...state,
                gameState: gameStateEnum.OpponentsTurnToShoot
            }
        },

        shot: (state, action: PayloadAction<Coordinate>) => {
            const {opponentShipsShot, opponentShips} = state
            const alreadyShot = checkIfLstIncludesCoordinate(opponentShipsShot, action.payload)
            if(alreadyShot) return state

            const newOpponentShipsShot = opponentShipsShot.concat([action.payload])

            const hasWon = isWinner(opponentShips, newOpponentShipsShot)
            const msgType = hasWon ? 'end' : 'shot'
            const newGameState = hasWon ? gameStateEnum.PlayerWon : gameStateEnum.OpponentsTurnToShoot
            emitShot(msgType, action.payload)

            return {
                ...state,
                opponentShipsShot: newOpponentShipsShot,
                gameState: newGameState
            }
        },

        opponent_Shot: (state, action) => {
            const {myShipsShot} = state
            const newMyShipsShot = myShipsShot.concat([action.payload])

            return {
                ...state,
                myShipsShot: newMyShipsShot,
                gameState: gameStateEnum.PlayersTurnToShoot
            }
        },

        end: (state) => {
            return {
                ...state,
                gameState: gameStateEnum.PlayerLost
            }
        }
    }
})


export const {new_Opponent, new_Message, new_Game, opponent_Left, clear_Tiles, select_Tile, confirm_Tile, complete_Selection, set_Opponent_Ships, opponents_Turn, shot, opponent_Shot, end} = gameSlice.actions

export default gameSlice.reducer
