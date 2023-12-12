import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SectionList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SearchBar } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrganizationsScreen from "./OrganizationsScreen";
import EventsScreen from "./EventsScreen";
import EventProfileScreen from "./EventProfileScreen";
import OrganizationProfileScreen from "./OrganizationProfileScreen";
import FriendProfileScreen from "./FriendProfileScreen";

//Creating a native stack navigator for the explorescreen
const ExploreStack = createNativeStackNavigator();

//ExploreMain component takes the current navigationstack as a parameter
const ExploreMain = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orgSearchResults, setOrgSearchResults] = useState([]);
  const [eventSearchResults, setEventSearchResults] = useState([]);
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const [EventData, setEventData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url =
    "https://absolute-willing-salmon.ngrok-free.app/api/organization/all";

  //Fetch organizations data on component mount
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setOrgData(json.orgs))
      .catch((error) => console.log(error));
  }, []);

  //Fetch events data on component mount
  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/all")
      .then((response) => response.json())
      .then((json) => setEventData(json.events))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  //Fetch user data on component mount
  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/users/all")
      .then((response) => response.json())
      .then((json) => setUserData(json.users))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  //Perform search based on the given query entered by the user
  //Sets the list of filtered organizations that match the search within orgSearchResults
  const performSearch = (query) => {
    const searchTerms = query.toLowerCase().split(" ");

    //Filter organizations based on the search terms
    const filteredOrgs = orgData
      .filter((org) => {
        const orgName = org.name.toLowerCase();
        for (const term of searchTerms) {
          if (!orgName.includes(term)) {
            return false;
          }
        }
        return true;
      })
      .map((org) => ({
        name: org.name,
        id: org.id,
      }));

    setOrgSearchResults(filteredOrgs);

    //Filter events based on search terms
    //Sets matching events within eventSearchResults
    const filteredEvents = EventData.filter((event) => {
      const eventName = event.name.toLowerCase();
      for (const term of searchTerms) {
        if (!eventName.includes(term)) {
          return false;
        }
      }
      return true;
    }).map((event) => ({
      name: event.name,
      id: event.id,
    }));

    setEventSearchResults(filteredEvents);
    //Filters users based on search terms
    //Sets matching users within the userSearchResults
    const filteredUsers = userData
      .filter((user) => {
        const name = user.firstname + " " + user.lastname;
        for (const term of searchTerms) {
          if (!name.toLowerCase().includes(term)) {
            return false;
          }
        }
        return true;
      })
      .map((user) => ({
        name: user.firstname + " " + user.lastname,
        uid: user.user_id,
        netid: user.netid,
      }));

    setUserSearchResults(filteredUsers);
  };

  //Handle changes in the search input
  const handleSearchChange = (text) => {
    setSearchTerm(text);
    if (text.length > 2) performSearch(text);
  };

  const searchBarRef = useRef(null);

  //Handle button click to focus on search input
  const handleButtonClick = () => {
    searchBarRef.current && searchBarRef.current.focus();
  };

  //Section list item for organizations
  const SearchOrgItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("OrganizationProfileScreen", {
          organizationId: item.id,
        });
      }}
      style={styles.item}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  //Section list items for events
  const SearchEventItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("EventProfileScreen", { eventId: item.id });
      }}
      style={styles.item}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  //Section list items for users
  const SearchUserItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FriendProfileScreen", { user_uid: item.uid });
      }}
      style={styles.item}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  //Render component content after loading data
  if (!loading) {
    return (
      <View>
        <SearchBar
          ref={searchBarRef}
          placeholder="Search"
          value={searchTerm}
          platform="ios"
          onChangeText={handleSearchChange}
        />

        {searchTerm !== "" && searchTerm.length > 2 && (
          <SectionList
            style={styles.sectionList}
            renderSectionHeader={({ section: { title } }) => (
              <Text
                style={{
                  fontWeight: "bold",
                  padding: 2,
                  color: "#FF392E",
                  paddingLeft: 10,
                  backgroundColor: "#E6E6E6",
                }}
              >
                {title}
              </Text>
            )}
            sections={[
              {
                title: "Organizations",
                data: orgSearchResults.splice(0, 5),
                renderItem: ({ item }) => <SearchOrgItem item={item} />,
              },
              {
                title: "Events",
                data: eventSearchResults.splice(0, 5),
                renderItem: ({ item }) => <SearchEventItem item={item} />,
              },
              {
                title: "Users",
                data: userSearchResults.splice(0, 5),
                renderItem: ({ item }) => <SearchUserItem item={item} />,
              },
            ]}
          />
        )}

        <TouchableOpacity
          className="events-button"
          style={[styles.event_button, { marginBottom: 12 }]}
          onPress={() => {
            navigation.navigate("Events");
          }}
        >
          <Text style={styles.eventText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="organizations-button"
          style={[styles.organizations_button]}
          onPress={() => {
            navigation.navigate("Organizations");
          }}
        >
          <Text style={styles.organizationsText}>Organizations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.event_button]}
          onPress={handleButtonClick}
        >
          <Text style={styles.eventText}>Users</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

//ExploreScreen component
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
        name="EventProfileScreen"
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
      <ExploreStack.Screen
        name="FriendProfileScreen"
        component={FriendProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </ExploreStack.Navigator>
  );
};

export default ExploreScreen;

//Styles for the component
const styles = StyleSheet.create({
  event_button: {
    backgroundColor: "#FF392E",
    width: "90%",
    height: "28%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: "2.5%",
  },
  organizations_button: {
    backgroundColor: "white",
    width: "90%",
    height: "28%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    alignSelf: "center",
  },
  eventText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  organizationsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF392E",
  },
  buttonWrapper: {
    flexDirection: "column",
    backgroundColor: "#E6E6E6",
  },
  button_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    width: "100%",
    marginTop: "30%",
  },
  sectionList: {
    width: "100%",
    height: "200%",
    length: 100,
    backgroundColor: "white",
  },
  item: {
    borderBottomWidth: 1,
    borderColor: "red",
    borderTopColor: "gray",
    textAlign: "left",
    fontSize: 20,
    paddingVertical: 8,
    paddingLeft: 10,
  },
});
