import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import React from "react";
import { Dimensions, LogBox, StyleSheet, Text, View } from "react-native";

import ProductsContainer from "./Screens/Products/ProductsContainer";
import Header from "./Shared/Header";

LogBox.ignoreAllLogs(true)
export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Header />
        <ProductsContainer />
      </View>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
