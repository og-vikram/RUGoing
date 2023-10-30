import * as React from "react";
import { Card, Text } from "@rneui/base";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Category from "./Category";
import { useNavigation } from "@react-navigation/native";

export default (props) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Event Profile", {
            selectedProps: props,
          });
        }}
      >
        <Card
          containerStyle={{ borderRadius: 25, shadowOpacity: 0 }}
          wrapperStyle={{}}
        >
          <View style={styles.container}>
            <View style={styles.icon_container}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/6/69/Rutgers_Athletics_Logo.png",
                }}
              />
            </View>
            <View style={styles.details_container}>
              {/* <Card.Title>Organization Name</Card.Title> */}
              <Text style={styles.title} numberOfLines={2}>
                {props.title}
              </Text>
              <Text style={styles.fonts} numberOfLines={2}>
                {props.host}
              </Text>
              <Category category={props.category} />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "25px",
  },
  icon_container: {
    width: "30%",
  },
  details_container: {
    width: "70%",
    height: 120,
    // backgroundColor: "#BA3B46",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "space-between",
  },
  fonts: {
    // marginBottom: 8,
    fontSize: 13,
    fontWeight: "400",
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 75,
    height: 75,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
