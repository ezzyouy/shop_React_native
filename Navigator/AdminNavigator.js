import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ProductsContainer from '../Screens/Products/ProductsContainer'
import Products from '../Screens/Admin/Products';
import Categories from '../Screens/Admin/Categories';
import Orders from '../Screens/Admin/Orders';
import ProductForm from '../Screens/Admin/ProductForm';

const Stack = createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Products'
                component={Products}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name='Categories'
                component={Categories}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name='Orders'
                component={Orders}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name='Product Form'
                component={ProductForm}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}
const AdminNavigator = () => {
  return (
    <MyStack />
  )
}

export default AdminNavigator