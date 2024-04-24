import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {contentByTopic} from '../services/contentService';
import {useRoute} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import {windowHeight} from '../common/Dimensions';

import CustomText from '../common/CustomText';

const Content = (props: any) => {
  const route: any = useRoute();
  const {width} = useWindowDimensions();

  const topic_id = route?.params?.state?.topic_id;
  const topic_name = route?.params?.state?.topic_name;

  const [contentItem, setContentItem] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getContent();
  }, [currentPage, totalPages]);

  const getContent = async () => {
    props.navigation.setOptions({
      headerTitle: `Page ${currentPage} / ${totalPages}`,
    });
    contentByTopic({page: currentPage, limit: 1, topic_id})
      .then(response => {
        console.log({data: response?.data});
        const contentResult = response?.data?.content;
        setContentItem(contentResult?.rows[0]);
        setTotalPages(contentResult?.count);
      })
      .catch(error => {
        console.log('ERR', error);
      });
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <ScrollView>
        {/* <Header title={topic_name.charAt(0).toUpperCase() + topic_name.slice(1)} currentPage={currentPage} totalPages={totalPages} /> */}
        <View style={styles.container}>
          {contentItem && (
            <>
              <CustomText />
              {contentItem.content_image ? (
                <Image
                  source={{uri: contentItem.content_image}}
                  style={styles.image}
                />
              ) : null}
              <RenderHtml
                contentWidth={width}
                source={{html: contentItem?.content_value}}
                baseStyle={{color: 'black', fontSize: 14, fontWeight: '400'}}
              />
            </>
          )}
          {contentItem &&
            contentItem?.content_value.length > windowHeight - 50 && (
              <View style={{...styles.footer}}>
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={onNextPage}
                  disabled={currentPage === totalPages} // Disable the button if currentPage equals totalPages
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
      </ScrollView>
      {contentItem && contentItem?.content_value.length < windowHeight - 50 && (
        <View style={{...styles.footer, marginHorizontal: 16}}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={onNextPage}
            disabled={currentPage === totalPages} // Disable the button if currentPage equals totalPages
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    flex: 1,
    // backgroundColor : 'red',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: 'green',
    resizeMode: 'cover',
    // marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    height: 80,
    // backgroundColor : 'red',
  },
  // pageNumber: {
  //     justifyContent: 'space-between',
  //     fontSize: 16,
  // },
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
