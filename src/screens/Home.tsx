import React from 'react'
import { StyleSheet, Text, View ,ScrollView, Button} from 'react-native'
import Profile from './Profile'
import DailyChallanges from './DailyChallanges'
import DailyLearning from './DailyLearning'
import Header from './Header'
// import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to the Login screen
    navigation.navigate('Login');
  };

  return (
    <ScrollView>
      <Header isHome={true} isTab={true} />
      <Profile isHome={true} />
      <DailyChallanges />
      <DailyLearning />
      <Button title="Login" onPress={handlePress} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontSize: 30
  }
})

export default Home
