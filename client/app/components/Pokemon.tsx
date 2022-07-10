import { View, StyleSheet, Image, StyleProp, ViewStyle } from "react-native";
import PokemonClass from "../models/Pokemon";
import StatusBar from "./StatusBar";

interface PokemonProps {
  pokemon: PokemonClass | null;
  isUser: boolean;
}

const SPRITE_SIZE = 150;

const Pokemon: React.FC<PokemonProps> = ({ pokemon, isUser }) => {
  if (!pokemon) return null;

  const sprite = isUser ? pokemon.sprites.back : pokemon.sprites.front;
  const containerStyle: StyleProp<ViewStyle> = {
    position: "absolute",
    top: isUser ? undefined : 0,
    bottom: isUser ? 0 : undefined,
    left: isUser ? undefined : "25%",
    right: isUser ? "25%" : undefined,
  };
  return (
    <View style={containerStyle}>
      {isUser && (
        <StatusBar
          name={pokemon.name}
          hp={pokemon.currentHp}
          maxHP={pokemon.maxHp}
          statusEffect={pokemon.statusEffect}
        />
      )}
      <Image source={{ uri: sprite }} style={[styles.sprite]} />
      {!isUser && (
        <StatusBar
          name={pokemon.name}
          hp={pokemon.currentHp}
          maxHP={pokemon.maxHp}
          statusEffect={pokemon.statusEffect}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sprite: {
    width: SPRITE_SIZE,
    height: SPRITE_SIZE,
  },
});

export default Pokemon;
