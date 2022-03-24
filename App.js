import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import React from "react";
import { Dimensions, LogBox, StyleSheet, Text, View } from "react-native";
import Toast from 'react-native-toast-message'
//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Navigation
import Main from "./Navigator/Main";

//Screen
import Header from "./Shared/Header";


//Context API

import Auth from "./Context/store/Auth";

LogBox.ignoreAllLogs(true)
export default function App() {
  return (

    <NativeBaseProvider>
      <Auth>
        <Provider store={store}>
          <NavigationContainer>
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </NavigationContainer>
        </Provider>
      </Auth>
    </NativeBaseProvider>

  );
}