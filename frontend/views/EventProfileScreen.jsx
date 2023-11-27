import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";

const EventProfileScreen = ({ route }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // fetch(
    //   `https://absolute-willing-salmon.ngrok-free.app/api/event/${route.params.selectedProps.eventId}`,
    //   {
    //     method: "GET",
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((json) => setData(json.event))
    //   .catch((error) => console.log(error));
    // console.log(event_id);
  }, []);

  return (
    <View className="container" style={styles.container}>
      <View className="image-container">
        <Image source={require("../assets/icon.png")} style={styles.image} />
      </View>
      <View className="details-container">
        <View className="basiceventinfo" style={styles.basicInfo}>
          <Text style={styles.header}>{route.params.selectedProps.title}</Text>
          <Text>{route.params.selectedProps.host}</Text>
          <Text>{route.params.selectedProps.category}</Text>
        </View>

        <View className="location" style={styles.location}>
          <Text style={styles.header}>Location</Text>
          <Text>Event Location</Text>
        </View>

        <View className="location" style={styles.location}>
          <Text style={styles.header}>Date And Time</Text>
          <Text>Event time/date</Text>
        </View>

        <View style={styles.attendingContainer}>
          <TouchableOpacity style={styles.attendingButton} onPress={() => {}}>
            <Text style={styles.attendingButtonText}>Attending</Text>
          </TouchableOpacity>
        </View>
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
  attendingButton: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: "1%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  attendingButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  attendingContainer: {
    alignItems: "center",
  },
  basicInfo: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    margin: 15,
    marginTop: "5%",
  },
  location: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    margin: 15,
    marginTop: "1%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
