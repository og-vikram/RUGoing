import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth } from "../firebase.config";

const EventProfileScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const eventId = route.params.eventId
    ? route.params.eventId
    : route.params.selectedProps.eventId;
  const [data, setData] = useState([]);
  const [host, setHost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attending, setAttending] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading2, setLoading2] = useState(true);

  useLayoutEffect(() => {
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/event/${eventId}`)
      .then((response) => response.json())
      .then((json) => setData(json.event))
      .catch((error) => console.log(error));
  }, []);
  
  useLayoutEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/event/host/${eventId}`
    )
      .then((response) => response.json())
      .then((json) => setHost(json))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/event/attending/${eventId}`
    )
      .then((response) => response.json())
      .then((json) => {
        setAttendees(json.users);
        console.log('users that are attending: ', json.users);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/users/follows/${auth.currentUser.uid}`
    )
      .then((response) => response.json())
      .then((json) => {
        follows = json.follows;
        setFriends(attendees.filter(attendee => {
          return follows.some(follow => follow.uid === attendee);
        }));
      })
      .then(() => {console.log(friends)})
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/event/attending/" +
        auth.currentUser.uid
    )
      .then((response) => response.json())
      .then((json) => {
        if (json && json.events) {
          events = json.events;
          if (events.some((event) => event.id === eventId)) setAttending(true);
          else setAttending(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const [followersModalVisible, setFollowersModalVisible] = useState(false);
  const openFollowersModal = () => {
    setFollowersModalVisible(true);
  };
  
  const closeFollowersModal = () => {
    setFollowersModalVisible(false);
  };
  
  //following modal stuff
  const [followingModalVisible, setFollowingModalVisible] = useState(false);
  const openFollowingModal = () => {
    setFollowingModalVisible(true);
  };
  
  const closeFollowingModal = () => {
    setFollowingModalVisible(false);
  };  
  
  const handleAttend = async () => {
    {
      try {
        const user = auth.currentUser;

        fetch(
          `https://absolute-willing-salmon.ngrok-free.app/api/event/attending/add/`,
          {
            method: "POST",
            body: JSON.stringify({
              uid: user.uid,
              event_id: eventId,
            }),
          }
        );
        console.log(user.uid, eventId);
        setAttending(true);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  const handleRemove = async () => {
    {
      try {
        const user = auth.currentUser;

        fetch(
          `https://absolute-willing-salmon.ngrok-free.app/api/event/attending/remove/`,
          {
            method: "POST",
            body: JSON.stringify({
              uid: user.uid,
              event_id: eventId,
            }),
          }
        );
        console.log(user.uid, eventId);
        setAttending(false);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  const peopleCount = () => {
    if (attendees.length == 1) {
      return attendees.length + " person attending";
    }
    return attendees.length + " people attending";
  };

  return (
    <ScrollView>
      <View className="container" style={styles.container}>
        <View className="image-container">
          <Image source={require("../assets/icon.png")} style={styles.image} />
        </View>
        <View className="details-container">
          <View className="basiceventinfo" style={styles.basicInfo}>
            <Text style={styles.header}>{data.name}</Text>
            <Text style={styles.host}>Hosted by:</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OrganizationProfileScreen", {
                  organizationId: data.host_org_id,
                });
              }}
            >
              <Text style={styles.host}>@{host.org_name}</Text>
            </TouchableOpacity>
            <Text>{peopleCount()}</Text>
          </View>

        <View className="location" style={styles.location}>
          <View style={{justifyContent:"center", flexDirection:"row"}}>
          <TouchableOpacity style={styles.button} onPress={openFollowersModal}>
            <Text style={{textAlign: "center", fontSize: 14, fontWeight: "bold", color: "white"}}> Followers </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={followersModalVisible}
            onRequestClose={closeFollowersModal}
            backdropOpacity={.3}
          >

            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ScrollView>
                  {friends.map((friend) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("FriendProfileScreen", {
                          user_uid: friend,
                        });
                      }}
                    >
                      <View key={friend}>
                        <Text>{friend}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>



              {/* <ScrollView>
                {
                  friends.map((friend) => (
                    key={friend.uid}
                    ))}
                
              </ScrollView> */}


                <TouchableOpacity style={styles.bottombutton1} onPress={closeFollowersModal}>
                  <Text style={styles.bottombuttontext1}>Close</Text>
                </TouchableOpacity>

              </View>

            </View>
          </Modal>

          
        </View>

          </View>
          <View className="location" style={styles.location}>
            <Text style={styles.header}>Location</Text>
            <Text>{data.location}</Text>
          </View>

         

          <View className="location" style={styles.location}>
            <Text style={styles.header}>Date And Time</Text>
            <Text>{data.start}</Text>
            <Text>{data.end}</Text>
          </View>
          <View>
            {attending ? (
              <View style={styles.attendingContainer}>
                <TouchableOpacity
                  style={styles.unAttendButton}
                  onPress={handleRemove}
                >
                  <Text style={styles.unAttendButtonText}>Leave</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.attendingContainer}>
                <TouchableOpacity
                  style={styles.attendingButton}
                  onPress={handleAttend}
                >
                  <Text style={styles.attendingButtonText}>Attend</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EventProfileScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 15,
    width: "90%",
    borderRadius: 15,
  },
  bottombutton1: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: "1%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  bottombuttontext1: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },  
  button: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: "1%",
    width: "45%",
    alignItems: "center",
    borderRadius: 15,
  },
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  attendingButton: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: "1%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  attendingButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  attendingContainer: {
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
  unAttendButton: {
    backgroundColor: "white",
    padding: 15,
    marginTop: "1%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  unAttendButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  host: {
    paddingTop: 10,
    fontStyle: "italic",
  },
});
