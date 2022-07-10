import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import MainStackParams from "../navigation/paramLists/MainStack";
import { useHost } from "../providers/HostProvider";
import { useGameCode } from "../providers/CodeProvider";
import { useSocket } from "../providers/SocketProvider";
import { random } from "../utils/math";

type StartScreenProps = NativeStackScreenProps<MainStackParams, "StartScreen">;

const StartScreen: React.FC<StartScreenProps> = ({ navigation, route }) => {
  const { setIsHost } = useHost();
  const { setCode } = useGameCode();
  const socket = useSocket();

  const handleCreateGame = () => {
    const pokemonID = random(0, 151);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
    socket?.emit("createGame", avatar, (code: string) => {
      setIsHost?.(true);
      setCode?.(code);
      navigation.navigate("LobbyScreen", {
        userAvatar: avatar,
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={handleCreateGame}
        style={[styles.button, { backgroundColor: "rgb(220, 15,15)" }]}
      >
        <Text style={styles.label}>Host a Game</Text>
      </Pressable>
      <View style={{ height: 10 }} />
      <Pressable
        onPress={() => navigation.navigate("JoinLobbyScreen")}
        style={[styles.button, { backgroundColor: "rgb(15,15,220)" }]}
      >
        <Text style={styles.label}>Join a Game</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: 300,
    borderRadius: 75,
  },
  label: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
  },
});

export default StartScreen;
