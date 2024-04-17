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
  const handleImageClick = () => {
    // chartType will be passed as state
    props.navigation.navigate('ChartList');
  };

  return (
    <View>
      <View style={styles.textContainer}>
        <CustomText style={styles.headingText}>Understanding Charts</CustomText>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleImageClick}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/linechart_4x.png')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/candlestick_4x.png')}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.chartPatternContainer}>
        <Image source={require('../../assets/images/chartPattern_4x.png')} style={styles.chartImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: (windowWidth - 32),
    justifyContent: 'space-between',
    gap: 4,
  },
  imageContainer: {
    overflow: 'hidden',
    marginTop : 12,

  },
  image: {
    height: 180,
    borderRadius: 8,
    width: imageContainerWidth,
    resizeMode: 'cover',

  },
  chartPatternContainer: {
    width : (windowWidth - 32),
    // backgroundColor :'green',
    height : 180,
    marginTop : 12,  
  },
  textContainer: {
    marginTop : 8,

  },
  chartImage : {
    height : 180,
    resizeMode : 'cover',
    borderRadius : 8,
    width : (windowWidth - 32),
  },
  headingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
});

export default ChartSection;
