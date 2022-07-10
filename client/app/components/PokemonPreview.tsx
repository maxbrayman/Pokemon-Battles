import {
  View,
  StyleSheet,
  Pressable,
  Image,
  StyleProp,
  ViewStyle,
  Text,
} from "react-native";

import StatusBar from "./StatusBar";
import PokemonClass from "../models/Pokemon";
import { StatusType } from "../models/StatusEffect";

interface PokemonPreviewProps {
  pokemon: PokemonClass;
  width: number;
  height: number;
  margin: number;
  inGame: boolean;
  onPress: (pokemon: PokemonClass) => void;
  style?: StyleProp<ViewStyle>;
}

const PokemonPreview: React.FC<PokemonPreviewProps> = ({
  pokemon,
  width,
  height,
  margin,
  inGame,
  onPress,
  style,
}) => {
  const fainted = pokemon.statusEffect?.type === StatusType.Fainted;
  return (
    <Pressable
      onPress={() => onPress(pokemon)}
      style={[
        styles.pokemonPreview,
        {
          width,
          height,
          margin,
          opacity: fainted ? 0.5 : 1,
          backgroundColor: pokemon.types[0].color,
        },
        style,
      ]}
    >
      <Image
        source={{ uri: pokemon.sprites.front }}
        style={{ height: height / 2, width: height / 2 }}
      />
      <View style={{ flex: 1, paddingRight: 10 }}>
        {inGame ? (
          <StatusBar
            name={pokemon.name}
            maxHP={pokemon.maxHp}
            hp={pokemon.currentHp}
            height={12}
            statusEffect={pokemon.statusEffect}
          />
        ) : (
          <Text style={{ color: "white" }}>{pokemon.name}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pokemonPreview: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default PokemonPreview;
