import { useContext, useEffect, useState, createContext } from "react";
import { io, Socket } from "socket.io-client";
import { AttackResponse, SwapResponse } from "../models/serverResponses";
import { Attack, Swap } from "../models/actions";
import PokemonClass from "../models/Pokemon";
import { GameState } from "../screens/BattleScreen";

// Make sure port number is equal to the port you are running the server
const domain = "http://localhost:4000";

interface Props {}

export interface JoinRoomResponse {
  success: boolean;
  message: string;
}

interface ServerToClientEvents {
  playerJoinedGame: (player: string) => void;
  playersAreReady: () => void;
  teamsAreSet: () => void;
  opponentTeamSet: (team: PokemonClass[]) => void;
  updateTeam: (response: AttackResponse) => void;
  swapPokemon: (response: SwapResponse) => void;
  updateGameState: (state: GameState) => void;
}

interface ClientToServerEvents {
  createGame: (avatar: string, cb: (code: string) => void) => void;
  joinGame: (
    code: string,
    avatar: string,
    cb: (success: boolean, message: string, opponentAvatar?: string) => void
  ) => void;
  leaveGame: (code: string) => void;
  playerReady: (code: string) => void;
  setTeam: (code: string, team: PokemonClass[]) => void;
  setPlayerAction: (code: string, action: Swap | Attack) => void;
  actionReceived: (code: string) => void;
}

const SocketContext = createContext<Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    const newSocket = io(domain, {
      reconnection: false,
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
