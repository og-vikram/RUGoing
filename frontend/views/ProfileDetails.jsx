import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState, useMemo } from "react";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { reloadAsync } from "expo-updates";
import { Card } from "@rneui/themed";
import { Button, Icon } from "react-native-elements";
const ProfileDetails = ({ navigation }) => {


  const [edit, toggleEdit] = useState(false);
  const [user, getUser] = useState({});
  const [events, setEvents] = useState([]);
  const [organizations, setOrganizations] = useState([]);


  const [loading, setLoading] = useState(true);

  const[newUserBio, setNewUserBio] = useState("");
  const[actualUserBio, setActualUserBio] = useState("");


  useLayoutEffect(() => {

 

    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/users/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((json) => getUser(json.user))
      .catch((error) => console.log(error))
      .then(

      fetch(
        `https://absolute-willing-salmon.ngrok-free.app/api/event/attending/${auth.currentUser.uid}`
      )
        .then((response) => response.json())
        .then((json) => setEvents(json.events))
        .catch((error) => console.log(error)))
        .then(

      fetch(
        `https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/${auth.currentUser.uid}`)
        .then((response) => response.json())
        .then((json) => setOrganizations(json.orgs))
        .catch((error) => console.log(error)));
        setActualUserBio(user.bio_descrip);
        updateCurrBio();
       // setNewUserBio(user.bio_descrip);
        setLoading(false);
  }, [actualUserBio]);


const updateBio = async () => {
  {
    try {

      fetch(
        `https://absolute-willing-salmon.ngrok-free.app/api/users/changeBio`,
        {
          method: "POST",
          body: JSON.stringify({
            uid: auth.currentUser.uid,
            newBio: newUserBio,
          }),
        }
      );
      setActualUserBio(newUserBio);
      setNewUserBio(newUserBio);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  }
};

const [followerList, setFollowerList] = useState([]);
const [followingList, setFollowingList] = useState([]);

useEffect(() => {
    fetch('https://absolute-willing-salmon.ngrok-free.app/api/users/followers/' + auth.currentUser.uid)
    .then((response) => response.json())
        .then((json) => setFollowerList(json.followers))
        .catch((error) => console.log(error));

}, []);


useEffect(() => {
  fetch('https://absolute-willing-salmon.ngrok-free.app/api/users/follows/' + auth.currentUser.uid)
  .then((response) => response.json())
      .then((json) => setFollowingList(json.follows))
      .catch((error) => console.log(error));

}, []);

const refreshFollowing = async () => {
  fetch('https://absolute-willing-salmon.ngrok-free.app/api/users/follows/' + auth.currentUser.uid)
  .then((response) => response.json())
      .then((json) => setFollowingList(json.follows))
      .catch((error) => console.log(error));
}

function EditOrDone(){
  if(edit){
    updateBio();
  }
  toggleEdit(!edit);
}

const updateCurrBio = async () => {
  if(newUserBio == null || newUserBio == ""){
    setNewUserBio(user.bio_descrip);
  }
}

//followers modal stuff
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



const handleRemoveFriend = async (id) => {
  {
    try {

      fetch('https://absolute-willing-salmon.ngrok-free.app/api/users/unfollow/',

        {
          method: "POST",
          body: JSON.stringify({
            follower_id: auth.currentUser.uid,
            followee_id: id,
          }),
        }
      );
      refreshFollowing();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  }
}
  



if(!loading){
  //console.log(followerList);
  console.log("db bio :   ", user.bio_descrip);
  console.log("curr bio :   ", newUserBio);

  return (
    <View>
      <Card
        containerStyle={{
          borderRadius: 10,
          height: "97%",
        }}
      >
        <View style={styles.topContainer}>
          <Card.Title style={styles.headerContainer}>{user.firstname + " " + user.lastname}</Card.Title>
          <View style={styles.topContainer2}>
          <TouchableOpacity
        style={styles.customButtonContainer2}
        onPress={() => {
         EditOrDone();
         
        }}
      >
        <Text style={styles.customButtonText}>{edit == true ? "Done" : "Edit"}</Text>
      </TouchableOpacity>
          <TouchableOpacity onPress={() => {
          navigation.navigate("Settings");
        }}>
              <Icon name="gear" type="font-awesome" size={30} color="#FF392E"/>
            </TouchableOpacity>
          </View>
      </View>
        
        
      <Card.Divider/>
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

                <Text style={styles.questionText}> Followers: </Text>
                <View style={styles.card1}>
                    {/* Anish cook over here */}
                    {followerList.map((item) => (
                      <TouchableOpacity
                        key={item.uid}
                        onPress={() => {
                          navigation.navigate("Friend Profile", {
                            user_uid: item.uid,
                          });
                          closeFollowersModal();
                        }}
                        style={styles.modalList}
                      >
                        <Text style={styles.modalText}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.bottombutton1} onPress={closeFollowersModal}>
                  <Text style={styles.bottombuttontext1}>Close</Text>
                </TouchableOpacity>

              </View>

            </View>
          </Modal>

          <TouchableOpacity style={styles.button} onPress={openFollowingModal}>
            <Text style={{textAlign: "center", fontSize: 14, fontWeight: "bold", color: "white"}}> Following </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={followingModalVisible}
            onRequestClose={closeFollowingModal}
            backdropOpacity={.3}
          >

            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.questionText}> Followers: </Text>
                  <View style={styles.card2}>

                    {/* Anish cook over here */}
                    {followingList.map((item) => (
                    <View>
                      <TouchableOpacity
                        key={item.uid}
                        onPress={() => {
                          navigation.navigate("Friend Profile", {
                            user_uid: item.uid,
                          });
                          closeFollowersModal();
                        }}
                        style={styles.modalList1}
                        
                      >
                        <Text style={styles.modalText}>{item.name}</Text>
                        <View style={{alignItems:"center", flex: 1, flexDirection: "row", justifyContent: "flex-end"}}>
                        <TouchableOpacity
                          style={styles.customButtonContainer5}
                          onPress={() => handleRemoveFriend(item.uid)
                        }>
                          <Text style={{color: "white", fontWeight: "bold"}}>Remove</Text>

                        </TouchableOpacity>
                      </View>
                      </TouchableOpacity>
                      
                     </View>
                    ))}
                  </View>



                <TouchableOpacity style={styles.bottombutton1} onPress={closeFollowingModal}>
                  <Text style={styles.bottombuttontext1}>Close</Text>
                </TouchableOpacity>

              </View>

            </View>
          </Modal>

        </View>

        <Card.Divider style={{marginTop: "3%"}}/>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: 300,
          }}
        >
          
         {edit &&  (
<View style={styles.userInputText}>
            <TextInput  multiline style={styles.userInput} editable={true} autoFocus={true} onChangeText={((text) => setNewUserBio(text))} value={newUserBio == null ? user.bio_descrip : newUserBio} placeholder={'Your Bio Here'}
           ></TextInput>
           </View>
            )}
            {!edit && (
            <View style={styles.displayUserInput}>
            <Text>{user.bio_descrip}</Text>
            </View>
)}
      
        </View>
        <Card.Divider style={{marginVertical: 50}}/>

        <View style={styles.eventsCard}>
          <Text style={styles.eventHeader}> My Events </Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
              }}
            >
              {/* Content inside the horizontal ScrollView */}  
                
              {events.map((eventDetail) => (
<TouchableOpacity
onPress={() => {
  navigation.navigate("Event Profile", {
    eventId: eventDetail.id,
  });
}}>
          <View key={eventDetail.id} style={styles.eventsMiniCards}>
                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    color: "#FF392E",
                    fontSize: 12,
                    fontWeight:"bold",
                  }}
                >
                  {eventDetail.name}
                </Text>
              </View>
                </TouchableOpacity>       
                ))}      
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

              {organizations.map((organization) => (
<TouchableOpacity
onPress={() => {
  navigation.navigate("Org Profile", {
    organizationId: organization.org_id,
  });
}}>
<View key={organization.id} style={styles.eventsMiniCards}>

                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    color: "#FF392E",
                    fontSize: 12,
                    fontWeight:"bold",
                  }}
                >
                 {organization.name}
                </Text>
              </View>
              </TouchableOpacity>       
        ))}  
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
    </View>
  );}
};

const styles = StyleSheet.create({

  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FF392E",
  },
  card1:{
      backgroundColor: 'white',
      borderColor: "#FF392E",
      borderWidth: 1,
      borderRadius: 10,
      width: 330,
      height: 120,
  },
  card2:{
    backgroundColor: 'white',
    borderColor: "#FF392E",
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    height: 320,
},
  userInput:{
    color:"red",
  },
  userInputText:{

  },
  customButtonContainer: {
    backgroundColor: "#FF392E",
    marginTop: 0,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    height: 50,
    width: 150,
    justifyContent: "center",
  },
  customButtonContainer5: {
    backgroundColor: "#FF392E",
    marginTop: 0,
    borderRadius: 15,
    padding: 0,
    alignItems: "center",
    height: 30,
    width: 80,
    justifyContent: "center",
    marginRight: 10,
  },
  button: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    marginHorizontal: "5%",
    padding: 8,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16,
  },
  modalList: {
    borderRadius: 15,
    backgroundColor: "#E6E6E6",
    marginTop: "1%",
    padding: "4%",
  },
  modalList1:{
    borderRadius: 15,
    backgroundColor: "#E6E6E6",
    marginTop: "2%",
    padding: "4%",
    flexDirection: "row",
    alignItems:"center",
  },
  modalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF392E",
  },
  customButtonContainer2: {
    backgroundColor: "#FF392E",
    //marginTop: 10,
    borderRadius: 15,
   // padding: 2,
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    width: 60,
   // flexDirection: "row"
   marginRight: 8,
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
    height: "33%",
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
    justifyContent: "center"

  },
  orgsMiniCards: {
    width: 100,
    height: 100,
    backgroundColor: "#FF392E",
    margin: 10,
    borderRadius: 15,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  topContainer2: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  
  },
  modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 15,
      justifyContent: "center",
      width: "95%",
  },
  bottombutton1: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    marginTop: "3%",
    padding: "3%",
    alignItems: "center",
  },
  bottombuttontext1: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  questionText: {
    color: "black",
    fontSize: 13,
    marginTop: "3%",
    fontWeight: "bold",
  },
});

export default ProfileDetails;
