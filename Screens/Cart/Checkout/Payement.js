import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Box, Container, Heading, Radio } from 'native-base'
import { Header, ListItem } from 'react-native-elements'
import { Button, Picker } from 'react-native-web'

const methodes = [
  { name: 'Cash on Delivery', value: 1 },
  { name: 'Bank Transfer', value: 2 },
  { name: 'Card Payment', value: 3 },
]
const paymentCards = [
  { name: 'Wallet', value: 1 },
  { name: 'Visa', value: 2 },
  { name: 'MasterCard', value: 3 },
  { name: 'Other', value: 4 },
]
const Payement = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState()
  const [card, setCard] = useState(second)
  return (
    <Container>
      <Header>
        <Box>
          <Heading>Choose your payement method</Heading>
        </Box>
        <Box>
          {methodes.map((item, index) => {
            return (
              <ListItem key={item.name} 
              onPress={() => setSelected(item.value)}>
                <Box>
                  <Text>{item.name}</Text>
                </Box>
                <Box>
                  <Radio
                    selected={selected == item.value}
                  />
                </Box>
              </ListItem>
            )
          })}
          {selected == 3 ? (
            <Picker
              mpde='dropdown'
              iosIcon={<Icon name={"arrow-down"} />}
              headerStyle={{ backgroundColor: 'orange' }}
              headerBackButtonTextStyle={{ color: '#fff' }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={card}
              onValueChange={(x) => setCard(x)}
            >
              {paymentCards.map((c, index) => {
                return <Picker.Item key={c.name} label={c.name} value={c.name} />
              })}
            </Picker>
          ) : null}
          <View style={{ marginTop: 60, alignSelf: 'center' }}>
            <Button title={'Confirm'} onPress={() => props.navigation.navigate("Confirm", { order })} />
          </View>
        </Box>
      </Header>
    </Container>
  )
}

export default Payement