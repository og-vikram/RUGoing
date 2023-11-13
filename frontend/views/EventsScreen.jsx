import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import EventCard from "../components/EventCard";

const EventsScreen = () => {
  return (
    <ScrollView style = {styles.container}>
      <EventCard title="Event 1" host="Host Name" category="Category" />
      <EventCard title="Event 2" host="Host Name" category="Category" />
      <EventCard title="Event 3" host="Host Name" category="Category" />
      <EventCard title="Event 4" host="Host Name" category="Category" />
      <EventCard title="Event 5" host="Host Name" category="Category" />
      <EventCard title="Event 6" host="Host Name" category="Category" />
    </ScrollView>
  );
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
