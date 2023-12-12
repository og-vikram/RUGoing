import { StyleSheet, Text, View, ScrollView, TouchableOpacity, } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import EventProfileScreen from "./EventProfileScreen";
import OrganizationProfileScreen from "./OrganizationProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/**
 * HomeScreen is a React component representing the home screen
 * of the application. It may receive navigation props for user
 * navigation within the app.
 *
 * @param {object} navigation - Navigation prop for navigating within the app.
 */
const HomeScreen = ({ navigation }) => {

  const [recommendedPerkedEvents, setRecommendedPerkedEvents] = useState([]);
  const [recommendedThemedEvents, setRecommendedThemedEvents] = useState([]);
  const [recommendedCategorizedEvents, setRecommendedCategorizedEvents] = useState([]);
  const [recommendedCategorizedOrgs, setRecommendedCategorizedOrgs] = useState([]);
  const [friendsEvents, setFriendsEvents] = useState([]);
  const [friendsOrgs, setFriendsOrgs] = useState([]);

  const uid = auth.currentUser.uid;

  /**
   * useEffect hook fetches and sets the recommended events based on user's
   * perk preferences. It makes a GET request to the server endpoint that
   * retrieves events tailored to the user's preferences.
   */
  useEffect(() => {
    // Fetch recommended events based on user's perk preferences
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/events/perk/preference/${uid}`)
      .then((response) => response.json())
      .then((json) => setRecommendedPerkedEvents(json.events))
      .catch((error) => console.log(error));
  }, []);

  /**
   * useEffect hook fetches and sets the recommended events based on user's
   * theme preferences. It makes a GET request to the server endpoint that
   * retrieves events tailored to the user's theme preferences.
   */
  useEffect(() => {
    // Fetch recommended events based on user's theme preferences
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/events/theme/preference/${uid}`)
      .then((response) => response.json())
      .then((json) => setRecommendedThemedEvents(json.events))
      .catch((error) => console.log(error));
  }, []);

  /**
   * useEffect hook fetches and sets the recommended events based on user's
   * category preferences. It makes a GET request to the server endpoint that
   * retrieves events tailored to the user's category preferences.
   */
  useEffect(() => {
    // Fetch recommended events based on user's category preferences
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/events/category/preference/${uid}`)
      .then((response) => response.json())
      .then((json) => setRecommendedCategorizedEvents(json.events))
      .catch((error) => console.log(error));
  }, []);

  /**
   * useEffect hook fetches and sets the recommended organizations based on user's
   * category preferences. It makes a GET request to the server endpoint that
   * retrieves organizations tailored to the user's category preferences.
   */
  useEffect(() => {
    // Fetch recommended organizations based on user's category preferences
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/organization/category/preference/${uid}`)
      .then((response) => response.json())
      .then((json) => setRecommendedCategorizedOrgs(json.orgs))
      .catch((error) => console.log(error));
  }, []);

  /**
   * useEffect hook fetches and sets the events attended by user's followees (friends).
   * It makes a GET request to the server endpoint that retrieves events attended by
   * the users the current user is following.
   */
  useEffect(() => {
    // Fetch events attended by user's followees (friends)
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/event/attending/followees/${uid}`)
      .then((response) => response.json())
      .then((json) => setFriendsEvents(json.events))
      .catch((error) => console.log(error));
  }, []);

  /**
   * useEffect hook fetches and sets the organizations joined by user's followees (friends).
   * It makes a GET request to the server endpoint that retrieves organizations joined by
   * the users the current user is following.
   */
  useEffect(() => {
    // Fetch organizations joined by user's followees (friends)
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/followees/${uid}`)
      .then((response) => response.json())
      .then((json) => setFriendsOrgs(json.orgs))
      .catch((error) => console.log(error));
  }, []);

  return (
    <ScrollView>
      <View style={styles.eventsCard}>
        <Text style={styles.eventHeader}>
          {" "}
          Events with Perks You May Like...{" "}
        </Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              marginTop: "%",
              justifyContent: "center",
            }}
          >
            {recommendedPerkedEvents.map((event) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EventProfileScreen", {
                    eventId: event.id,
                  });
                }}
                key={event.id}
              >
                <View key={event.id} style={styles.scrollViewMiniCards}>
                  <Text
                    style={{
                      color: "#FF392E",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {event.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.alternateEventsCard}>
        <Text style={styles.alternateEventHeader}>
          {" "}
          Events with Themes You May Like...{" "}
        </Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              marginTop: "%",
            }}
          >
            {recommendedThemedEvents.map((event) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EventProfileScreen", {
                    eventId: event.id,
                  });
                }}
                key={event.id}
              >
                <View key={event.id} style={styles.alternateScrollViewMiniCards}>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                  >
                    {event.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.eventsCard}>
        <Text style={styles.eventHeader}>
          {" "}
          Events with Categories You May Like...{" "}
        </Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              marginTop: "%",
            }}
          >
            {recommendedCategorizedEvents.map((event) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("OrganizationProfileScreen", {
                    eventId: event.id,
                  });
                }}
                key={event.id}
              >
                <View key={event.id} style={styles.scrollViewMiniCards}>
                  <Text
                    style={{
                      color: "#FF392E",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {event.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.alternateEventsCard}>
        <Text style={styles.alternateEventHeader}>
          {" "}
          Organizations with Categories You May Like ...{" "}
        </Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.orgsInfo}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              marginTop: "-3%",
            }}
          >
            {recommendedCategorizedOrgs.map((org) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("OrganizationProfileScreen", {
                    organizationId: org.id,
                  });
                }}
                key={org.id}
              >
                <View key={org.id} style={styles.alternateScrollViewMiniCards}>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                  >
                    {org.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.eventsCard}>
        <Text style={styles.eventHeader}>
          {" "}
          Events Your Friends Are Attending ...{" "}
        </Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.orgsInfo}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              marginTop: "-3%",
            }}
          >
            {friendsEvents.map((event) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EventProfileScreen", {
                    eventId: event.event_id,
                  });
                }}
                key={event.event_id}
              >
                <View key={event.event_id} style={styles.orgsMiniCards1}>
                  <Text
                    style={{
                      color: "#FF392E",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {event.event_name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.alternateEventsCard}>
        <Text style={styles.alternateEventHeader}>
          {" "}
          Organizations Your Friends Joined ...{" "}
        </Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.orgsInfo}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              marginTop: "-3%",
            }}
          >
            {friendsOrgs.map((org) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("OrganizationProfileScreen", {
                    organizationId: org.org_id,
                  });
                }}
                key={org.org_id}
              >
                <View key={org.org_id} style={styles.orgsMiniCards2}>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                  >
                    {org.org_name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  eventsCard: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    alignSelf: "center",
    height: 300,
    width: "95%",
    justifyContent: "center",
    marginTop: "2.5%",
  },
  alternateEventsCard: {
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    height: 300,
    width: "95%",
    justifyContent: "center",
    marginTop: "2.5%",
  },
  eventHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: "3%",
  },
  alternateEventHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF392E",
    textAlign: "center",
    marginTop: "3%",
  },
  scrollViewMiniCards: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  alternateScrollViewMiniCards: {
    width: 200,
    height: 200,
    backgroundColor: "#FF392E",
    margin: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  orgsMiniCards1: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    margin: 10,
    marginTop: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  orgsMiniCards2: {
    width: 200,
    height: 200,
    backgroundColor: "#FF392E",
    margin: 10,
    marginTop: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

/**
 * HomeScreenStack is a navigation stack component representing the
 * stack of screens related to the home functionality in the application.
 * It may include navigation routes, headers, and other components needed
 * for the home screen experience.
 */
export const HomeScreenStack = () => {
  
  const Stack = createNativeStackNavigator();
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EventProfileScreen"
        component={EventProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrganizationProfileScreen"
        component={OrganizationProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
