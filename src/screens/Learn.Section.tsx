import React from 'react'
import { StyleSheet, View } from 'react-native'
import ChartSection from './ChartSection'
import Disctionary from './Disctionary'
import { ScrollView } from 'react-native'
import Header from './Header'

const LearnSection = (props: any) => {
  return (
    <View>
      <Header title={"Learn"} isTab={true} />
      <ScrollView style={styles.mainContainer}>
        <ChartSection navigation={props.navigation} />
        <Disctionary />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: 20
  }
})

export default LearnSection
