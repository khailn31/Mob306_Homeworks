import { View, Text, Button } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View>
      <Button title="Bai7" onPress={()=>{
        navigation.navigate("Bai7")
      }} />
        <Button title="bai14" onPress={()=>{
        navigation.navigate("bai14")
      }} />
    </View>  
  )
}


export default Home 