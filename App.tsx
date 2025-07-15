import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/Auth/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen/RegisterScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen name='login' component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name='register' component={RegisterScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
  )
}

export default App
