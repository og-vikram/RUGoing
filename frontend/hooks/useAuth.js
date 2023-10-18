import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log("authUser", authUser);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  });
};

export default useAuth;
