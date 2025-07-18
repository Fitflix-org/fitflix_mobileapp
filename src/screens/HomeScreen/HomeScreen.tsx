import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootStackParamList } from '../../navigation/types'; // Adjust path as needed
import { Text } from 'react-native';

const HomeScreen = () => {
    const { loading, error,user } = useSelector((state) => state.auth);
  
  return (
    <SafeAreaView>
      <Text>Welcome to Home Screen {user?.username}</Text>
    </SafeAreaView>
  )
}

export default HomeScreen
