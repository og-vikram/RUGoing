import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";

const OrganizationInfoPage = () => {
  const [organizationInfo, setOrganizationInfo] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/organization")
      .then((response) => response.json())
      .then((json) => setOrganizationInfo(json));
  }, []);

  return (
    <View>
      <Text>Organization Name: {organizationInfo.organization_name}</Text>
      <Text>Events:</Text>
      <ul>
        {organizationInfo.events.map((event) => (
          <li key={event}>{event}</li>
        ))}
      </ul>
      <Text>Mission: {organizationInfo.mission}</Text>
      <Button
        title="Join Organization"
        onPress={() => Linking.openURL(organizationInfo.join_link)}
      />
    </View>
  );
};

export default OrganizationInfoPage;
