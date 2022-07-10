import { View, StyleSheet, Text } from "react-native";
import Type from "../models/Type";

interface TypeComponentProps {
  type: Type;
}

const TypeComponent: React.FC<TypeComponentProps> = ({ type }) => {
  return (
    <View style={[styles.container, { backgroundColor: type.color }]}>
      <Text style={styles.text}>{type.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

export default TypeComponent;
