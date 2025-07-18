import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/Auth/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
  <SafeAreaProvider>
    <ToastProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ToastProvider>
  </SafeAreaProvider>
  )
}

export default App
