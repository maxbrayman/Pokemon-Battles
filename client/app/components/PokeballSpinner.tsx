import { useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface PokeballSpinnerProps {
  isVisible: boolean;
  size?: number;
}

const PokeballSpinner: React.FC<PokeballSpinnerProps> = ({
  isVisible,
  size = 100,
}) => {
  const animation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = animation.value + "deg";
    return {
      transform: [{ rotate }],
    };
  });

  useEffect(() => {
    animation.value = withRepeat(
      withTiming(360, { duration: 500, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  if (!isVisible) return null;

  return (
    <Animated.View style={animatedStyle}>
      <Image
        source={require("../../assets/pokeball.png")}
        style={{ width: size, height: size }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});

export default PokeballSpinner;
