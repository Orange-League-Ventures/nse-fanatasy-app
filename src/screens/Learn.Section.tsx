import React from 'react'
import { StyleSheet, View } from 'react-native'
import ChartSection from './ChartSection'
import Dictionary from './Disctionary'
import { ScrollView } from 'react-native'
import Header from './Header'
import GlobalFonts from '../common/GlobalFonts'

const LearnSection = (props: any) => {
  return (
    <View>
      <Header title={"LEARN"} isTab={true}  style={styles.learn}/>
      <ScrollView style={styles.mainContainer}>
        <ChartSection navigation={props.navigation} />
        <Dictionary navigation={props.navigation} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 16
  },
  learn:{
    fontFamily:GlobalFonts.MontserratBold
  }
})

export default LearnSection
