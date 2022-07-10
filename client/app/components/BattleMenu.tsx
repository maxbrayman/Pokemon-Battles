import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Alert } from "react-native";
import Move from "../models/Moves";
import PokemonClass from "../models/Pokemon";
import { StatusType } from "../models/StatusEffect";
import MenuButton from "./MenuButton";
import PokeballSpinner from "./PokeballSpinner";
import SwapPokemonModal from "./SwapPokemonModal";

const { height } = Dimensions.get("window");
const MENU_HEIGHT = height * 0.3;

interface BattleMenuProps {
  activePokemon: PokemonClass | null | undefined;
  team: PokemonClass[];
  onSelectMove: (move: Move) => void;
  onSwap: (teamID: string | undefined) => void;
  hideOptions?: boolean;
}

const BattleMenu: React.FC<BattleMenuProps> = ({
  activePokemon,
  team,
  onSelectMove,
  onSwap,
  hideOptions,
}) => {
  const [showMoves, setShowMoves] = useState(false);
  const [swapModalVisible, setSwapModalVisible] = useState(false);

  const pokemonFainted =
    activePokemon?.statusEffect?.type === StatusType.Fainted;

  if (hideOptions)
    return (
      <>
        <View style={styles.container}>
          <PokeballSpinner isVisible={hideOptions} />
        </View>
        <SwapPokemonModal
          isVisible={swapModalVisible || pokemonFainted}
          mustChooseNewPokemon={pokemonFainted}
          onDismiss={() => setSwapModalVisible(false)}
          onSelectPokemon={(pokemon) => {
            if (pokemon.teamID === activePokemon?.teamID) return;
            onSwap(pokemon.teamID);
            setSwapModalVisible(false);
          }}
          team={team}
        />
      </>
    );

  return (
    <>
      <View style={styles.container}>
        {showMoves && (
          <Ionicons
            name="chevron-back"
            size={30}
            style={styles.chevron}
            onPress={() => setShowMoves(false)}
          />
        )}
        {!showMoves ? (
          <>
            <MenuButton label="Fight" onPress={() => setShowMoves(true)} />
            <View style={{ width: 20 }} />
            <MenuButton
              label="Swap"
              onPress={() => {
                setSwapModalVisible(true);
              }}
            />
          </>
        ) : (
          <View style={{ width: "90%", alignItems: "center" }}>
            <ScrollView
              horizontal
              bounces={false}
              contentContainerStyle={{ padding: 10 }}
            >
              {activePokemon?.moves.map((move) => {
                const unavailable = move.currentPP === 0;
                return (
                  <MenuButton
                    label={move.name}
                    key={move.name}
                    subLabel={`PP: ${move.currentPP}/${move.maxPP}`}
                    onPress={() => {
                      if (unavailable)
                        Alert.alert(
                          "Move unavailable",
                          `${move.name} can no longer be used`
                        );
                      else {
                        onSelectMove(move);
                        setShowMoves(false);
                      }
                    }}
                    style={{ marginRight: 5, opacity: unavailable ? 0.6 : 1 }}
                  />
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
      <SwapPokemonModal
        isVisible={swapModalVisible || pokemonFainted}
        mustChooseNewPokemon={pokemonFainted}
        onDismiss={() => setSwapModalVisible(false)}
        onSelectPokemon={(pokemon) => {
          if (pokemon.teamID === activePokemon?.teamID) return;
          onSwap(pokemon.teamID);
          setSwapModalVisible(false);
        }}
        team={team}
      />
    </>
  );
};

const styles = StyleSheet.create({
  chevron: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  container: {
    width: "100%",
    backgroundColor: "lightgrey",
    paddingBottom: 20,
    height: MENU_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default BattleMenu;
