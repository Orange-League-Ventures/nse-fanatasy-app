import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomText from '../common/CustomText';

const windowWidth: number = Dimensions.get('window').width;
const windowHeight: number = Dimensions.get('window').height;
const imageContainerWidth: number = (windowWidth - 40) / 2;
const ChartSection = (props: any) => {
  // const handleImageClick =

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Understanding Charts</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ChartList', {
              state: {chart_type: 'line'},
            });
          }}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/linechart_4x.png')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ChartList', {
              state: {chart_type: 'candelstick'},
            });
          }}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/candlestick_4x.png')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.chartPatternContainer}>
        <Image
          source={require('../../assets/images/chartPattern_4x.png')}
          style={styles.chartImage}
        />
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
    width: (windowWidth - 32),
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
    fontFamily : 'Roboto-Medium',
  },
});

export default ChartSection;
