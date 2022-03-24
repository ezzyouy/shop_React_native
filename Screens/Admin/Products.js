import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Header, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";
import ListItem from "./ListItem";
import EasyButton from "../../Shared/StyledComponent/EasyButton";

var { height, width } = Dimensions.get("window");

const ListHeader = (props) => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Price</Text>
      </View>
    </View>
  );
};
const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((err) => console.log(err));

      axios.get(`${baseUrl}products`).then((res) => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(flase);
      });

      return () => {
        setProductFilter();
        setProductList();
        setLoading(true);
      };
    }, [])
  );
  const serachProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };
  const deleteProduct = (id) => {
    axios
      .delete(`${baseUrl}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id != id);
        setProductFilter(products);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttomContainer}>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Orders")}
        >
            <Icon name='shopping-bag' size={18} color={"white"}/>
            <Text style={styles.buttonText}>Orders</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Product Form")}
        >
            <Icon name='plus' size={18} color={"white"}/>
            <Text style={styles.buttonText} >Product Form</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Categories")}
        >
            <Icon name='plus' size={18} color={white}/>
            <Text>Categories</Text>
        </EasyButton>
      </View>
      <View>
        <Header searchBar rounded>
          <Item style={{ padding: 5 }}>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={(text) => serachProduct(text)}
            />
          </Item>
        </Header>
      </View>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size={"large"} color={"red"} />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteProduct}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container:{
      marginBottom:160,
      backgroundColor:'white',
  },
  buttomContainer:{
      margin: 20,
      alignSelf:'center',
      flexDirection:'row'
  },
  buttonText:{
      marginLeft:4,
      color:'white'
  }
});

export default Products;
