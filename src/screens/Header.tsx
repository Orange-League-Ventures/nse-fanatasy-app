import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomText from '../common/CustomText';

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
            <TouchableOpacity onPress={() => {
              // props.navigation.navigate()
            }}>
              <Image
                source={require('../../assets/images/backIcon.png')}
                style={styles.image}
              />
            </TouchableOpacity>

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
            <CustomText style={styles.titlename}>{props.title} </CustomText>
          )
        }
      </View>
      <View style={styles.container}>
        {
          (props?.totalPages && props?.currentPage) ? (
            <CustomText style={styles.pageNumber}>{props.currentPage} / {props?.totalPages} </CustomText>
          ) : (
            null
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
    marginHorizontal: 16,
    padding: 10,

    // backgroundColor: 'red',

  },
  leftImages: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 8, // Adjust spacing between images as needed
  },
  container: {
    // height : 0,
    flex: 1, // Make the container take up the full width
    justifyContent: 'center',

    alignItems: 'center', // Optional for vertical centering if needed
  },
  logo: {
    width : 100,
    height : 40,
    flex: 1, // Allow logo to grow and center itself within the available space
    resizeMode: 'contain', // Ensure logo scales properly
    alignSelf: 'flex-start', // Center the logo vertically within the header
  },
  titlename: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    color: '#03050A',
  },
  pageNumber: {
    marginLeft: 100,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    color: '#03050A',
  }
});

export default Header;
