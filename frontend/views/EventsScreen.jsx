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
  const [loading2, setLoading2] = useState(true);
  const [categories, setCategories] = useState([]);
  const [themeLoading, setThemeLoading] = useState(true);
  const [perkLoading, setPerkLoading] = useState(true);
  const [perks, setPerks] = useState([]);
  const [themes, setThemes] = useState([]);
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

  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/event/categories/all"
    )
      .then((response) => response.json())
      .then((json) => setCategories(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading2(false));
  }, []);

  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/themes/all")
      .then((response) => response.json())
      .then((json) => setThemes(json))
      .catch((error) => console.log(error))
      .finally(() => setThemeLoading(false));
  }, []);

  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/perks/all")
      .then((response) => response.json())
      .then((json) => setPerks(json))
      .catch((error) => console.log(error))
      .finally(() => setPerkLoading(false));
  }, []);

  const returnCategories = (event_id) => {
    let item_categories = [];
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].event_id == event_id) {
        item_categories.push(categories[i].category_names);
      }
    }
    return item_categories;
  };

  const returnThemes = (event_id) => {
    let item_themes = [];
    for (let i = 0; i < themes.length; i++) {
      if (themes[i].event_id == event_id) {
        item_themes.push(themes[i].theme_names);
      }
    }
    return item_themes;
  };

  const returnPerks = (event_id) => {
    let item_perks = [];
    for (let i = 0; i < perks.length; i++) {
      if (perks[i].event_id == event_id) {
        item_perks.push(perks[i].perk_names);
      }
    }
    return item_perks;
  };

  if (!loading && !loading2 && !themeLoading && !perkLoading) {
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
              categories={returnCategories(item.id)}
              themes={returnThemes(item.id)}
              perks={returnPerks(item.id)}
              image_id={
                "https://se-images.campuslabs.com/clink/images/" + item.image_id
              }
              eventId={item.id}
            />
          </TouchableOpacity>
        )}
        key={(item) => item.id}
      />
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
