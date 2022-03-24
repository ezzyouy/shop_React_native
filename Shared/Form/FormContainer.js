import { View, Text,ScrollView, Dimensions, StyleSheet } from 'react-native'
import React from 'react'

var {width }= Dimensions.get('window')
const FormContainer = (props) => {
  return (
   <ScrollView contentContainerStyle={styles.container}>
       <Text style={styles.title}>{props.title}</Text>
       {props.children}
   </ScrollView>
  )
}
const styles = StyleSheet.create({
    container:{
        marginTop:30,
        marginBottom:400,
        width:width,
        justifyContent:'center',
        alignContent:'center'
    },
    title:{
        fontSize:30
    }
})

export default FormContainer