import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { reloadAsync } from "expo-updates";
import { Button, Icon } from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Card } from "@rneui/themed";
import EventProfileScreen from "./EventProfileScreen";
import OrganizationProfileScreen from "./OrganizationProfileScreen";
import { useRoute } from "@react-navigation/native";

const FriendProfileScreen = ({ navigation }) => {
  const route = useRoute();
  const [userData, setUserData] = useState({});
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/users/${route.params.user_uid}`
    )
      .then((response) => response.json())
      .then((json) => setUserData(json.user))
      .catch((error) => console.log(error));
  }, {});

  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/users/follows/" +
        auth.currentUser.uid
    )
      .then((response) => response.json())
      .then((json) => {
        if (json && json.follows) {
          follows = json.follows;
          const following = follows.some(
            (follow) => follow.uid === route.params.user_uid
          );

          if (following) setFollowing(true);
          else setFollowing(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFollow = async () => {
    {
      try {
        const user = auth.currentUser;

        fetch(
          `https://absolute-willing-salmon.ngrok-free.app/api/users/follow/`,
          {
            method: "POST",
            body: JSON.stringify({
              follower_uid: user.uid,
              followee_uid: userData.user_id,
            }),
          }
        );
        console.log(user.uid, userData.netid);
        setFollowing(true);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  const handleUnfollow = async () => {
    {
      try {
        const user = auth.currentUser;

        fetch(
          `https://absolute-willing-salmon.ngrok-free.app/api/users/unfollow/`,
          {
            method: "POST",
            body: JSON.stringify({
              follower_id: user.uid,
              followee_id: userData.user_id,
            }),
          }
        );
        console.log(user.uid, userData.user_id);
        setFollowing(false);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  return (
    <View>
      <Card>
        <Card.Title>{userData.firstname + " " + userData.lastname}</Card.Title>
        <Card.Divider />
        <Text>{userData.bio_descrip}</Text>
        <View>
          {following ? (
            <View style={styles.attendingContainer}>
              <TouchableOpacity
                style={styles.unAttendButton}
                onPress={handleUnfollow}
              >
                <Text style={styles.unAttendButtonText}>Following</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.attendingContainer}>
              <TouchableOpacity
                style={styles.attendingButton}
                onPress={handleFollow}
              >
                <Text style={styles.attendingButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  followingButton: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: "1%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  followingButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  followingContainer: {
    alignItems: "center",
  },
  basicInfo: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    margin: 15,
    marginTop: "5%",
  },
  location: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    margin: 15,
    marginTop: "1%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  italic: { fontStyle: "italic" },
  unFollowButton: {
    backgroundColor: "grey",
    padding: 15,
    marginTop: "1%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  unFollowButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  host: {
    paddingTop: 10,
    fontStyle: "italic",
  },
});

export default FriendProfileScreen;
