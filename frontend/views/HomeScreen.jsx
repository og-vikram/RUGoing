import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { useNavigation } from "@react-navigation/native";
import EventProfileScreen from "./EventProfileScreen";
import OrganizationProfileScreen from "./OrganizationProfileScreen";

const HomeScreen = ({ navigation }) => {
  const [recommendedPerkedEvents, setRecommendedPerkedEvents] = useState([]);
  const [recommendedThemedEvents, setRecommendedThemedEvents] = useState([]);
  const [recommendedCategorizedEvents, setRecommendedCategorizedEvents] =
    useState([]);
  const [recommendedCategorizedOrgs, setRecommendedCategorizedOrgs] = useState(
    []
  );
  const [friendsEvents, setFriendsEvents] = useState([]);
  const [friendsOrgs, setFriendsOrgs] = useState([]);
  const uid = auth.currentUser.uid;

  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/events/perk/preference/${uid}`
    )
      .then((response) => response.json())
      .then((json) => setRecommendedPerkedEvents(json.events))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/events/theme/preference/${uid}`
    )
      .then((response) => response.json())
      .then((json) => setRecommendedThemedEvents(json.events))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/events/category/preference/${uid}`
    )
      .then((response) => response.json())
      .then((json) => setRecommendedCategorizedEvents(json.events))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/organization/category/preference/${uid}`
    )
      .then((response) => response.json())
      .then((json) => setRecommendedCategorizedOrgs(json.orgs))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/event/attending/followees/${uid}`
    )
      .then((response) => response.json())
      .then((json) => setFriendsEvents(json.events))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/followees/${uid}`
    )
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
            }}
          >
            {recommendedPerkedEvents.map((event) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EventProfileScreen", {
                    eventId: event.id,
                  });
                }}
              >
                <View key={event.id} style={styles.eventsMiniCards}>
                  <Text>{event.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.eventsCard}>
        <Text style={styles.eventHeader}>
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
              >
                <View key={event.id} style={styles.eventsMiniCards}>
                  <Text>{event.name}</Text>
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
              >
                <View key={event.id} style={styles.eventsMiniCards}>
                  <Text>{event.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.orgsCard}>
        <Text style={styles.orgHeader}>
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
              >
                <View key={org.id} style={styles.orgsMiniCards}>
                  <Text>{org.name}</Text>
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
              >
                <View key={event.event_id} style={styles.eventsMiniCards}>
                  <Text>{event.event_name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.orgsCard}>
        <Text style={styles.orgHeader}>
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
              >
                <View key={org.org_id} style={styles.orgsMiniCards}>
                  <Text>{org.org_name}</Text>
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
    height: "48%",
    width: "95%",
    justifyContent: "center",
    marginTop: "2.5%",
  },
  orgsCard: {
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    height: "48%",
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
  orgHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF392E",
    textAlign: "center",
    marginTop: "3%",
  },
  eventsMiniCards: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
  },
  orgsMiniCards: {
    width: 200,
    height: 200,
    backgroundColor: "#FF392E",
    margin: 10,
    borderRadius: 15,
  },
});
