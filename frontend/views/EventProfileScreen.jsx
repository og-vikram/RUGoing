import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";

const EventProfileScreen = ({ route }) => {
  useEffect(() => {}, []);

  return (
    <View className="container" style={styles.container}>
      <View className="image-container">
        <Image source={require("../assets/icon.png")} style={styles.image} />
      </View>
      <View className="details-container">
        <Text>{route.params.selectedProps.title}</Text>
        <Text>{route.params.selectedProps.host}</Text>
        <Text>{route.params.selectedProps.category}</Text>
        <Text>Event Location</Text>
        <Text>Event time/date</Text>
        <Button>Attending</Button>
      </View>
    </View>
  );
};

export default EventProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
});
