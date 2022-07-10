import { Server } from "socket.io";
import Game from "../models/Game";
import Pokemon from "../models/Pokemon";
import Move from "../models/Move";
import {
  actionReceived,
  createGame,
  joinGame,
  leaveGame,
  playerReady,
  setPlayerAction,
  setTeam,
} from "./eventHandlers";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./eventMaps";
import { ClientAttack, ClientSwap } from "../models/ClientActions";

const games: Game[] = [];

export default (
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) => {
  io.on("connection", (socket) => {
    socket.on("createGame", (avatar: string, cb: (code: string) => void) =>
      createGame(socket, games, avatar, cb)
    );
    socket.on(
      "joinGame",
      (
        code: string,
        avatar: string,
        cb: (success: boolean, message: string, opponentAvatar?: string) => void
      ) => joinGame(socket, games, code, avatar, cb)
    );
    socket.on("leaveGame", (code: string) => leaveGame(socket, games, code));
    socket.on("playerReady", (code: string) =>
      playerReady(socket, io, games, code)
    );
    socket.on("setTeam", (code: string, team: Pokemon[]) =>
      setTeam(socket, io, games, code, team)
    );
    socket.on(
      "setPlayerAction",
      (code: string, action: ClientAttack | ClientSwap) =>
        setPlayerAction(socket, io, games, code, action)
    );
    socket.on("actionReceived", (code: string) =>
      actionReceived(socket, io, games, code)
    );
    socket.on("disconnect", () => {
      `${socket.id} was disconnected`;
    });
  });
};
