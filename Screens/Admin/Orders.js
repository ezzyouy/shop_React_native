import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { Header, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect, useLinkProps } from "@react-navigation/native";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";
import ListItem from "./ListItem";
import EasyButton from "../../Shared/StyledComponent/EasyButton";
import OrderCard from "../../Shared/OrderCard";
import { propsFlattener } from "native-base/lib/typescript/hooks/useThemeProps/propsFlattener";

const Orders = () => {
  const [orderList, setOrderList] = useState();

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList();
      };
    }, [second])
  );

  const getOrders = () => {
    axios
      .get(`${baseUrl}orders`)
      .then((x) => {
        setOrderList(x.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View>
      <FlatList 
        data={orderList}
        renderItem={({item})=>(
          <OrderCard navigation={propsFlattener.navigation} {...item} editMode={true}/>
        )}
        keyExtractor={item._id}
      />
    </View>
  );
};
const styles = StyleSheet.create({});

export default Orders;
