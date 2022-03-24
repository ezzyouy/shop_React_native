import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";
import OrderCard from "../../Shared/OrderCard";

const UserProfil = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();
  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAutheticated === false ||
        context.stateUser.isAutheticated === null
      ) {
        props.navigation.navigate("Login");
      }
      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseUrl}users/${context.stateUser.user.sub}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => setUserProfile(user.data));
        })
        .catch((err) => console.log(err));

      axios
        .get(`${baseUrl}orders`)
        .then((x) => {
          const data = x.data;
          const userOrders = data.filter(
            (order) => order.user._id === context.stateUser.user._id
          );
          setOrders(userOrders);
        })
        .catch((err) => console.log(err));

      return () => {
        setUserProfile();
        setOrders()
      };
    }, [context.stateUser.isAutheticated])
  );

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email:{userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone:{userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title={"Sign Out"}
            onPress={() => {
              AsyncStorage.removeItem("jwt");
              logoutUser(context.dispatch);
            }}
          />
        </View>
        <View style={styles.order}>
          <Text style={{fontSize:20}}>My Orders</Text>
          <View>
            {orders ? (
              orders.map((x)=>{
                return <OrderCard keu={x.id} {...x} />
              })
            ):(
              <View style={styles.order}>
                <Text>You have no orders</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order:{
    marginTop:20,
    alignItems:'center',
    marginBottom:60
  }
});

export default UserProfil;
