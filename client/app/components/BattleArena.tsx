import { View, StyleSheet, Image } from "react-native";
import PokemonClass from "../models/Pokemon";
import Pokemon from "./Pokemon";
import RemainingPokemon from "./RemainingPokemon";

interface BattleArenaProps {
  userPokemon: PokemonClass | null;
  opponentPokemon: PokemonClass | null;
  userTeam: PokemonClass[];
  opponentTeam: PokemonClass[];
}

const BattleArena: React.FC<BattleArenaProps> = ({
  userPokemon,
  opponentPokemon,
  userTeam,
  opponentTeam,
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ position: "absolute", width: "100%", height: "100%" }}
        source={require("../../assets/battle-background-1.jpeg")}
      />
      <View style={styles.section}>
        <View style={styles.remainingPokemonContainerUser}>
          <RemainingPokemon team={userTeam} />
        </View>
        <Pokemon pokemon={userPokemon} isUser />
      </View>
      <View style={styles.section}>
        <View style={styles.remainingPokemonContainerEnemy}>
          <RemainingPokemon team={opponentTeam} />
        </View>
        <Pokemon pokemon={opponentPokemon} isUser={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  remainingPokemonContainerEnemy: {
    position: "absolute",
    top: 2,
    right: 40,
  },
  remainingPokemonContainerUser: {
    position: "absolute",
    bottom: 2,
    left: 2,
  },
  section: {
    flex: 1,
    height: "100%",
  },
});

export default BattleArena;
