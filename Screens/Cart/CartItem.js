import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Text, Box, List, Avatar } from 'native-base'

const CartItem = (props) => {
    const data = props.item.item;
    const [quantity, setQuantity] = useState(props.item.item.quantity)
    return (
        <Box
            style={styles.listItem}
            key={Math.random()}
            avatar
        >
            <Box>
                <Avatar source={{ uri: data.image ? data.product.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }} />
            </Box>
            <Box style={styles.body}>
                <Box>
                    <Text>{data.name}</Text>
                </Box>
            </Box>
            <Box>
                <Text>{data.price}</Text>
            </Box>
        </Box>
    )
}
const styles = StyleSheet.create({
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
      },
      body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
      }
})

export default CartItem