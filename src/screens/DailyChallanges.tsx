import React from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import Button from '../common/Button';

const windowWidth = Dimensions.get('window').width;
const DailyChallanges = () => {
  return (
    <View style={styles.view1}>
      <View>
        <Text style={styles.text2}>Daily Challenges</Text>
      </View>

      <View style={styles.view5}>
        <Image
          source={require('../../assets/images/dailyChallenges.png')}
          style={styles.image1}
        />
      </View>

      <Button onPress={() => {}} title={`START THE QUIZ`} style={styles.view7} textStyle={''}/>
      <View>
        <Text style={styles.text8}>$Terms & Conditions Apply</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    display: 'flex',

    flexDirection: 'column',
    // backgroundColor: 'red',
    marginHorizontal: 16,
    flex: 1,
  },
  text2: {
    // marginLeft: 20,
    color: '#03050A',
    width: '100%',
    fontSize: 14,
    fontWeight: '500',
  },
  view3: {
    alignItems: 'stretch',
    borderRadius: 8,
    display: 'flex',
    // marginTop: 8,
    width: '100%',
    flexDirection: 'column',
  },
  view4: {
    alignItems: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    color: '#FFF',
    textAlign: 'center',
    justifyContent: 'center',
    //   padding: "8px 16px",
  },
  view5: {
    justifyContent: 'center',
    alignItems: 'stretch',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.50)',
    fontWeight: '400',
    paddingVertical:12,
  },
  view6: {fontFamily: 'Roboto, sans-serif'},
  image1: {
    width: (windowWidth-32),
    resizeMode :'contain',
    height: windowWidth > 400? 300 :  270,
    borderRadius: 8,
  },
  view7: {
    borderRadius: 8,
    backgroundColor: '#25D366',
    color: '#FFF',
    marginBottom: 12,
    
  },
  text8: {
    color: '#C35516',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 10,
    fontWeight : '400',
  },
  customButton: {
    backgroundColor: 'green',
    marginTop: 20,
  },
  customButtonText: {
    color: 'red',
    fontSize: 20,
  },
});

export default DailyChallanges;
