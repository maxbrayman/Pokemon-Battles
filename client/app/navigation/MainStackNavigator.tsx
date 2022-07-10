import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Providers from "../providers";
import BattleScreen from "../screens/BattleScreen";
import JoinLobbyScreen from "../screens/JoinLobby";
import LobbyScreen from "../screens/LobbyScreen";
import PokemonSelectScreen from "../screens/PokemonSelectScreen";
import StartScreen from "../screens/StartScreen";
import MainStackParams from "./paramLists/MainStack";

const Stack = createNativeStackNavigator<MainStackParams>();

const MainStackNavigator: React.FC = () => {
  return (
    <Providers>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen
          name="LobbyScreen"
          component={LobbyScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="JoinLobbyScreen"
          component={JoinLobbyScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="PokemonSelectScreen"
          component={PokemonSelectScreen}
        />
        <Stack.Screen name="BattleScreen" component={BattleScreen} />
      </Stack.Navigator>
    </Providers>
  );
};

export default MainStackNavigator;
