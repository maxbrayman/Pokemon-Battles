import { View, StyleSheet, Text, Image, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MainStackParams from "../navigation/paramLists/MainStack";
import { useSocket } from "../providers/SocketProvider";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useGameCode } from "../providers/CodeProvider";
import { useHost } from "../providers/HostProvider";

type LobbyScreenProps = NativeStackScreenProps<MainStackParams, "LobbyScreen">;

const LobbyScreen: React.FC<LobbyScreenProps> = ({ route, navigation }) => {
  const { userAvatar, opponentAvatar } = route.params;
  const socket = useSocket();
  const { isHost, setIsHost } = useHost();
  const { code, setCode } = useGameCode();

  const [opponent, setOpponent] = useState<string | undefined>(opponentAvatar);
  const [isReady, setIsReady] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [gameIsReady, setGameIsReady] = useState(false);
  const countdownRef = useRef(3);

  const handleReady = () => {
    socket?.emit("playerReady", code);
    setIsReady(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (gameIsReady) {
      interval = setInterval(() => {
        setCountdownValue((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameIsReady]);

  useEffect(() => {
    countdownRef.current = countdownValue;
    if (countdownValue === 0) {
      navigation.replace("PokemonSelectScreen");
    }
  }, [countdownValue]);

  useEffect(() => {
    return () => {
      if (countdownRef.current > 0) {
        setIsHost?.(false);
        setCode?.("");
      }
    };
  }, []);

  useEffect(() => {
    socket?.on("playerJoinedGame", (avatar: string) => {
      if (isHost) setOpponent(avatar);
    });
    socket?.on("playersAreReady", () => setGameIsReady(true));

    return () => {
      socket?.removeListener("playerJoinedGame");
      socket?.removeListener("playersAreReady");
    };
  }, [socket]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: isHost ? userAvatar : opponent }}
          style={{ width: 100, height: 100, marginBottom: 10 }}
        />
        {isHost && opponent && (
          <Button title="Ready" disabled={isReady} onPress={handleReady} />
        )}
        {isHost && !opponent && null}
      </View>
      <View style={styles.textContainer}>
        {gameIsReady ? (
          <Text
            style={{ fontSize: 22 }}
          >{`Going to select screen in - ${countdownValue}`}</Text>
        ) : (
          <Text style={{ fontSize: 22 }}>
            {!opponent
              ? "Waiting for an opponent..."
              : "Waiting for players to be ready..."}
          </Text>
        )}
        <Text style={{ fontSize: 20, marginTop: 15 }}>
          Code: <Text style={{ fontWeight: "bold" }}>{code}</Text>
        </Text>
      </View>
      {!opponent ? (
        <Ionicons name="help" size={100} />
      ) : (
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 100, height: 100, marginBottom: 10 }}
            source={{ uri: isHost ? opponent : userAvatar }}
          />
          {!isHost && (
            <Button title="Ready" disabled={isReady} onPress={handleReady} />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textContainer: {
    marginHorizontal: 100,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default LobbyScreen;
