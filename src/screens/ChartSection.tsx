import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { fetchLessons } from '../services/lessonService';

const windowWidth: number = Dimensions.get('window').width;
const windowHeight: number = Dimensions.get('window').height;
const imageContainerWidth: number = (windowWidth - 40) / 2;
const ChartSection = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState<any>([])

  useEffect(() => {
    setLoading(true)
    const wordsGroupByLetter = () => {
      fetchLessons()
        .then(response => {
          setLoading(false)
          setLessons(response?.data?.lessons);
        })
        .catch(error => {
          setLoading(false)
          console.log({ error });
        });
    };
    wordsGroupByLetter();
  }, [])

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Understanding Charts</Text>
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3A2D7D" />
        </View>
      )}
      <View style={styles.container}>
        {
          lessons.length > 0 ? (
            <>
              {
                lessons.map((item: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      props.navigation.navigate('ChartList', {
                        state: { lesson_id: item?.id, lesson_name: item?.lesson_name },
                      });
                    }}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: item?.lessong_image }}
                        style={styles.image}
                      />
                    </View>
                  </TouchableOpacity>
                ))
              }
            </>
          ) : null
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: windowWidth - 32,
    justifyContent: 'space-between',
    gap: 4,
  },
  imageContainer: {
    overflow: 'hidden',
    marginTop: 12,
  },
  image: {
    height: 180,
    borderRadius: 8,
    width: imageContainerWidth,
    resizeMode: 'cover',
  },
  chartPatternContainer: {
    width: windowWidth - 32,
    // backgroundColor :'green',
    height: 180,
    marginTop: 12,
  },
  textContainer: {
    marginTop: 8,
  },
  chartImage: {
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
    width: windowWidth - 32,
  },
  headingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    position: 'absolute',
    marginTop: 100,
    marginBottom: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ChartSection;
