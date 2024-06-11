import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomText from '../common/CustomText';
import {windowWidth} from '../common/Dimensions';
import imageurl from '../constants/imageurls';
import GlobalFonts from '../common/GlobalFonts';

const Header = (props: any) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftImages}>
        {props?.isTab ? (
          <></>
        ) : (
          <TouchableOpacity
            onPress={() => {
              // props.navigation.navigate()
            }}>
            <Image
              source={require('../../assets/images/backIcon.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.container}>
        {props?.isHome ? (
          <Image source={imageurl.nseLogo4x} style={styles.logo} />
        ) : (
          <Text style={[styles.titlename,props.style]}>{props.title}</Text>
        )}
      </View>
      {/* <View style={styles.container}>
        {props?.totalPages && props?.currentPage ? (
          <CustomText
            style={styles.pageNumber}
            text={`${props.currentPage} / ${props?.totalPages}`}
          />
        ) : null}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 10,
  },
  leftImages: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 8, // Adjust spacing between images as needed
  },
  container: {
    width: '100%',
    // flex: 1, // Make the container take up the full width
    justifyContent: 'center',
    alignItems: 'center', // Optional for vertical centering if needed
    marginBottom:8,
  },
  logo: {
    width: 150,
    height: 50,
    flex: 1, // Allow logo to grow and center itself within the available space
    resizeMode: 'contain', // Ensure logo scales properly
    // alignSelf: 'flex-start',
    alignSelf:'center'
  },
  titlename: {
    fontFamily: GlobalFonts.MontserratBold,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 21,
    color: '#03050A',
    alignSelf: 'center',
  },
  pageNumber: {
    marginLeft: 100,
    fontFamily: GlobalFonts.MontserratSemiBold,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    color: '#03050A',
  },
});

export default Header;
