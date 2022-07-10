import { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Button,
  Image,
  Pressable,
} from "react-native";
import PokemonClass from "../models/Pokemon";
import StatusBar from "./StatusBar";

interface SwapPokemonModalProps {
  team: PokemonClass[];
  onDismiss: () => void;
  isVisible: boolean;
  onSelectPokemon: (pokemon: PokemonClass) => void;
  mustChooseNewPokemon: boolean;
}

interface PokemonPreviewProps {
  pokemon: PokemonClass;
  width: number;
  height: number;
  onPress: (pokemon: PokemonClass) => void;
}

const CONTENT_VIEW_PADDING = 15;
const POKEMON_PREVIEW_MARGIN = 5;

const PokemonPreview: React.FC<PokemonPreviewProps> = ({
  pokemon,
  width,
  height,
  onPress,
}) => {
  const fainted = pokemon.currentHp < 1;
  return (
    <Pressable
      onPress={() => onPress(pokemon)}
      style={[
        styles.pokemonPreview,
        {
          width,
          height,
          margin: POKEMON_PREVIEW_MARGIN,
          opacity: fainted ? 0.5 : 1,
        },
      ]}
    >
      <Image
        source={{ uri: pokemon.sprites.front }}
        style={{ height: height / 2, width: height / 2 }}
      />
      <View style={{ flex: 1, paddingRight: 10 }}>
        <StatusBar
          name={pokemon.name}
          maxHP={pokemon.maxHp}
          hp={pokemon.currentHp}
          // height={12}
          statusEffect={pokemon.statusEffect}
        />
      </View>
    </Pressable>
  );
};

const SwapPokemonModal: React.FC<SwapPokemonModalProps> = ({
  team,
  onDismiss,
  isVisible,
  onSelectPokemon,
  mustChooseNewPokemon,
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const pokemonPreviewHeight = contentHeight / 3 - POKEMON_PREVIEW_MARGIN * 2;
  const pokemonPreviewWidth = contentWidth / 2 - POKEMON_PREVIEW_MARGIN * 2;
  return (
    <Modal
      visible={isVisible}
      onDismiss={onDismiss}
      presentationStyle="pageSheet"
      animationType="slide"
    >
      {!mustChooseNewPokemon && <Button title="Cancel" onPress={onDismiss} />}
      <View
        style={styles.contentView}
        onLayout={(event) => {
          setContentHeight(
            event.nativeEvent.layout.height - CONTENT_VIEW_PADDING * 2
          );
          setContentWidth(event.nativeEvent.layout.width);
        }}
      >
        {team.map((p, index) => {
          return (
            <PokemonPreview
              key={p.teamID}
              pokemon={p}
              height={pokemonPreviewHeight}
              width={pokemonPreviewWidth}
              onPress={onSelectPokemon}
            />
          );
        })}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentView: {
    width: "50%",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  pokemonPreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderRadius: 10,
  },
});

export default SwapPokemonModal;
