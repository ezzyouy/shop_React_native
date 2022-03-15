import { View, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Icon,
  Item,
  Input,
  Text,
  NativeBaseProvider,
  HStack,
  StatusBar,
  Box,
  useTheme,
  VStack,
} from "native-base";
import ProductList from "./ProductList";
import { Ionicons } from "@expo/vector-icons";
import SearchProducts from "./SearchProducts";
import Banner from "../../Shared/Banner";

const data = require("../../assets/data/products.json");

const ProductsContainer = () => {
 
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false)
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
    };
  }, []);

  const searchProduct=(text)=>{

    setProductsFiltered(
      products.filter((i)=>i.name.toLowerCase().includes(text.toLowerCase()))
    )
  }

  const openList=()=>{
    setFocus(true);
  }

  const onBlur=()=>{
    setFocus(false);
  }
  return (
    <Box >
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Search"
          variant="filled"
          width="95%"
          borderRadius="10"
          py="1"
          px="2"
          borderWidth="0"
          InputLeftElement={ focus == false ?(<Icon
              ml="2"
              size="4"
              color="gray.400"
              as={<Ionicons name="ios-search" />}
            />):(
              <Icon
              onBlur={onBlur}
              as={<Ionicons name="ios-close" style={{direction:"ltr"}} />}
            />
            )
            
          }
          onFocus={openList}
          onChangeText={(text)=>searchProduct(text)}
        />
        
      </VStack>
      {focus == true ? (
        <SearchProducts
          productsFiltered={productsFiltered}
        />
      ):(
        <View style={styles.container}>
        <View>
          <Banner />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            numColumns={2}
            data={products}
            renderItem={({ item }) => <ProductList key={item.id} item={item} />}
            keyExtractor={(item) => item.name}
          />
        </View>
      </View>
      )}
      
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    marginTop:10
  },
  listContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
});
export default ProductsContainer;
