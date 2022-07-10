import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MainStackParams from "../navigation/paramLists/MainStack";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSocket } from "../providers/SocketProvider";
import { useGameCode } from "../providers/CodeProvider";
import { random } from "../utils/math";

type JoinLobbyScreenProps = NativeStackScreenProps<
  MainStackParams,
  "JoinLobbyScreen"
>;

const JoinLobbyScreen: React.FC<JoinLobbyScreenProps> = ({
  navigation,
  route,
}) => {
  const [codeInputValue, setCodeInputValue] = useState<string>("");
  const inputRef = useRef<TextInput>(null);
  const socket = useSocket();
  const { setCode } = useGameCode();

  const joinGame = (code: string) => {
    const pokemonID = random(0, 151);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
    socket?.emit(
      "joinGame",
      code,
      avatar,
      (success, message, opponentAvatar) => {
        if (!success) Alert.alert("Something went wrong", message);
        else {
          setCode?.(code);
          navigation.navigate("LobbyScreen", {
            userAvatar: avatar,
            opponentAvatar,
          });
        }
      }
    );
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Pressable
      onPress={() => inputRef?.current?.blur()}
      style={styles.container}
    >
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            placeholder="Enter code..."
            style={styles.input}
            value={codeInputValue}
            onChangeText={(text) => setCodeInputValue(text.trim())}
            maxLength={6}
            autoCapitalize="characters"
            autoCorrect={false}
          />
          <Ionicons
            name="arrow-forward-circle"
            size={30}
            color={codeInputValue.length === 6 ? "black" : "lightgrey"}
            onPress={() => {
              if (codeInputValue.length !== 6) return;
              joinGame(codeInputValue);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 20,
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    width: 230,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default JoinLobbyScreen;
