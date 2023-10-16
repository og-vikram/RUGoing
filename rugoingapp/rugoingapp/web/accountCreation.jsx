import React, { useState } from "react";
import { Button, TextInput } from "react-native";

const AccountCreationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const handleSubmit = async () => {
    if(password == confirmPassword){
    const response = await fetch("http://localhost:5000/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({firstName, lastName, email, password }),
    });

    if (response.status === 201) {
      // Account created successfully
    } else {
      // Something went wrong
    }
    }
  };


  return (
    <div>
      <h1>Create an Account</h1>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstname(text)}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastname(text)}
      />
      <TextInput
        placeholder="Email address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </div>
  );
};

export default AccountCreationPage;
