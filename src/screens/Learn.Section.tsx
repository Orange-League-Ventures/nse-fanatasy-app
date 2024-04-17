import React from 'react'
import { StyleSheet, View } from 'react-native'
import ChartSection from './ChartSection'
import Dictionary from './Disctionary'
import { ScrollView } from 'react-native'
import Header from './Header'

const LearnSection = (props: any) => {
  return (
    <View>
      <Header title={"LEARN"} isTab={true} />
      <ScrollView style={styles.mainContainer}>
        <ChartSection navigation={props.navigation} />
        <Dictionary />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 16
  }
})

export default LearnSection
