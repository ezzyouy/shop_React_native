import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios, { Axios } from "axios";
import Toast from "react-native-toast-message";
import baseUrl from "../../assets/common/baseUrl";
import EasyButton from "../../Shared/StyledComponent/EasyButton";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }
    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };
    axios
      .post(`${baseUrl}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please login into your account",
          });
          setTimeout(() => {
            props.navigation.navigator("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: " Something went wrong",
          text2: "Please try again",
        });
      });
  };
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Enter Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder={"Enter Name"}
          name={"name"}
          id={"name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Enter phone"}
          name={"phone"}
          id={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Enter Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Register</Text>
          </EasyButton>
        </View>
        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to Login</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {
    marginBottom: 20,
    margin: 10,
    alignItems: "center",
  },
});

export default Register;
