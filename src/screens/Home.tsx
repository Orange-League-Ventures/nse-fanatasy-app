import React from 'react'
import { StyleSheet, Text, View ,ScrollView, Button} from 'react-native'
import Profile from './Profile'
import DailyChallanges from './DailyChallanges'
import DailyLearning from './DailyLearning'
import Header from './Header'



const Home = (props: any) => {
  return (
    <ScrollView style={styles.container}>
      <Header isHome={true} isTab={true} />
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
  },
  container : {
    backgroundColor : '#fff'
  }
})

export default Home
