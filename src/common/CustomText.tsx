import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = (props:any) => {
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    fontSize: 15,
  },
});

export default CustomText;