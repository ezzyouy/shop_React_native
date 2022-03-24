import { Dimensions, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import ProductCard from './ProductCard';

var {width} = Dimensions.get('window');
const ProductList=(props)=> {
    const {item} =props;
  return (
    <TouchableOpacity 
      style={{width:'50%'}} 
      onPress={()=>
        props.navigation.navigate("Product Detail", {item:item})
      }
      >
        <View style={{width:width/2}}>
             <ProductCard {...item} />
           
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})

export default ProductList