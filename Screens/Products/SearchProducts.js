import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Avatar, Box, Container, IconButton, Image, InputLeftAddon, List, ScrollView } from 'native-base';

var {width} = Dimensions.get('window')
const SearchProducts = (props) => {
    const {productsFiltered}=props;
  return (
        <ScrollView style={{width:width}}>
            {productsFiltered.length > 0 ?(
                productsFiltered.map((item)=>(
                    <Box
                        key={item._id}
                        avatar
                        style={{flex:1, flexDirection:'row', paddingTop:10}}
                    >
                        <Container>
                            <Avatar
                                source={{uri:item.image? item.image
                                        : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
                            />
                        </Container>
                        <Box  style={{alignSelf:'center', marginLeft:10}}>
                            <Text style={{fontWeight:'500'}}>{item.name}</Text>
                            <Text style={{fontWeight:'200'}}>{item.description}</Text>
                        </Box>
                    </Box>
                ))
            ):(
                <View style={styles.center}>
                    <Text style={{alignSelf:'center'}}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </ScrollView>
  )
}

const styles = StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    }
})
export default SearchProducts