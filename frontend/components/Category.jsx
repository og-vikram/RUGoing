import * as React from "react";
import { Card, Text } from "@rneui/base";
import { View, StyleSheet } from "react-native";

export default (props) => {
  return (
    // <Card
    //   containerStyle={{
    //     borderRadius: 25,
    //     shadowOpacity: 0,
    //     height: 25,
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    //   wrapperStyle={{}}
    // >
    <View style={styles.container}>
      <Text style={styles.fonts}>{props.category}</Text>
    </View>
    // </Card>
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
  },
});
