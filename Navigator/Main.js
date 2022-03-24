
import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CartIcon from '../Shared/CartIcon'
//Stacks
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
import { AntDesign, Entypo } from '@expo/vector-icons';
import AuthGlobal from '../Context/store/AuthGlobal';

const Tab = createBottomTabNavigator();

const Main = () => {
    const context = useContext(AuthGlobal)
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#e91e63'
            }}
        >
            <Tab.Screen name="Home" component={HomeNavigator} options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                    <AntDesign
                        name='home'
                        style={{ position: "relative" }}
                        color={color}
                        size={30}
                    />
                )

            }} />
            <Tab.Screen name="Cart" component={CartNavigator} options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                    <View>
                        <AntDesign
                            name='shoppingcart'
                            color={color}
                            size={30}
                        />
                        <CartIcon />
                    </View>

                )
            }} />
            {context.stateUser.user.isAdmin == true ? (
                <Tab.Screen name="Admin" component={AdminNavigator} options={{
                tabBarIcon: ({ color }) => (
                    <Entypo name="cog"
                        style={{ position: "relative" }}
                        color={color}
                        size={30}
                    />
                )
            }} />
            ):null}
            

            <Tab.Screen name="User" component={UserNavigator} options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                    <AntDesign
                        name='user'
                        color={color}
                        size={30}
                    />
                )
            }} />
        </Tab.Navigator>

    )
}

export default Main

const styles = StyleSheet.create({})