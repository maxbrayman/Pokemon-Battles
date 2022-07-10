import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
  Text,
} from "react-native";

interface MenuButtonProps {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  subLabel?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  label,
  onPress,
  style,
  subLabel,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      {subLabel && <Text>{subLabel}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    backgroundColor: "white",
  },
  label: {
    fontSize: 28,
    marginBottom: 4,
  },
});

export default MenuButton;
