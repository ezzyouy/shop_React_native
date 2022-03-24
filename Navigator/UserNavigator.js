import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ProductsContainer from '../Screens/Products/ProductsContainer'
import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import UserProfil from '../Screens/User/UserProfil';
const Stack = createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name='Register'
                component={Register}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name='User Profil'
                component={UserProfil}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}
const UserNavigator = () => {
  return (
    <MyStack />
  )
}

export default UserNavigator