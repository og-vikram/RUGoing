import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <View>

      <View style={styles.eventsCard}>
        <Text style={styles.eventHeader}> Your Events </Text>
      
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginTop: "-3%"}}>    
            {/* Content inside the horizontal ScrollView */}
            <View style={styles.eventsMiniCards}>
              <Text style = {{alignSelf: "center", textAlignVertical: "center", color: "#FF392E"}}>Event #1</Text>
            </View>
            <View style={styles.eventsMiniCards}>
              <Text style = {{alignSelf: "center", textAlignVertical: "center", color: "#FF392E"}}>Event #2</Text>
            </View>
            <View style={styles.eventsMiniCards}>
              <Text style = {{alignSelf: "center", textAlignVertical: "center", color: "#FF392E"}}>Event #3</Text>
            </View>
            {/* Add more items as needed */}
          </View>
        </ScrollView>

      </View>

      <View style={styles.orgsCard}>
        <Text style={styles.orgHeader}> Your Organizations </Text>
      
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.orgsInfo}>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginTop: "-3%"}}>
              {/* Content inside the horizontal ScrollView */}
              <View style={styles.orgsMiniCards}>
                <Text style = {{alignSelf: "center", textAlignVertical: "center", color: "white"}}>Org 1</Text>
              </View>
              <View style={styles.orgsMiniCards}>
                <Text style = {{alignSelf: "center", textAlignVertical: "center", color: "white"}}>Org 2</Text>
              </View>
              <View style={styles.orgsMiniCards}>
                <Text style = {{alignSelf: "center", textAlignVertical: "center", color: "white"}}>Org 3</Text>
              </View>
              {/* Add more items as needed */}
            </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  eventsCard:{
    backgroundColor: "#FF392E",
    borderRadius: 15,
    alignSelf: "center",
    height: "48%",
    width: "95%",
    justifyContent: "center",
    marginTop: "2.5%",
  },
  orgsCard:{
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
    backgroundColor: 'white', 
    margin: 10,
    borderRadius: 15,
  },
  orgsMiniCards:{
    width: 200, 
    height: 200, 
    backgroundColor: '#FF392E', 
    margin: 10,
    borderRadius: 15,
  },
});
