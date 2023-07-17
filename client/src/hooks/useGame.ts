import io from "socket.io-client";
import {useEffect } from "react";
import {
  getLastElm,
  makeMsgForShot,
} from "../utils/utils";
import {
  INITIAL_MSG_NO_OPPONENT,
  INITIAL_MSG_HAVE_OPPONENT,
  MSG_HAVE_OPPONENT,
  MSG_NO_OPPONENT,
  MSG_ATTACK,
  MSG_DEFEND,
  MSG_WAITING_FOR_PLAYER,
  MSG_LOSE,
  MSG_WIN,
  MSG_OPPONENT_PLACING_SHIPS,
} from "../constants";
import { clear_Tiles, complete_Selection, confirm_Tile, end, new_Game, new_Message, new_Opponent, opponent_Left, opponent_Shot, opponents_Turn, select_Tile, set_Opponent_Ships, shot } from "../store/game/game.slice";
import { Coordinate, IMyShips } from "../types/types";
import { useTypedDispatch, useTypedSelector } from "./reduxHooks";

const socket = io("localhost:4001");

export const emitShot = (message: string, coordinate: Coordinate) => {
  socket.emit(message, coordinate)
}

export const useGame = () => {
  const dispatch = useTypedDispatch()
  const game = useTypedSelector((state) => state.game)

  const {
    gotInitialOpponent,
    opponent,
    haveSendInitialMsg,
    gameState,
    myShips,
    opponentShips,
    messages,
    shipTilesState,
    chosenTiles,
    opponentShipsShot,
    myShipsShot,
  } = game

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("opponent", (opponent: string) => {
      dispatch(new_Opponent(opponent))
    })

    socket.on("opponentShips", (opponentShips: IMyShips[]) => {

      return dispatch(set_Opponent_Ships(opponentShips))
    });

    socket.on("shot", (coordinate) => {
      dispatch(opponent_Shot(coordinate))
    });

    socket.on("end", (coordinate) => {
      dispatch(opponent_Shot(coordinate))

      dispatch(end())
    });

    return () => {
      socket.off("connect");
      socket.off("opponent");
      socket.off("opponentShips");
      socket.off("shot");
      socket.off("end");
    };
  }, [dispatch]);

  useEffect(() => {
    if (gotInitialOpponent) {
      const message = opponent
        ? haveSendInitialMsg
          ? MSG_HAVE_OPPONENT
          : INITIAL_MSG_HAVE_OPPONENT
        : haveSendInitialMsg
        ? MSG_NO_OPPONENT
        : INITIAL_MSG_NO_OPPONENT;

      dispatch(new_Message(message))

      if (!opponent) dispatch(opponent_Left())
    }
  }, [dispatch, opponent, gotInitialOpponent, haveSendInitialMsg]);

  useEffect(() => {
    switch (gameState) {
      case 1:
        dispatch(new_Message("Select your ships"))
        break;
      case 2:
        socket.emit("ships", myShips);
        if (opponentShips.length) dispatch(opponents_Turn());
        
        dispatch(new_Message(MSG_OPPONENT_PLACING_SHIPS))
        break;
      case 3: {
        const opponentLastShot = getLastElm(myShipsShot);
      
        if (opponentLastShot) {
          const shotMsg = makeMsgForShot(false, myShips, opponentLastShot);

          dispatch(new_Message(shotMsg))
        }

        dispatch(new_Message(MSG_ATTACK))
        break;
      }
      case 4: {
        const myLastShot = getLastElm(opponentShipsShot);
        if (myLastShot) {
          const shotMsg = makeMsgForShot(true, opponentShips , myLastShot);

          dispatch(new_Message(shotMsg))
        }

        dispatch(new_Message(MSG_DEFEND))
        break;
      }
      case 5:
        dispatch(new_Message(MSG_WIN))
        break;
      case 6:
       dispatch(new_Message(MSG_LOSE))
        break;
      default:
    }
  }, [dispatch, gameState, myShips, myShipsShot, opponentShips, opponentShipsShot]);


  // while we selectiong ships shipTilesState equals 0, when we press configm it becomes 1
  useEffect(() => {
    switch (shipTilesState) {
      case 0:
        break;
      case 1:
        dispatch(complete_Selection())
        break;
      default:
        dispatch(new_Message('Select your ships'))
    }
  }, [dispatch, shipTilesState]);

  const newGame = () => {
    dispatch(new_Game())
    socket.emit("newGame");
  };

  const showOpponentOverlay = 
    gameState === 0
      ? MSG_WAITING_FOR_PLAYER
      : !opponentShips.length
      ? MSG_OPPONENT_PLACING_SHIPS
      : null;

  const showMyOverlay =
    gameState === 5 ? MSG_WIN : gameState === 6 ? MSG_LOSE : null;

  const showConfirmCancelButtons = gameState === 1;

  const clearTiles = () => {
    dispatch(clear_Tiles())
  };

  const clickTile = (myBoard: boolean) => {
    if (myBoard) {
      return (coordinate: Coordinate) => {
        if (gameState === 1) dispatch(select_Tile(coordinate))
      };
    }
    return (coordinate: Coordinate) => {
      if (gameState === 3) {

        dispatch(shot(coordinate))
      }
    };
  };

  const confirmTiles = () => {
    dispatch(confirm_Tile())
  };

  const logState = { messages, newGame };

  const myState = {
    myBoard: true,
    placedShips: myShips,
    overlaySettings: showMyOverlay,
    title: "Your Board",
    showConfirmCancelButtons,
    clearTiles,
    clickTile: clickTile(true),
    chosenTiles,
    confirmTiles,
    shot: myShipsShot,
    active: gameState === 4,
  };

  const opponentState = {
    placedShips: opponentShips,
    overlaySettings: showOpponentOverlay,
    title: "Opponent's Board",
    clickTile: clickTile(false),
    chosenTiles: [],
    shot: opponentShipsShot,
    active: gameState === 3,
  };

  return { logState, myState, opponentState };
};
