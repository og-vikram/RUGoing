import * as React from "react";
import { Card, Text } from "@rneui/base";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import Category from "./Category";
import { useEffect } from "react";

export default (props) => {
  const categories = props.categories[0];
  useEffect(() => {
    // console.log(props.categories[0]);
  }, [categories]);

  const checkForEmptyCategories = () => {
    if (categories === undefined) {
      return [];
    } else {
      return categories;
    }
  };
  return (
    <>
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
                uri: props.image_id,
              }}
            />
          </View>
          <View style={styles.details_container}>
            {/* <Card.Title>Organization Name</Card.Title> */}
            <Text style={styles.title} numberOfLines={2}>
              {props.title}
            </Text>
            <Text style={styles.fonts} numberOfLines={2}>
              {props.description}
            </Text>
            <ScrollView horizontal={true}>
              {checkForEmptyCategories().map((category) => {
                return <Category key={category} category={category} />;
              })}
            </ScrollView>
          </View>
        </View>
      </Card>
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
    color: "#FF392E",
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FF392E",
  },
});
