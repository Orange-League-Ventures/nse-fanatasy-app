// ChartList.tsx

import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';
import { topicByChart } from '../services/topicservice';
import { useRoute } from '@react-navigation/native';
import CustomText from '../common/CustomText';
import CheckboxComponent from '../common/CheckBoxComponent';

interface ITopic {
  topic_name: string;
  icon: string;
  id: string;
}

const ChartList = (props: any) => {
  const route: any = useRoute();
  const chart_type = route?.params?.state?.chart_type;
  console.log({ chart_type });

  const [topicList, setTopicList] = useState<any>();
  const [selectedTopics, setSelectedTopics] = useState<any>();

  useEffect(() => {
    getTopics();
  }, []);

  const getTopics = async () => {
    topicByChart({ chart_type })
      .then((response) => {
        console.log({ data: response?.data });
        const topics = response?.data?.topics;
        console.log({ topics });
        setTopicList(topics);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const readContent = (topic_id: string, topic_name: String) => {
    console.log({ topic_id });

    props.navigation.navigate('Content', { state: { topic_id, topic_name } })
  }

  return (
    <View>
      <Header title={chart_type.charAt(0).toUpperCase() + chart_type.slice(1) + ' Chart'}  />
      <ScrollView>
        <CustomText style={styles.subTopicText}>Subtopics</CustomText>
        {topicList?.length > 0 ? (
          <>
            {topicList.map((topic: ITopic, index: number) => (
              <TouchableOpacity
                onPress={() => { readContent(topic?.id, topic?.topic_name) }}
                key={index}
                style={styles.topicItem}>
                {topic.icon ? (
                  <Image source={{ uri: topic.icon }} style={styles.icon} />
                ) : (
                  <View style={[styles.icon, styles.placeholder]} />
                )}
                <View style={styles.topicInfo}>
                  <Text style={styles.topicName}>
                    {topic.topic_name.charAt(0).toUpperCase() + topic.topic_name.slice(1)}
                  </Text>
                </View>
                <CheckboxComponent isChecked={false} onChange={(newValue) => { }} />
              </TouchableOpacity>
            ))}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  subTopicText: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15,
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 16
  },
  topicItem: {
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    marginHorizontal: 20,
    marginVertical: 10
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  topicName: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#03050A',
  },
  topicInfo: {
    flex: 1,
  },
  placeholder: {
    backgroundColor: '#ccc',
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default ChartList;
