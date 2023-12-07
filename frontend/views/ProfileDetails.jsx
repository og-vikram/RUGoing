import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
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



if(!loading){
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
  userInput:{
    color:"red",
  },
  userInputText:{

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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16,
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
});

export default ProfileDetails;
