import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Header from './Header'

const ChartList = () => {
  return (
    <View>
      <Header isHome={true} isTab={true} />
      <ScrollView>
        <Text>Chart List</Text>
      </ScrollView>
    </View>

  )
}

export default ChartList
