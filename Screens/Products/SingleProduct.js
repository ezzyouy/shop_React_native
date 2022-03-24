import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container, Box, Heading, Avatar, Flex, HStack, VStack, Center } from 'native-base'
import Toast from 'react-native-toast-message'
import EasyButton from '../../Shared/StyledComponent/EasyButton'
import TrafficLight from '../../Shared/StyledComponent/TrafficLight'
const SingleProduct = (props) => {

    const [item, setItem] = useState(props.route.params.item);
    const [available, setAvailable] = useState(null);
    const [availabilityText, setAvailabilityText] = useState('')

    useEffect(() => {
      if(props.route.params.item.countInstock == 0){
          setAvailable(<TrafficLight unavailable></TrafficLight>);
          setAvailabilityText('Unavailable')
      }else if(props.route.params.item.countInstock <= 5){
        setAvailable(<TrafficLight limited></TrafficLight>);
        setAvailabilityText('Limited Stock')
    }else{
        setAvailable(<TrafficLight available></TrafficLight>);
        setAvailabilityText('Available')
    }
    
      return () => {
        setAvailable(null)
        setAvailabilityText('')
      }
    }, [])
    
    return (
        <Box style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: item.image ? item.image
                                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Heading style={styles.contentHeader}>{item.name}</Heading>
                    <Text style={styles.contentText}>{item.brand}</Text>
                </View>
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{marginRight:10}} >
                            availability:{availabilityText}
                        </Text>
                        {available}
                    </View>
                    <Text>{item.description}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Box >
                    <Text style={styles.price}>${item.price}</Text>
                </Box>
                <Center flex={1} flexDirection={'row-reverse'} marginRight={220} >
                    <EasyButton
                        primary
                        medium
                        onPress={() => {
                            props.addToCart(item.id),
                                Toast.show({
                                    topOffset: 60,
                                    type: 'success',
                                    text1: `${name} added to Cart`,
                                    text2: 'Go to your cart to complete order'
                                })
                        }}
                    >
                        <Text style={{color:'white'}}>Add</Text>
                    </EasyButton>
                </Center>
            </View>
        </Box>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: -10
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    },
    availabilityContainer:{
        marginBottom:20,
        alignItems:'center',

    },
    availability:{
        flexDirection:'row',
        margin: 10
    }
})
export default SingleProduct