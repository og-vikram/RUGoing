import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { reloadAsync } from "expo-updates";
import { Card } from "@rneui/themed";
import { Button, Icon } from "react-native-elements";
const ProfileDetails = ({ navigation }) => {
  return (
    <View>
      <Card
        containerStyle={{
          borderRadius: 10,
          height: "80%",
        }}
      >
        <Card.Title>Vikram Sridhar</Card.Title>
        <Card.Divider />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Hello! My name is Vikram and I'm a senior at Rutgers University. I'm
            interested in fun events and cool organizations!
          </Text>
        </View>
        <View style={styles.eventsCard}>
          <Text style={styles.eventHeader}> My Events </Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                marginTop: "-3%",
              }}
            >
              {/* Content inside the horizontal ScrollView */}
              <View style={styles.eventsMiniCards}>
                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    color: "#FF392E",
                  }}
                >
                  Event #1
                </Text>
              </View>
              <View style={styles.eventsMiniCards}>
                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    color: "#FF392E",
                  }}
                >
                  Event #2
                </Text>
              </View>
              <View style={styles.eventsMiniCards}>
                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    color: "#FF392E",
                  }}
                >
                  Event #3
                </Text>
              </View>
              {/* Add more items as needed */}
            </View>
          </ScrollView>
        </View>

        <View style={styles.eventsCard}>
          <Text style={styles.eventHeader}> My Organizations </Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.eventsInfo}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                marginTop: "-3%",
              }}
            >
              {/* Content inside the horizontal ScrollView */}
              <View style={styles.eventsMiniCards}>
                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    color: "#FF392E",
                  }}
                >
                  Org 1
                </Text>
              </View>
              <View style={styles.eventsMiniCards}>
                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    color: "#FF392E",
                  }}
                >
                  Org 2
                </Text>
              </View>
              <View style={styles.eventsMiniCards}>
                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    color: "#FF392E",
                  }}
                >
                  Org 3
                </Text>
              </View>
              {/* Add more items as needed */}
            </View>
          </ScrollView>
        </View>
      </Card>
      {/* <TouchableOpacity
        style={styles.customButtonContainer}
        onPress={handleLogout}
      >
        <Text style={styles.customButtonText}>Logout</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.customButtonContainer}
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Text style={styles.customButtonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FF392E",
  },
  customButtonContainer: {
    backgroundColor: "#FF392E",
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  customButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
  },
  cardContainer: {
    // marginTop: 20,
    width: "100%",
    backgroundColor: "#FF392E",
  },
  eventsCard: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    alignSelf: "center",
    height: "35%",
    width: "95%",
    justifyContent: "center",
    marginTop: "2.5%",
  },
  orgsCard: {
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    height: "35%",
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
    width: 100,
    height: 100,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
  },
  orgsMiniCards: {
    width: 100,
    height: 100,
    backgroundColor: "#FF392E",
    margin: 10,
    borderRadius: 15,
  },
});

export default ProfileDetails;
