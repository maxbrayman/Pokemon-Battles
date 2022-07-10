import { Server, Socket } from "socket.io";
import Game from "../models/Game";
import Player from "../models/Player";
import Pokemon from "../models/Pokemon";
import Move from "../models/Move";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./eventMaps";
import { ClientAttack, ClientSwap } from "../models/ClientActions";
import { findGame, isSwap } from "./utils";
import e from "express";

export const createGame = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  games: Game[],
  avatar: string,
  cb: (code: string) => void
) => {
  const player = new Player(socket.id, true, avatar);
  const game = new Game(games);
  game.addPlayer(player);
  socket.join(game.code);
  games.push(game);
  cb(game.code);
};

export const joinGame = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  games: Game[],
  code: string,
  avatar: string,
  cb: (success: boolean, message: string, opponentAvatar?: string) => void
) => {
  const game = games.find((g) => g.code === code);
  if (!game || game.isFull()) cb(false, "Invalid code was entered");
  else {
    const opponentAvatar = game.getOpponent(socket.id)?.avatar;
    if (!opponentAvatar)
      cb(false, "Something went wrong while joining the game");
    else {
      const player = new Player(socket.id, false, avatar);
      game.addPlayer(player);
      socket.join(game.code);
      cb(true, `Joined room ${game.code}`, opponentAvatar);
      socket.to(game.code).emit("playerJoinedGame", player.avatar);
    }
  }
};

export const leaveGame = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  games: Game[],
  code: string
) => {
  const index = games.findIndex((g) => g.code === code);
  if (index > -1) {
    const hostLeft = games[index].removePlayer(socket.id);
    if (hostLeft) games.splice(index, 1);
  }
};

export const playerReady = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  games: Game[],
  code: string
) => {
  const game = games.find((g) => g.code === code);
  if (game) {
    game.playerReady(socket.id);
    if (game.arePlayersReady()) {
      io.in(game.code).emit("playersAreReady");
    }
  }
};

export const setTeam = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  games: Game[],
  code: string,
  team: Pokemon[]
) => {
  const game = games.find((g) => g.code === code);
  if (game) {
    game.setPlayerTeam(socket.id, team);
    socket.to(game.code).emit("opponentTeamSet", team);
    if (team[0].teamID)
      game.swapPokemon({ socketID: socket.id, pokemonTeamID: team[0].teamID });
    if (game.areTeamsSet()) {
      game.state = "SelectAction";
      io.in(game.code).emit("updateGameState", game.state);
      io.in(game.code).emit("teamsAreSet");
    }
  }
};

export const setPlayerAction = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  games: Game[],
  code: string,
  clientAction: ClientSwap | ClientAttack | null
) => {
  const game = findGame(games, code);
  if (game) {
    if (!clientAction) {
    } else if ("pokemonTeamID" in clientAction) {
      game.setPlayerAction({
        pokemonTeamID: clientAction.pokemonTeamID,
        socketID: socket.id,
      });
    } else {
      game.setPlayerAction({
        move: clientAction.move,
        socketID: socket.id,
      });
    }
    if (game.state === "InProgress") {
      executeAction(io, game);
    }
  }
};

export const actionReceived = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  games: Game[],
  code: string
) => {
  const game = findGame(games, code);
  if (game) {
    game.actionWasReceived(socket.id);
    if (game.actionReceivedByAllPlayers()) {
      executeAction(io, game);
    }
  }
};

export const sendOutNewPokemon = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  games: Game[],
  code: string,
  pokemonTeamID: string
) => {
  const game = findGame(games, code);
  if (game) {
    const response = game.swapPokemon({ pokemonTeamID, socketID: socket.id });
    game.actionWasReceived(socket.id);
    socket.to(game.code).emit("swapPokemon", response);
  }
};

const executeAction = (
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  game: Game
) => {
  const actionResponse = game.executeAction();

  if (actionResponse) {
    if ("pokemonTeamID" in actionResponse) {
      io.in(game.code).emit("swapPokemon", actionResponse);
    } else {
      io.in(game.code).emit("updateTeam", actionResponse);
    }
  }
  io.in(game.code).emit("updateGameState", game.state);
};
