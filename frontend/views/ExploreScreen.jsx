import { StyleSheet, Text, TouchableOpacity, View, Switch, TextInput} from "react-native";
import React, { useState, useRef } from "react";
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

  const searchBarRef = useRef(null);

  const handleButtonClick = () => {
    // Programmatically focus the SearchBar when the button is clicked
    searchBarRef.current && searchBarRef.current.focus();
  };


  return (
    <View>
      <SearchBar
        ref={searchBarRef}
        placeholder="Type Here..."
        platform="ios"
        onChangeText={updateSearch}
      />
      <TouchableOpacity
        className="events-button"
        style={[styles.event_button,{marginBottom: 12,}]}
        onPress={() => {
          navigation.navigate("Events");
        }}
      >
        <Text style = {styles.eventText}>Events</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="organizations-button"
        style={[styles.organizations_button ]}
        onPress={() => {
          navigation.navigate("Organizations");
        }}
      >
        <Text style = {styles.organizationsText}>Organizations</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.event_button ]}
        onPress={handleButtonClick}
      >
        <Text style = {styles.eventText}>Search Users</Text>
      </TouchableOpacity>
        
      
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
    backgroundColor: "#FF392E",
    width: "90%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 12,
  },
  organizations_button: {
    backgroundColor: "white",
    width: "90%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    alignSelf: "center",
  },
  eventText: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'white',
  },
  organizationsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#FF392E',
  },
  buttonWrapper: {
    flexDirection: "row",
    backgroundColor: "#E6E6E6", 
  },
});
