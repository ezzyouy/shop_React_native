import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Button,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-vector-icons/Icon";
import EasyButton from "../../Shared/StyledComponent/EasyButton";

var { width, height } = Dimensions.get("window");
const ListItem = (props) => {
  const [modelVisible, setModelVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modelVisible}
        onRequestClose={() => {
          setModelVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modelView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              onPress={() => setModelVisible(false)}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>

            <EasyButton
              medium
              secondary
              onPress={() => [
                props.navigation.navigate("Product Form"),
                setModelVisible(false),
              ]}
            >
              <Text style={styles.textStle}>Edit</Text>
            </EasyButton>
            <EasyButton
              medium
              danger
              onPress={() => [props.delete(props._id), setModelVisible(false)]}
            >
              <Text style={styles.textStle}>Delete</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Product Detail", { item: props });
        }}
        onLongPress={() => setModelVisible(true)}
        style={[
          styles.container,
          { backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro" },
        ]}
      >
        <Image
          style={styles.image}
          source={{
            uri: props.image
              ? props.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
        <Text style={styles.item}>{props.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.name}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.category.name}
        </Text>
        <Text style={styles.item}>${props.price}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexDirection: "wrap",
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    marginTop: 22,
  },
  modelView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ListItem;
