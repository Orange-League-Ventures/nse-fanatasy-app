import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Header from './Header'
import { topicByChart } from '../services/topicservice'

const ChartList = (props: any) => {
  const { chart_type } = props;
  const limit = 1;
  const [page, setPage] = useState(1);
  useEffect(() => {
    getTopics()
  }, [])

  const getTopics = async () => {
    topicByChart({ chart_type }).then(
      (response) => {
        console.log({ data: response?.data });
      }
    ).catch((error) => {
      console.log(error);

    })
  }

  return (
    <View>
      <ScrollView>
        <Text>Chart List</Text>
      </ScrollView>
    </View>

  )
}

export default ChartList
