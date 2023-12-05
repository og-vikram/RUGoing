import * as React from "react";
import { Card, Text } from "@rneui/base";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Category from "./Category";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default (props) => {
  const navigation = useNavigation();
  const categories = props.categories[0];

  // useEffect(() => {
  // console.log(categories);
  // }, [categories]);

  const checkForEmptyCategories = () => {
    if (categories === undefined) {
      return [];
    } else {
      return categories;
    }
  };
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
              <ScrollView horizontal={true}>
                {checkForEmptyCategories().map((category) => {
                  return <Category key={category} category={category} />;
                })}
              </ScrollView>
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
    color: "#FF392E",
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
    color: "#FF392E",
  },
});
