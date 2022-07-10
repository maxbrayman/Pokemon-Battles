import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface BattleMessageProps {
  message: string | null;
}

const BattleMessage: React.FC<BattleMessageProps> = ({ message }) => {
  const animation = useSharedValue(0);
  const [messageWidth, setMessageWidth] = useState(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animation.value,
    };
  });

  useEffect(() => {
    animation.value = withTiming(message ? 1 : 0);
  }, [message]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: -messageWidth / 2 }] },
        animatedStyle,
      ]}
      onLayout={(event) => setMessageWidth(event.nativeEvent.layout.width)}
    >
      <Text style={{ color: "white" }}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    maxWidth: 250,
    borderRadius: 10,
    backgroundColor: "black",
    top: 5,
    left: "50%",
    position: "absolute",
    zIndex: 1,
  },
});

export default BattleMessage;
