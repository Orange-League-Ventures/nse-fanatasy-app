import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface IProps{
  style:any;
  text:string;
}

const CustomText = ({style,text}:IProps) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    fontSize: 15,
  },
});

export default CustomText;
