import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Header = (props: any) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftImages}>
        {
          props?.isTab ? (
            <Image
              source={require('../../assets/images/menu.png')}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../assets/images/backIcon.png')}
              style={styles.image}
            />
          )
        }

      </View>
      <View style={styles.container}>
      {
        props?.isHome ? (
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        ) : (
          <Text style={styles.titlename}>{props.title} </Text>
        )
      }
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  leftImages: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 8, // Adjust spacing between images as needed
  },
  container: {
    flex: 1, // Make the container take up the full width
    justifyContent: 'center',
    alignItems: 'center', // Optional for vertical centering if needed
  },
  logo: {
    flex: 1, // Allow logo to grow and center itself within the available space
    resizeMode: 'contain', // Ensure logo scales properly
    alignSelf: 'center', // Center the logo vertically within the header
  },
  titlename: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    color: '#03050A',
   
  },
});

export default Header;
