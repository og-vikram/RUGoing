import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrganizationsScreen from "./OrganizationsScreen";
import EventsScreen from "./EventsScreen";
import EventProfileScreen from "./EventProfileScreen";
import OrganizationProfileScreen from "./OrganizationProfileScreen";

const ExploreStack = createNativeStackNavigator();

const ExploreMain = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        platform="ios"
        onChangeText={updateSearch}
      />
      <View className="buttons-container" style={styles.button_container}>
        <TouchableOpacity
          className="events-button"
          style={styles.event_button}
          onPress={() => {
            navigation.navigate("Events");
          }}
        >
          <Text>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="organizations-button"
          style={styles.organizations_button}
          onPress={() => {
            navigation.navigate("Organizations");
          }}
        >
          <Text>Organizations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ExploreScreen = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="Explore-Main"
        component={ExploreMain}
        options={{
          headerShown: false,
        }}
      />
      <ExploreStack.Screen
        name="Organizations"
        component={OrganizationsScreen}
        options={{
          headerShown: false,
        }}
      />
      <ExploreStack.Screen
        name="Events"
        component={EventsScreen}
        options={{
          headerShown: false,
        }}
      />
      <ExploreStack.Screen
        name="Event Profile"
        component={EventProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ExploreStack.Screen
        name="OrganizationProfileScreen"
        component={OrganizationProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </ExploreStack.Navigator>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  event_button: {
    backgroundColor: "#123120",
    width: "50%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  organizations_button: {
    backgroundColor: "#BA3B46",
    width: "50%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  button_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
