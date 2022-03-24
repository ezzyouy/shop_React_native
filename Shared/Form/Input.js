import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

const Input = (props) => {
    return (
        <TextInput
            style={styles.input }
            placeholder={props.placeholder}
            name={props.name}
            id={props.id}
            value={props.value}
            autoCorrect={props.autoCorrect}
            onChangeText={props.onChangeText}
            onFocus={props.onFocus}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
        >

        </TextInput>
    )
}
const styles = StyleSheet.create({
  input:{
      width:'80%',
      heigth:60,
      backgroundColor:'white',
      margin:10,
      borderRadius:20,
      borderWidth:2,
      padding:10,
      borderColor:'orange'
  },
})

export default Input