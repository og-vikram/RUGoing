import * as React from "react";
import { Card, Text } from "@rneui/base";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import Category from "./Category";
// Component representing a card for displaying event details
export default (props) => {
  const categories = props.categories[0];
//Function to handle undefined categories
  const checkForEmptyCategories = () => {
    if (categories === undefined) {
      return [];
    } else {
      return categories;
    }
  };
//Container view for the component
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
//Styles for the component
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
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "space-between",
  },
  fonts: {
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
