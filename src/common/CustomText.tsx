import React from 'react';
import { Text, StyleSheet } from 'react-native';
import GlobalFonts from './GlobalFonts';

const CustomText = ({ text, style }:any) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: GlobalFonts.RobotoMedium,
    fontSize: 15,
  },
});

export default CustomText;
