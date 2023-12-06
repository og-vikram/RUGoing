import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const EventsScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "https://absolute-willing-salmon.ngrok-free.app/api/event/all";
  useEffect(() => {
    fetch(url, {
      // headers: new Headers({
      //   "ngrok-skip-browser-warning": "true",
      // }),
    })
      .then((response) => response.json())
      .then((json) => setData(json.events))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (!loading) {
    return (
      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Event Profile", {
                eventId: item.id,
              });
            }}
          >
            <EventCard
              title={item.name}
              description={item.description}
              category="test_category"
              image_id={
                "https://se-images.campuslabs.com/clink/images/" + item.image_id
              }
              eventId={item.id}
            />
          </TouchableOpacity>
        )}
        key={(item) => item.id}
      />
      // <EventCard
      //   host="somedude"
      //   title="Come join us for coffee!"
      //   category="hello"
      //   eventid="1"
      // />
    );
  }

  return <ActivityIndicator size="large" color="#000000" />;
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF392E",
  },
  eventCard: {
    color: "red",
  },
});
