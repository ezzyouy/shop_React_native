import { View, Image, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/12.png')}
        resizeMode='contain'
        style={{height:50}}
        />
    </View>
  )
}
const styles = StyleSheet.create({
    header:{
        width:'100%',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        padding:60,
        marginTop:-20,
        marginBottom:-50
    }
})
export default Header