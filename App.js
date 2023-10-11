import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Bai7 from './Bai7';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import bai14 from './bai14';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
  
     <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="HomeWork"
          component={Home}
          options={{ title: 'HomeWork' }}
        />
        <Stack.Screen
          name="Bai7"
          component={Bai7}
          options={{ title: 'Album' }}
        />
         <Stack.Screen
          name="bai14"
          component={bai14}
          options={{ title: 'Album' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
