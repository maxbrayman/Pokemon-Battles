import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import MainStackParams from "../navigation/paramLists/MainStack";
import allPokemon from "../data/availablePokemon";
import PokemonClass, { clonePokemon } from "../models/Pokemon";
import PokemonPreview from "../components/PokemonPreview";
import PokemonPreviewModal from "../components/PokemonPreviewModal";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSocket } from "../providers/SocketProvider";
import { useGameCode } from "../providers/CodeProvider";

type PokemonSelectScreenProps = NativeStackScreenProps<
  MainStackParams,
  "PokemonSelectScreen"
>;

type LayoutSize = {
  width: number;
  height: number;
};

const LIST_PADDING = 10;
const LIST_ITEM_MARGIN = 2;
const AVAILABLE_LIST_ITEMS_PER_ROW = 3;

const PokemonSelectScreen: React.FC<PokemonSelectScreenProps> = ({
  navigation,
  route,
}) => {
  const socket = useSocket();
  const { code } = useGameCode();
  const [teamIsReady, setTeamIsReady] = useState(false);
  const [opponentTeam, setOpponentTeam] = useState<PokemonClass[] | null>(null);
  const [gameIsReady, setGameIsReady] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonClass | null>(
    null
  );
  const [team, setTeam] = useState<PokemonClass[]>([]);
  const [availableListSize, setAvailableListSize] = useState<LayoutSize>({
    width: 0,
    height: 0,
  });
  const [teamListSize, setTeamListSize] = useState<LayoutSize>({
    width: 0,
    height: 0,
  });
  const [removing, setRemoving] = useState(false);
  const [currentTeamID, setCurrentTeamID] = useState(0);

  const readyAnimation = useSharedValue(1);

  const availableListAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: availableListSize.width / 2 },
        { scaleX: readyAnimation.value },
        { translateX: -availableListSize.width / 2 },
      ],
    };
  });

  const teamListAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(readyAnimation.value, [0, 1], [100, 29]);
    return {
      width: width + "%",
    };
  });

  const onPressPreview = (pokemon: PokemonClass) => {
    if (teamIsReady) return;
    setSelectedPokemon(pokemon);
    setPreviewModalVisible(true);
  };

  const onDismiss = () => {
    setPreviewModalVisible(false);
    setRemoving(false);
    setSelectedPokemon(null);
  };

  const onSelectPokemon = (pokemon: PokemonClass) => {
    onDismiss();
    if (team.length === 6) return;
    const teamClone = [...team];
    if (teamClone.find((p) => p.id === pokemon.id)) return;
    const pokemonClone = clonePokemon(pokemon);
    pokemonClone.teamID = currentTeamID.toString();
    setCurrentTeamID((prev) => prev + 1);
    teamClone.push(pokemonClone);
    setTeam(teamClone);
  };

  const onRemovePokemon = (teamID: string | undefined) => {
    onDismiss();
    if (!teamID) return;
    const teamClone = [...team];
    const index = teamClone.findIndex((p) => p.teamID === teamID);
    if (index > -1) teamClone.splice(index, 1);
    setTeam(teamClone);
  };

  const handleSetTeam = () => {
    const prev = teamIsReady;
    socket?.emit("setTeam", code, prev ? [] : team);
    setTeamIsReady(!prev);
  };

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (gameIsReady) {
      interval = setInterval(() => {
        setCountdownValue((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameIsReady]);

  useEffect(() => {
    if (countdownValue === 0 && team && opponentTeam) {
      navigation.replace("BattleScreen", { userTeam: team, opponentTeam });
    }
  }, [countdownValue, team, opponentTeam]);

  useEffect(() => {
    readyAnimation.value = withTiming(teamIsReady ? 0 : 1);
  }, [teamIsReady]);

  useEffect(() => {
    socket?.on("teamsAreSet", () => setGameIsReady(true));
    socket?.on("opponentTeamSet", (team) => {
      setOpponentTeam(team);
    });

    return () => {
      socket?.removeListener("teamsAreSet");
      socket?.removeListener("opponentTeamSet");
    };
  }, [socket]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.teamContainer, teamListAnimatedStyle]}>
          {!teamIsReady && <Text style={styles.listHeader}>My Team</Text>}
          {teamIsReady && (
            <Text style={styles.listHeader}>
              {gameIsReady
                ? `Staring in - ${countdownValue}`
                : "Waiting for opponent..."}
            </Text>
          )}
          <FlatList
            onLayout={(event) =>
              setTeamListSize({
                width: event.nativeEvent.layout.width - LIST_PADDING * 2,
                height: event.nativeEvent.layout.height - LIST_PADDING * 2,
              })
            }
            contentContainerStyle={{ alignItems: "center" }}
            data={team}
            keyExtractor={(item) => item.teamID!}
            renderItem={({ item }) => {
              const width = teamListSize.width;
              const height = teamListSize.height / 6 - LIST_ITEM_MARGIN;
              return (
                <PokemonPreview
                  width={width}
                  height={height}
                  pokemon={item}
                  inGame={false}
                  margin={LIST_ITEM_MARGIN}
                  onPress={(pokemon) => {
                    setRemoving(true);
                    onPressPreview(pokemon);
                  }}
                />
              );
            }}
          />
          <Pressable
            onPress={handleSetTeam}
            disabled={team.length !== 6 || (teamIsReady && gameIsReady)}
            style={[
              styles.battleButton,
              {
                opacity:
                  team.length !== 6 || (teamIsReady && gameIsReady) ? 0.6 : 1,
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 17 }}>
              {teamIsReady ? "Change Team" : "Battle!"}
            </Text>
          </Pressable>
        </Animated.View>
        <View style={{ width: "2%" }} />
        <Animated.View
          style={[styles.availableListContainer, availableListAnimatedStyle]}
          onLayout={(event) =>
            setAvailableListSize({
              width: event.nativeEvent.layout.width - LIST_PADDING * 2,
              height: event.nativeEvent.layout.height - LIST_PADDING * 2,
            })
          }
        >
          <Text style={styles.listHeader}>Select Your Team</Text>
          <FlatList
            data={allPokemon}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const width =
                availableListSize.width / AVAILABLE_LIST_ITEMS_PER_ROW -
                LIST_ITEM_MARGIN * 2;
              const height =
                availableListSize.height * 0.26 - LIST_ITEM_MARGIN * 2;

              const pokemonIsSelected = team.some((p) => p.id === item.id);
              return (
                <PokemonPreview
                  width={width}
                  height={height}
                  pokemon={item}
                  margin={LIST_ITEM_MARGIN}
                  onPress={(pokemon) => {
                    if (!pokemonIsSelected) onPressPreview(pokemon);
                  }}
                  inGame={false}
                  style={pokemonIsSelected ? { opacity: 0.5 } : null}
                />
              );
            }}
          />
        </Animated.View>
      </SafeAreaView>
      <PokemonPreviewModal
        isVisible={previewModalVisible}
        pokemon={selectedPokemon}
        removable={removing}
        onDismiss={() => {
          setPreviewModalVisible(false);
          setRemoving(false);
          setSelectedPokemon(null);
        }}
        onSelect={onSelectPokemon}
        onRemove={onRemovePokemon}
      />
    </>
  );
};

const styles = StyleSheet.create({
  availableListContainer: {
    width: "69%",
    borderRadius: 20,
    marginTop: 20,
    padding: 10,
    backgroundColor: "rgb(227,227,227)",
  },
  battleButton: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgb(215,15,15)",
    paddingVertical: 5,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  listHeader: {
    alignSelf: "center",
    fontSize: 26,
    textDecorationLine: "underline",
  },
  pokemonPreview: {
    margin: LIST_ITEM_MARGIN,
    backgroundColor: "red",
  },
  teamContainer: {
    marginTop: 20,
    padding: 10,
    width: "29%",
    borderRadius: 20,
    backgroundColor: "rgb(227,227,227)",
  },
});

export default PokemonSelectScreen;
