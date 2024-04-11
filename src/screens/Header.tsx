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
      {
        props?.isHome ? (
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        ) : (
          <Text >{props.title}</Text>
        )
      }

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingTop: 10,
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
  headerText: {
    marginLeft: 20
  }
});

export default Header;
