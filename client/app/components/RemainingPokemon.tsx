import { View, StyleSheet } from "react-native";
import PokemonClass from "../models/Pokemon";

interface RemainingPokemonProps {
  team: PokemonClass[];
}

const MAX_TEAM_SIZE = [1, 2, 3, 4, 5, 6];
const POKEBALL_SIZE = 20;

const RemainingPokemon: React.FC<RemainingPokemonProps> = ({ team }) => {
  return (
    <View style={styles.container}>
      {MAX_TEAM_SIZE.map((value, index) => {
        let backgroundColor;
        if (!team[index]) backgroundColor = "none";
        else {
          if (team[index].currentHp > 0) backgroundColor = "red";
          else backgroundColor = "lightgrey";
        }
        return (
          <View key={value} style={[styles.pokeball, { backgroundColor }]} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  pokeball: {
    width: POKEBALL_SIZE,
    height: POKEBALL_SIZE,
    borderRadius: POKEBALL_SIZE / 2,
    borderWidth: 1,
    marginHorizontal: 1,
  },
});

export default RemainingPokemon;
