import { View, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MainStackParams from "../navigation/paramLists/MainStack";
import { useGameCode } from "../providers/CodeProvider";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BattleMessage from "../components/BattleMessage";
import BattleArena from "../components/BattleArena";
import BattleMenu from "../components/BattleMenu";
import { useSocket } from "../providers/SocketProvider";
import PokemonClass from "../models/Pokemon";
import { Attack, Swap } from "../models/actions";
import { useHost } from "../providers/HostProvider";
import {
  AttackResponse,
  GameOver,
  SwapResponse,
} from "../models/serverResponses";
import { wait } from "../utils/promises";

type ScreenProps = NativeStackScreenProps<MainStackParams, "BattleScreen">;

export type GameState = "StartUp" | "SelectAction" | "InProgress" | "End";

const BattleScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { code } = useGameCode();
  const socket = useSocket();

  const [gameState, setGameState] = useState<GameState>("SelectAction");

  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [userAction, setUserAction] = useState<Attack | Swap | null>(null);

  const [userTeam, setUserTeam] = useState<PokemonClass[]>(
    route.params.userTeam
  );
  const userTeamRef = useRef<PokemonClass[]>([]);

  const [opponentTeam, setOpponentTeam] = useState<PokemonClass[]>(
    route.params.opponentTeam
  );

  const [activeUserPokemonID, setActiveUserPokemonID] = useState<
    string | undefined
  >(route.params.userTeam[0].teamID);

  const [activeOpponentPokemonID, setActiveOpponentPokemonID] = useState<
    string | undefined
  >(route.params.opponentTeam[0].teamID);

  const activeUserPokemon = useMemo(() => {
    return userTeam.find((p) => p.teamID === activeUserPokemonID) ?? null;
  }, [activeUserPokemonID, userTeam]);

  const activeOpponentPokemon = useMemo(() => {
    return (
      opponentTeam.find((p) => p.teamID === activeOpponentPokemonID) ?? null
    );
  }, [activeOpponentPokemonID, opponentTeam]);

  const handleSwapPokemon = async (swapResponse: SwapResponse) => {
    setActionMessage(swapResponse.message);
    if (swapResponse.playerSocketID === socket?.id) {
      setActiveUserPokemonID(swapResponse.pokemonTeamID);
      setUserAction(null);
    } else {
      setActiveOpponentPokemonID(swapResponse.pokemonTeamID);
    }
    await wait(2000);
    setActionMessage(null);
    socket?.emit("actionReceived", code);
  };

  const handleUpdateTeam = async (response: AttackResponse) => {
    const isDefendingTeam = response.defendingPlayerSocketID === socket?.id;
    if (!isDefendingTeam) {
      setUserTeam(response.attackingTeam);
    }
    setActionMessage(response.attackMessage);
    await wait(2000);
    if (isDefendingTeam) {
      setUserTeam(response.defendingTeam);
    } else {
      setOpponentTeam(response.defendingTeam);
      setUserAction(null);
    }
    setActionMessage(response.damageMessage);
    await wait(2000);
    setActionMessage(null);
    if (response.gameOver) return handleGameOver(response.gameOver);
    if (isDefendingTeam && response.pokemonFainted) return;
    else socket?.emit("actionReceived", code);
  };

  const handleGameOver = (response: GameOver) => {
    const userIsWinner = response.winningSocketID === socket?.id;
    const alertMessage = `You ${userIsWinner ? "Won!" : "Lost"}`;
    Alert.alert("Game Over", alertMessage, [
      {
        text: "Back To Home Screen",
        onPress: () => {
          navigation.reset({
            routes: [{ name: "StartScreen" }],
            index: 0,
          });
        },
      },
    ]);
  };

  useEffect(() => {
    userTeamRef.current = userTeam;
  }, [userTeam]);

  useEffect(() => {
    socket?.on("swapPokemon", handleSwapPokemon);
    socket?.on("updateTeam", handleUpdateTeam);
    socket?.on("updateGameState", (state) => setGameState(state));
    socket?.on("gameOver", handleGameOver);

    return () => {
      socket?.removeListener("swapPokemon");
      socket?.removeListener("updateTeam");
      socket?.removeListener("updateGameState");
      socket?.removeListener("gameOver");

      socket?.emit("leaveGame", code);
    };
  }, [socket]);

  return (
    <>
      <BattleMessage message={actionMessage} />
      <View style={styles.container}>
        <BattleArena
          userPokemon={activeUserPokemon}
          opponentPokemon={activeOpponentPokemon}
          userTeam={userTeam}
          opponentTeam={opponentTeam}
        />
        <BattleMenu
          hideOptions={userAction !== null || gameState === "InProgress"}
          activePokemon={activeUserPokemon}
          onSelectMove={(move) => {
            const action = new Attack(move.name);
            setUserAction(action);
            socket?.emit("setPlayerAction", code, action);
          }}
          onSwap={(teamID) => {
            const action = new Swap(teamID);
            setUserAction(action);
            socket?.emit("setPlayerAction", code, action);
          }}
          team={userTeam}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});

export default BattleScreen;
