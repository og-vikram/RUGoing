// import { StyleSheet, View } from "react-native";
// import { Text, Card, Button, Icon } from "@rneui/themed";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// const users = [
//   {
//     name: "brynn",
//     avatar: "https://uifaces.co/our-content/donated/1H_7AxP0.jpg",
//   },
//   {
//     name: "thot leader",
//     avatar:
//       "https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
//   },
//   {
//     name: "jsa",
//     avatar: "https://uifaces.co/our-content/donated/bUkmHPKs.jpg",
//   },
//   {
//     name: "talhaconcepts",
//     avatar: "https://randomuser.me/api/portraits/men/4.jpg",
//   },
//   {
//     name: "andy vitale",
//     avatar: "https://uifaces.co/our-content/donated/NY9hnAbp.jpg",
//   },
//   {
//     name: "katy friedson",
//     avatar:
//       "https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg",
//   },
// ];

// const OrganizationCard = () => {
//   return (
//     <>
//       {
//         <SafeAreaView>
//           <View
//             className="main-container"
//             style={{
//               flex: 1,
//               flexDirection: "row",
//               height: 100,
//               width: 300,
//               backgroundColor: "red",
//             }}
//           >
//             <View className="icon-container"></View>
//             <View
//               classname="detail-container"
//               style={{ flex: 1, flexDirection: "column" }}
//             >
//               <View className="title">
//                 <Text>Hello</Text>
//               </View>
//               <View className="description"></View>
//               <View className="categories"></View>
//             </View>
//           </View>
//         </SafeAreaView>
//       }
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   fonts: {
//     marginBottom: 8,
//   },
//   user: {
//     flexDirection: "row",
//     marginBottom: 6,
//   },
//   image: {
//     width: 30,
//     height: 30,
//     marginRight: 10,
//   },
//   name: {
//     fontSize: 16,
//     marginTop: 5,
//   },
// });

// export default OrganizationCard;

import * as React from "react";
import { Card, Text } from "@rneui/base";
import { View, Image, StyleSheet } from "react-native";
import Category from "./Category";

export default (props) => {
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
              {props.description}
            </Text>
            <Category category={props.category} />
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
