import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.leftImages}>
        {/* <Image
          source={require('../../assets/images/image1.png')}
          style={styles.image}
        /> */}
        <Image
          source={require('../../assets/images/menu.png')}
          style={styles.image}
        />
        {/* Add more images here if needed */}
      </View>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  leftImages: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 8, // Adjust spacing between images as needed
  },
  logo: {
    flex: 1, // Allow logo to grow and center itself within the available space
    resizeMode: 'contain', // Ensure logo scales properly
    alignSelf: 'center', // Center the logo vertically within the header
  },
});

export default Header;
