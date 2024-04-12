import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Header from './Header';

const Profile = (props: any) => {
  console.log('props-----', props.isHome);
  return (
    <View >
      <View>
        {!props?.isHome ? <Header title={'Profile'} isTab={true} /> : null}
      </View>
      {props?.isHome ? (
        <View style={styles.container}>
          <View style={styles.left}>
            <Image
              source={{
                uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0afdad6062808b75f0c28108ce49a468ccef7d64aa18f95e1d0f05400491f9e5?apiKey=7f48bd1f1f1e45f5914640147dc815d6&',
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.right}>
            <Text style={styles.text1}>Good morning!!</Text>
            <Text style={styles.text2}>Jitendra Singh</Text>
          </View>
        </View>
      ) : (
        <View style={styles.subcontainer}>
          <View style={styles.section}>
            {/* <Image style={styles.humberger} source={require('../../assets/images/humberger.png')} /> */}
            <Text style={styles.heading}>PROFILE</Text>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.imagecontainer}>
              <Image
                style={styles.profileimage}
                source={require('../../assets/images/image.png')}
              />
            </View>
            <View style={styles.Referaldetails}>
              <View style={styles.left2}>
                <Text style={styles.refercode}>Referal Code</Text>
                <Text style={styles.code}>JITENDRA3260</Text>
              </View>
              <View style={styles.right2}>
                <Text style={styles.copy}>Copy</Text>
              </View>
            </View>
            <View style={styles.details}>
              <View style={styles.left2}>
                <Text style={styles.detailsName}>Jitender Singh</Text>
                <Text style={styles.refercode}>Name</Text>
              </View>
              <View style={styles.right2}>
                <Image
                  style={styles.editIcon}
                  source={require('../../assets/images/EditIcon.png')}
                />
              </View>
            </View>
            <View style={styles.details}>
              <View style={styles.left2}>
                <Text style={styles.detailsName}>+91 9521797178</Text>
                <Text style={styles.refercode}>Phone Number</Text>
              </View>
              <View style={styles.right2}>
                <Image
                  style={styles.editIcon}
                  source={require('../../assets/images/EditIcon.png')}
                />
              </View>
            </View>
            <View style={styles.details}>
              <View style={styles.left2}>
                <Text style={styles.detailsName}>
                  keshav@onelabventures.com
                </Text>
                <Text style={styles.refercode}>Email</Text>
              </View>
              <View style={styles.right2}>
                <Image
                  style={styles.editIcon}
                  source={require('../../assets/images/EditIcon.png')}
                />
              </View>
            </View>
            <View style={styles.details}>
              <View style={styles.left2}>
                <Text style={styles.detailsName}>*********</Text>
                <Text style={styles.refercode}>Password</Text>
              </View>
              <View style={styles.right2}>
                <Image
                  style={styles.editIcon}
                  source={require('../../assets/images/EditIcon.png')}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 8,
  },
  left: {
    marginRight: 8,
  },
  right: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: 40,
    height: 40,
    aspectRatio: 1,
  },
  text1: {
    color: '#717171',
    marginBottom: 4,
  },
  text2: {
    color: '#03050A',
  },
  subcontainer: {
    backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
  },
  section: {
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    paddingBottom: 24,
    borderRadius: 8,
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#03050A',
  },
  profileContainer: {
    height: 'auto',
    paddingTop: 8,
  },
  Referaldetails: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 16,
    borderRadius: 8,
  },
  details: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  imagecontainer: {
    alignItems: 'center',
  },
  profileimage: {
    width: 120,
    height: 120,
    borderRadius: 32,
    borderWidth: 3,
  },
  refercode: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15.6,
    color: '#717171',
  },
  code: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    textAlign: 'left',
    color: '#C35516',
  },
  detailsName: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 15.6,
    textAlign: 'left',
    color: '#03050A',
  },
  copy: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    textAlign: 'left',
    color: '#3A2D7D',
  },
  left2: {
    flex: 1,
  },
  right2: {
    marginLeft: 'auto',
    justifyContent: 'center',
  },
  editIcon: {
    width: 15,
    height: 15,
  },
});


export default Profile;
