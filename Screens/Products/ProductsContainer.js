import { View, FlatList, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { Icon, Input, Box, VStack, ScrollView, Text, Container } from "native-base";
import ProductList from "./ProductList";
import { Ionicons } from "@expo/vector-icons";
import SearchProducts from "./SearchProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import baseUrl from '../../assets/common/baseUrl'
import axios from 'axios'
//const data = require("../../assets/data/products.json");
const category = require("../../assets/data/categories.json");

var { height } = Dimensions.get("window")
const ProductsContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productCtg, setProductCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true)
  useFocusEffect((
    useCallback(
      () => {
        setFocus(false);

        setActive(-1);

        //products
        axios
          .get(`${baseUrl}products`)
          .then((res) => {
            setProducts(res.data);
            setProductsFiltered(res.data);
            setProductCtg(res.data)
            setInitialState(res.data);
            setLoading(false)
          })

        //Categories

        axios
          .get(`${baseUrl}categories`)
          .then((res) => {
            setCategories(category);
          })
          .catch((err) => {
            console.log('Api call error');
          })
        return () => {
          setProducts([]);
          setProductsFiltered([]);
          setFocus();
          setCategories([]);
          setActive();
          setInitialState([]);
        };
      },
      [],
    )

  ))

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //Categories

  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductCtg(initialState), setActive(true)]
        : [
          setProductCtg(
            products.filter((i) => i.category._id === ctg),
            setActive(true)
          ),
        ];
    }
  };
  return (
    <>
      {loading == false ? (
        <Box>
          <VStack w="100%" space={5} alignSelf="center" marginBottom={2}>
            <Input
              placeholder="Search"
              variant="filled"
              width="95%"
              borderRadius="10"
              py="1"
              px="2"
              borderWidth="0"
              InputLeftElement={
                focus == false ? (
                  <Icon
                    ml="2"
                    size="4"
                    color="gray.400"
                    as={<Ionicons name="ios-search" />}
                  />
                ) : (
                  <Icon
                    onBlur={onBlur}
                    as={<Ionicons name="ios-close" style={{ direction: "rtl" }} />}
                  />
                )
              }
              onFocus={openList}
              onChangeText={(text) => searchProduct(text)}
            />
          </VStack>
          {focus == true ? (
            <SearchProducts
              productsFiltered={productsFiltered}
              navigation={props.navigation}
            />
          ) : (
            <ScrollView>
              <View>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productCtg={productCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item._id}
                          item={item}
                        />
                      )
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: '40%' }]}>
                    <Text>No products found</Text>
                  </View>
                )}

              </View>
            </ScrollView>
          )}
        </Box>
      ) : (
        <Container style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
          <ActivityIndicator size='large' color='red' />
        </Container>
      )}

    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
    marginTop: 10,
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: 'center',
    alignItems: "center"
  }
});
export default ProductsContainer;
