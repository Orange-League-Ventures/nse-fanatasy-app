import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Profile from './Profile'
import DailyChallanges from './DailyChallanges'
import DailyLearning from './DailyLearning'


const Home = () => {
  return (
    <View>
      <Profile/>
      <DailyChallanges/>
      <DailyLearning/>
    </View>
  )
}

const styles= StyleSheet.create({
    heading:{
        color:'black',
        fontSize:30
    }
  })

export default Home
