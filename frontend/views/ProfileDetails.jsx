import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextComponent,
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
  const [events, setEvents] = useState({});
  const [organizations, setOrganizations] = useState({});

  const [eventjsons, setEventjsons] = useState([]);
  const [orgjsons, setOrgjsons] = useState([]);

  const [loading, setLoading] = useState(true);


//console.log(auth.currentUser.uid);

  useLayoutEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/users/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((json) => getUser(json.user))
      .catch((error) => console.log(error));

      fetch(
        `https://absolute-willing-salmon.ngrok-free.app/api/event/attending/${auth.currentUser.uid}`
      )
        .then((response) => response.json())
        .then((json) => setEvents(json))
        .catch((error) => console.log(error));

      fetch(
        `https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/${auth.currentUser.uid}`)
        .then((response) => response.json())
        .then((json) => setOrganizations(json))
        .catch((error) => console.log(error));
  
    
  }, []);

  useLayoutEffect(  () => {
    const fetchEventDetails = async () => {
      setEventjsons([]);
    for(const e of events.events){
      try{
          const response = await fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/event/${e}`
    );
      const eventData = await response.json();
      setEventjsons((prevDetails) => [...prevDetails, eventData.event]);
    } catch (error) {
      console.error(`Error fetching data for event ${e}:`, error);
    }

  }
    }

    fetchEventDetails();


  }, [events]);
 

useLayoutEffect( () => {
  const fetchOrgDetails = async () => {
    setOrgjsons([]);
    console.log(organizations.orgs);
    for(const o of organizations.orgs){
      try{
          const response = await fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/organization/${o}`
    );
      const orgData = await response.json();
      setOrgjsons((prevDetails) => [...prevDetails, orgData.org]);
    } catch (error) {
      console.error(`Error fetching data for org ${o}:`, error);
    }

  }
  }
  fetchOrgDetails();
  setLoading(false);

}, [organizations]);


if(!loading)
  return (
    <View>
      <Card
        containerStyle={{
          borderRadius: 10,
          height: "80%",
        }}
      >
        
        <Card.Title style={styles.headerContainer}>{user.firstname + " " + user.lastname}</Card.Title>
        <TouchableOpacity
        style={styles.customButtonContainer2}
        onPress={() => {
         
        }}
      >
        <Text style={styles.customButtonText}>Edit</Text>
      </TouchableOpacity>
      
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
            
            <Text>{user.bio_descrip !== null ? user.bio_descrip : <Text style={{ fontStyle: 'italic' }}>Your Bio Here</Text>}</Text>

            </Text>
        </View>
        <Card.Divider />

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
              {eventjsons.map((eventDetail) => (
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

              {orgjsons.map((orgDetails) => (
<TouchableOpacity
onPress={() => {
  navigation.navigate("Org Profile", {
    organizationId: orgDetails.org_id,
  });
}}>
<View key={orgDetails.id} style={styles.eventsMiniCards}>

                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    color: "#FF392E",
                  }}
                >
                 {orgDetails.name}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
