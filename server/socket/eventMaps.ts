import Pokemon from "../models/Pokemon";
import { AttackResponse, SwapResponse } from "../models/ActionResponses";
import { ClientAttack, ClientSwap } from "../models/ClientActions";
import { GameState } from "../models/Game";

export interface ServerToClientEvents {
  playerJoinedGame: (playerAvatar: string) => void;
  playersAreReady: () => void;
  teamsAreSet: () => void;
  opponentTeamSet: (team: Pokemon[]) => void;
  updateTeam: (actionResponse: AttackResponse) => void;
  swapPokemon: (actionResponse: SwapResponse) => void;
  updateGameState: (state: GameState) => void;
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
}

export interface InterServerEvents {}

export interface SocketData {}
