import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AuthState } from '../interfaces/autInterfaces';

const Welcome = (props:any) => {
  const details = useSelector((state: AuthState)  => state?.auth);
  const navigation = useNavigation();
 const data=details?.user;
 console.log("data in welcome--",details);
    return (
    <View style={styles.welcome}>
      <View style={styles.started}>
      <View style={styles.container1}>
        <View style={styles.left}>
          <Text style={styles.textinfo}>
            Your Account Has Been Created Successfully
          </Text>
        </View>
        <View style={styles.right}>
          <Image
            style={styles.image}
            source={require('../../assets/images/Welcome.png')}
          />
        </View>
      </View>
      <View style={styles.container2}>
      <Text style={styles.textContainer}>
      <Text style={styles.welcomeText}>Welcome aboard! </Text>
      <Text style={styles.userNameText}>{data?.name}</Text>
    </Text>
        <Text style={styles.descriptionText}>
          Your account is ready. Get ready to conquer the stock market with fun
          and games!
        </Text>
      </View>
      <TouchableOpacity
          style={styles.createButton}
          onPress={() => props.navigation.navigate('HomeScreen')}
          activeOpacity={1}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    display:'flex',
    width: 'auto',
    height: 'auto',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  started: {
    marginLeft: 16,
    marginRight: 16,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal:0,
    marginHorizontal:14,
    marginBottom:12,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  container2: {
    width: 'auto',
    height: 'auto',
    paddingVertical: 8,
    paddingHorizontal:0,
    marginHorizontal:14
  },
  textinfo: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    color: '#007A00', // adjust this as needed
  },
  image: {
    backgroundColor: '#007A00',
    width: 'auto',
    height: 'auto',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    color: '#03050A',
  },
  userNameText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    color: '#E66F25',
  },

  descriptionText: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15.6,
    color: '#717171',
  },
  createButton: {
    backgroundColor: '#3A2D7D',
    width: 328,
    height: 'auto',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    color: '#000000',
    borderColor: '#D4D4D4',
    marginBottom: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '100',
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default Welcome;
