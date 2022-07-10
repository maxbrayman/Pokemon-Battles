import React, { useState } from "react";
import { View, StyleSheet, Modal, Image, Text, Pressable } from "react-native";
import PokemonClass from "../models/Pokemon";
import TypeComponent from "./Type";

interface PokemonPreviewModalProps {
  pokemon: PokemonClass | null;
  isVisible: boolean;
  onDismiss: () => void;
  onSelect: (pokemon: PokemonClass) => void;
  onRemove: (teamID: string | undefined) => void;
  removable: boolean;
}

type Size = {
  width: number;
  height: number;
};

const MOVES_MARGIN = 5;

const PokemonPreviewModal: React.FC<PokemonPreviewModalProps> = ({
  isVisible,
  pokemon,
  removable,
  onDismiss,
  onSelect,
  onRemove,
}) => {
  const [movesContainerSize, setMovesContainerSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  if (!pokemon) return null;
  return (
    <Modal
      visible={isVisible}
      onDismiss={onDismiss}
      presentationStyle="pageSheet"
      animationType="slide"
    >
      <View style={styles.content}>
        <View>
          <Image source={{ uri: pokemon.sprites.front }} style={styles.image} />
          <Pressable
            onPress={() => {
              if (removable) onRemove(pokemon.teamID);
              else onSelect(pokemon);
            }}
            style={[styles.button, { backgroundColor: "dodgerblue" }]}
          >
            <Text style={{ fontSize: 18, color: "white" }}>
              {removable ? "Remove From Team" : "Add To Team"}
            </Text>
          </Pressable>
          <Pressable
            onPress={onDismiss}
            style={[styles.button, { backgroundColor: "rgb(220, 10, 10)" }]}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Cancel</Text>
          </Pressable>
        </View>
        <View style={styles.details}>
          <View style={[styles.row, { marginBottom: 20 }]}>
            <Text style={{ fontSize: 28 }}>{pokemon.name}</Text>
            <View style={{ flex: 1 }} />
            {pokemon.types.map((type, index) => {
              return (
                <React.Fragment key={type.name}>
                  <TypeComponent type={type} />
                  {index < pokemon.types.length - 1 && (
                    <View style={{ width: 2 }} />
                  )}
                </React.Fragment>
              );
            })}
          </View>
          <View style={styles.row}>
            <View
              style={[
                styles.statContainer,
                { backgroundColor: "rgba(0,0,0, 0.1)" },
              ]}
            >
              <Text style={styles.statText}>Strength</Text>
              <Text>{pokemon.strength}</Text>
            </View>
            <View
              style={[
                styles.statContainer,
                { backgroundColor: "rgba(0,0,0, 0.2)" },
              ]}
            >
              <Text style={styles.statText}>Defense</Text>
              <Text>{pokemon.defense}</Text>
            </View>
            <View
              style={[
                styles.statContainer,
                { backgroundColor: "rgba(0,0,0, 0.3)" },
              ]}
            >
              <Text style={styles.statText}>Speed</Text>
              <Text>{pokemon.speed}</Text>
            </View>
          </View>
          <View
            style={[styles.row, styles.movesContainer]}
            onLayout={(event) =>
              setMovesContainerSize({
                width: event.nativeEvent.layout.width,
                height: event.nativeEvent.layout.height,
              })
            }
          >
            {pokemon.moves.map((move) => {
              const width = movesContainerSize.width / 2 - MOVES_MARGIN * 2;
              const height = movesContainerSize.height * 0.5 - MOVES_MARGIN * 2;
              return (
                <View key={move.name} style={[styles.move, { width, height }]}>
                  <View style={styles.row}>
                    <Text style={{ color: "black", fontSize: 18 }}>
                      {move.name}
                    </Text>
                    <View style={{ flex: 1 }} />
                    <TypeComponent type={move.type} />
                  </View>
                  <View style={{ flex: 1 }} />
                  <View style={styles.row}>
                    <View style={styles.statContainer}>
                      <Text>Power</Text>
                      <Text>{move.power}</Text>
                    </View>
                    <View style={styles.statContainer}>
                      <Text>Speed</Text>
                      <Text>{move.speed}</Text>
                    </View>
                    <View style={styles.statContainer}>
                      <Text>PP</Text>
                      <Text>{move.maxPP}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    width: "100%",
    paddingVertical: 10,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
  details: {
    flex: 1,
    height: "100%",
    backgroundColor: "rgb(220,220,220)",
    borderRadius: 20,
    padding: 20,
    marginLeft: 10,
  },
  image: {
    width: 250,
    height: 250,
  },
  move: {
    margin: MOVES_MARGIN,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "rgb(250,250,250)",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
  },
  movesContainer: {
    flex: 1,
    flexWrap: "wrap",
    width: "100%",
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 22,
    marginVertical: 2,
  },
  statContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default PokemonPreviewModal;
