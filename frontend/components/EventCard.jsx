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

//Functional component representing an event card
export default (props) => {
  const navigation = useNavigation();
  //Destructuring props to the respective categories, perks and themes
  const categories = props.categories[0];
  const perks = props.perks[0];
  const themes = props.themes[0];
//Helper function to handle undefined categories
  const checkForEmptyCategories = () => {
    if (categories === undefined) {
      return [];
    } else {
      return categories;
    }
  };
//Helper function to handle undefined perks
  const checkForEmptyPerks = () => {
    if (perks === undefined) {
      return [];
    } else {
      return perks;
    }
  };
//Helper function to handle undefined themes
  const checkForEmptyThemes = () => {
    if (themes === undefined) {
      return [];
    } else {
      return themes;
    }
  };
//Component render
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EventProfileScreen", {
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
              <Text style={styles.title} numberOfLines={2}>
                {props.title}
              </Text>
              <Text style={styles.fonts} numberOfLines={2}>
                {props.host}
              </Text>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{
                  marginLeft: 10,
                }}
              >
                {checkForEmptyCategories().map((category) => {
                  return <Category key={category} category={category} />;
                })}
                {checkForEmptyThemes().map((category) => {
                  return <Category key={category} category={category} />;
                })}
                {checkForEmptyPerks().map((category) => {
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
