import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import StatusEffect from "../models/StatusEffect";

interface StatusBarProps {
  name: string;
  hp: number;
  maxHP: number;
  statusEffect?: StatusEffect;
  height?: number | string;
}

const StatusBar: React.FC<StatusBarProps> = ({
  name,
  hp,
  maxHP,
  height = 20,
  statusEffect,
}) => {
  const hpProgress = useSharedValue(hp);

  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(hpProgress.value, [0, maxHP], [0, 100]);

    return {
      width: width + "%",
    };
  });

  useEffect(() => {
    hpProgress.value = withTiming(hp);
  }, [hp]);

  return (
    <>
      <View style={styles.row}>
        <View
          style={{ padding: 4, borderRadius: 20, backgroundColor: "black" }}
        >
          <Text style={{ flex: 1, color: "white" }}>{name}</Text>
        </View>
        <View style={{ flex: 1 }} />
        {statusEffect && (
          <View
            style={{ padding: 4, backgroundColor: "red", borderRadius: 10 }}
          >
            <Text style={{ color: "white" }}>{statusEffect.type}</Text>
          </View>
        )}
      </View>
      <View style={[styles.container, { height }]}>
        <Animated.View style={[styles.hpBar, animatedStyle]} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginTop: 4,
  },
  hpBar: {
    backgroundColor: "green",
    height: "100%",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default StatusBar;
