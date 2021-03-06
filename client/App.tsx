import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./app/navigation/MainStackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
