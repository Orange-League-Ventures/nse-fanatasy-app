import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AuthState} from '../interfaces/autInterfaces';
import imageUrls from '../constants/imageurls';
import Button from '../common/Button';
import {windowWidth} from '../common/Dimensions';

const Welcome = (props: any) => {
  const details = useSelector((state: AuthState) => state?.auth);
  const data = details?.user;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.welcome}>
        <View style={styles.started}>
          <View style={styles.container1}>
            <View style={styles.left}>
              <Text style={styles.textinfo}>
                Your Account Has Been Created Successfully
              </Text>
            </View>
            <View style={styles.right}>
              <Image style={styles.image} source={imageUrls.iconParkSuccess} />
            </View>
          </View>
          <View style={styles.container2}>
            <Text style={styles.textContainer}>
              <Text style={styles.welcomeText}>Welcome aboard! </Text>
              <Text style={styles.userNameText}>{data?.name}</Text>
            </Text>
            <Text style={styles.descriptionText}>
              Your account is ready. Get ready to conquer the stock market with
              fun and games!
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.buttonStyle} textStyle={styles.textStyle} title={'Get Started'} onPress={() => props.navigation.navigate('Home')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  welcome: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#F8F8F8',
  },
  started: {
    marginBottom: 16,
    marginHorizontal: 16,
    marginTop: 32,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  left: {
    width: '60%',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  container2: {
    display: 'flex',
    rowGap: 4,
    paddingVertical: 8,
  },
  textinfo: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 21,
    color: '#007A00',
  },
  image: {
    width: 50,
    height : 50,
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 21,
    color: '#03050A',
  },
  userNameText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 21,
    color: '#E66F25',
  },
  descriptionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 15.6,
    color: '#717171',
  },

  buttonStyle: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
  },

  textStyle : {
    fontFamily :'Roboto-Medium',
    fontSize : 14,
  },

  buttonContainer: {
    width: (windowWidth - 32),
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 32,
  },
});

export default Welcome;
