import Player from "../models/Player";
import Pokemon from "../models/Pokemon";
import Move from "../models/Move";
import {
  AttackResponse,
  GameOver,
  SwapResponse,
} from "../models/ActionResponses";
import { ClientAttack, ClientSwap } from "../models/ClientActions";
import { GameState } from "../models/Game";

export interface ServerToClientEvents {
  didConnect: (socketID: string) => void;
  playerJoinedGame: (playerAvatar: string) => void;
  playersAreReady: () => void;
  teamsAreSet: () => void;
  opponentTeamSet: (team: Pokemon[]) => void;
  updateTeam: (actionResponse: AttackResponse) => void;
  swapPokemon: (actionResponse: SwapResponse) => void;
  updateGameState: (state: GameState) => void;
  gameOver: (actionResponse: GameOver) => void;
}

export interface ClientToServerEvents {
  createGame: (avatar: string, cb: (code: string) => void) => void;
  joinGame: (
    code: string,
    avatar: string,
    cb: (success: boolean, message: string, opponentAvatar?: string) => void
  ) => void;
  leaveGame: (code: string) => void;
  playerReady: (code: string) => void;
  setTeam: (code: string, team: Pokemon[]) => void;
  setPlayerAction: (code: string, action: ClientSwap | ClientAttack) => void;
  actionReceived: (code: string) => void;
  sendOutNewPokemon: (code: string, pokemonTeamID: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
