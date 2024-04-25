import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { contentByTopic } from '../services/contentService';
import { useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { windowHeight, windowWidth } from '../common/Dimensions';

import Header from './Header';
import CustomText from '../common/CustomText';
import { contentByTopicId } from '../services/topicservice';

const Content = (props: any) => {
  const route: any = useRoute();
  const { width } = useWindowDimensions();

  const topic_id = route?.params?.state?.topic_id;
  const lesson_id = route?.params?.state?.lesson_id;
  const lesson_name = route?.params?.state?.lesson_name;


  const [contentItem, setContentItem] = useState<any>();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    // props.navigation.setOptions({
    //   headerTitle: `Page ${currentPage} / ${totalPages}`,
    // });
    setLoading(true)
    contentByTopicId({ topic_id })
      .then(response => {
        const contentResult = response?.data?.content;
        setContentItem(contentResult[0]);
        setLoading(false)

      })
      .catch(error => {
        setLoading(false)
        // console.log('ERR');
      });
  };

  return (
    <>
      <ScrollView>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3A2D7D" />
          </View>
        )}
        <View style={styles.container}>
          {contentItem && (
            <>
              {contentItem.content_image ? (
                <Image
                  source={{ uri: contentItem.content_image }}
                  style={styles.image}
                />
              ) : null}
              <RenderHtml
                contentWidth={width}
                source={{ html: contentItem?.content_value }}
                baseStyle={{ color: 'black', fontSize: 14, fontWeight: '400' }}
              />
            </>
          )}
          {(contentItem && contentItem?.content_value.length > (windowHeight - 50)) && <View style={{ ...styles.footer }}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                props.navigation.navigate("ChartList", { state: { lesson_id, lesson_name } })
              }}
            >
              <Text style={styles.buttonText}>Completed</Text>
            </TouchableOpacity>
          </View>}
        </View>
      </ScrollView>
      {/* {(contentItem && contentItem?.content_value.length < (windowHeight - 50)) && <View style={{ ...styles.footer, marginHorizontal: 16 }}>
        <TouchableOpacity
          style={styles.nextButton}
          // onPress={onNextPage}
          disabled={currentPage === totalPages} // Disable the button if currentPage equals totalPages
        >
          <Text style={styles.buttonText}>Completed</Text>
        </TouchableOpacity>
      </View>} */}

    </>


  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: 'green',
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    height: 80,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 0,
    right: 0,
  },
  nextButton: {
    width: '100%',
    backgroundColor: '#3A2D7D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Content;
