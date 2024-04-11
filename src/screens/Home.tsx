import React from 'react'
import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import Profile from './Profile'
import DailyChallanges from './DailyChallanges'
import DailyLearning from './DailyLearning'
import Header from './Header'
// import { ScrollView } from 'react-native'


const Home = () => {
  return (
    <ScrollView>
      <Header />
      <Profile isHome={true} />
      <DailyChallanges />
      <DailyLearning />
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
