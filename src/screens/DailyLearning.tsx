import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalFonts from '../common/GlobalFonts';

const DailyLearning = () => {
  return (
    <View style={styles.view1}>
      <Text style={styles.text1}>Daily Learning</Text>

      <View style={styles.view3}>
        <Text style={styles.text2}>Resume Learning</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 16,
    marginVertical: 24,
  },

  view3: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: '#D4D4D4',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 8,
    height: 100,
  },
  text1: {
    color: 'black',
    fontSize : 14, 
    fontFamily : GlobalFonts.RobotoMedium,
  },
  text2: {
    color: 'black',
    fontSize : 14,
    fontFamily : GlobalFonts.RobotoRegular,
  },
});

export default DailyLearning;
