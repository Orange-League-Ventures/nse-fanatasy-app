import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Profile from './Profile'
import DailyChallanges from './DailyChallanges'
import DailyLearning from './DailyLearning'
import Header from './Header'


const Home = () => {
  return (
    <View>
      <Header />
      <Profile isHome={true} />
      <DailyChallanges />
      <DailyLearning />
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontSize: 30
  }
})

export default Home
