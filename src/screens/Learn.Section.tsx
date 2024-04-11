import React from 'react'
import { StyleSheet, View } from 'react-native'
import ChartSection from './ChartSection'
import Disctionary from './Disctionary'
import { ScrollView } from 'react-native'

const LearnSection = () => {
  return (
    <ScrollView style={styles.mainContainer}>
        <ChartSection/>
        <Disctionary/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
      marginLeft:20
    }
  })

export default LearnSection
