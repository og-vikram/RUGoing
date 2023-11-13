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
import Fuse from "fuse.js";

const ExploreStack = createNativeStackNavigator();

const ExploreMain = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orgSearchResults, setOrgSearchResults] = useState([]);
  const [eventSearchResults, setEventSearchResults] = useState([]);

  const fuseOptions = {
    keys: ["name"],
    threshold: 0.25,
    //use threshold to tune how sensitive search is (lower is more precise)
  };

  const url =
    "https://absolute-willing-salmon.ngrok-free.app/api/organization/all";
  const [orgData, setOrgData] = useState([]);
  const [EventData, setEventData] = useState([]);
  const [userData, setUserData] = useState([]);
  //lol ^

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url, {
      // headers: new Headers({
      //   "ngrok-skip-browser-warning": "true",
      // }),
    })
      .then((response) => response.json())
      .then((json) =>
        setOrgData(json.map(({ org_id, name }) => ({ org_id, name })))
      )
      .catch((error) => console.log(error));

    fetch("https://absolute-willing-salmon.ngrok-free.app/events/all", {
      // headers: new Headers({
      //   "ngrok-skip-browser-warning": "true",
      // }),
    })
      .then((response) => response.json())
      .then((json) =>
        setEventData(json.map(({ event_id, name }) => ({ event_id, name })))
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const performSearch = (query) => {
    const fuse = new Fuse(orgData, fuseOptions);
    const result = fuse.search(query);
    setOrgSearchResults(
      result.map(({ item }) => ({ name: item.name, id: item.id }))
    );
    // console.log('orgs', orgSearchResults)

    const newfuse = new Fuse(EventData, fuseOptions);
    newresult = newfuse.search(query);
    setEventSearchResults(
      newresult.map(({ item }) => ({ name: item.name, fid: item.fid }))
    );
    // console.log('events', eventSearchResults)
  };

  const handleSearchChange = (text) => {
    setSearchTerm(text);
    performSearch(text);
  };

  const searchBarRef = useRef(null);

  const handleButtonClick = () => {
    // Programmatically focus the SearchBar when the button is clicked
    searchBarRef.current && searchBarRef.current.focus();
  };

  const SearchOrgItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("OrganizationProfileScreen", {
          organizationId: item.org_id,
        });
      }}
      style={styles.item}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const SearchEventItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("event", { eventId: item.event_id })}
      style={styles.item}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  if (!loading) {
    return (
      <View>
        <SearchBar
          ref={searchBarRef}
          placeholder="Search"
          platform="ios"
          onChangeText={handleSearchChange}
        />

        {searchTerm !== "" && (
          <SectionList
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ fontWeight: "bold", padding: 2 }}>{title}</Text>
            )}
            style={styles.sectionList}
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
    // marginBottom: 16,
    marginTop: "30%",
  },
  sectionList: {
    marginTop: 16,
    width: "100%",
    paddingBottom: 2,
  },
  item: {
    borderBottomWidth: 1,
    //borderBottomColor: 'gray',
    borderColor: "gray",
    borderTopColor: "gray",
    textAlign: "left",
    fontSize: 20,
    paddingVertical: 8,
  },
});
