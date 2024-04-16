import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Welcome = () => {
  return (
    <View style={styles.welcome}>
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
      <Text style={styles.userNameText}>Jitendra Singh</Text>
    </Text>
        <Text style={styles.descriptionText}>
          Your account is ready. Get ready to conquer the stock market with fun
          and games!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
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
});

export default Welcome;
