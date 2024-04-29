import React from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import Button from '../common/Button';
import imageUrls from '../constants/imageurls';
import GlobalFonts from '../common/GlobalFonts';
import CustomButton from '../common/CustomButton';

const windowWidth = Dimensions.get('window').width;
const DailyChallanges = (props:any) => {
  
  return (
    <View style={styles.view1}>
      <View>
        <Text style={styles.text2}>Daily Challenges</Text>
      </View>

      <View style={styles.view5}>
        <Image source={imageUrls.dailyChallengeImg} style={styles.image1} />
      </View>

      <CustomButton
        onPress={() => props.navigation.navigate("Play")}
        title={`START THE QUIZ`}
        style={styles.view7}
        textStyle={styles.btnText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 16,
    flex: 1,
    marginTop:20
  },
  text2: {
    color: '#03050A',
    width: '100%',
    fontSize: 14,
    fontFamily : GlobalFonts.RobotoMedium,
  },
  view3: {
    alignItems: 'stretch',
    borderRadius: 8,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  view4: {
    alignItems: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    color: '#FFF',
    textAlign: 'center',
    justifyContent: 'center',
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
    paddingVertical: 12,
  },
  image1: {  
    width: windowWidth - 32,
    resizeMode: 'cover',
    height: windowWidth > 400 ? 360 : 300,
    borderRadius: 8,
  },
  view7: {
    borderRadius: 8,
    backgroundColor: '#25D366',
    color: '#FFF',
  },
  btnText : {
    fontFamily: GlobalFonts.MontserratSemiBold,
  },
  text8: {
    color: '#C35516',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 10,
    fontWeight: '400',
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
