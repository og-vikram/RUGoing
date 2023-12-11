import * as React from "react";
import { Text } from "@rneui/base";
import { View, StyleSheet } from "react-native";

export default (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fonts}>{props.category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25px",
    height: 35,
    width: "auto",
    backgroundColor: "#f1f1f1",
    resizeMode: "contain",
    padding: 8,
  },
  fonts: {
    fontFamily: "",
    fontSize: 13,
    color: "#FF392E",
  },
});
