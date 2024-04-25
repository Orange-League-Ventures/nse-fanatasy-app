// ChartList.tsx

import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, ActivityIndicator } from 'react-native';
import Header from './Header';
import { topicsByLessonId } from '../services/topicservice';
import { useRoute } from '@react-navigation/native';
import CustomText from '../common/CustomText';
import CheckboxComponent from '../common/CheckBoxComponent';
import { windowHeight, windowWidth } from '../common/Dimensions';

interface ITopic {
  topic_name: string;
  icon: string;
  id: string;
}
const ChartList = (props: any) => {
  const route: any = useRoute();
  const lesson_id = route?.params?.state?.lesson_id;
  const lesson_name = route?.params?.state?.lesson_name;

  const [topicList, setTopicList] = useState<any>();
  const [selectedTopics, setSelectedTopics] = useState<any>();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getTopics();
  }, []);

  const getTopics = async () => {
    setLoading(true)
    setTopicList([])
    topicsByLessonId({ lesson_id })
      .then((response) => {
        const topics = response?.data?.topics;
        setTopicList(topics);
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log("ERROR", error);
      });
  };

  const readContent = (topic_id: string, topic_name: String) => {
    props.navigation.navigate('Content', { state: { topic_id, topic_name, lesson_id, lesson_name } })
  }

  return (
    <View style={styles.mainContainer}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3A2D7D" />
        </View>
      )}
      <ScrollView>
        <CustomText style={styles.subTopicText} text={'Subtopics'} />
        {topicList?.length > 0 ? (
          <>
            {topicList.map((topic: ITopic, index: number) => (
              <TouchableOpacity
                onPress={() => { readContent(topic?.id, topic?.topic_name) }}
                key={index}
                style={styles.topicItem}>
                <Image
                  source={{ uri: 'https://miro.medium.com/v2/resize:fit:750/1*D7gcAmZzNaPvMtX7VjaVUg.png' }}
                  style={styles.icon}
                  onError={e => {
                    console.log("ERROR", e);
                  }}
                />
                <View style={styles.topicInfo}>
                  <Text style={styles.topicName}>
                    {topic.topic_name.charAt(0).toUpperCase() + topic.topic_name.slice(1)}
                  </Text>
                </View>

              </TouchableOpacity>
            ))}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#fff'
  },
  subTopicText: {
    marginLeft: 16,
    marginTop: 20,
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
    marginHorizontal: 16,
    marginTop: 12,
  },
  icon: {
    width: 50,
    height: 50,
    // borderRadius: 25,
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ChartList;
