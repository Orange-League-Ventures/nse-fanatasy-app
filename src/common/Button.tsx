import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Pressable} from 'react-native';
import GlobalFonts from './GlobalFonts';

const Button = (props: any) => (
  <Pressable
    onPress={props.onPress}
    style={[styles.button, props.style]}>
    <Text style={[styles.buttonText, props.textStyle]}>{props.title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#3A2D7D',
    // padding: 10,
    // borderRadius: 5,
    // alignItems: 'center',
    backgroundColor: '#3A2D7D',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    // height: 'auto',
    borderWidth: 1,
    color: '#03050A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: '#717171',
    marginBottom: 12,
    fontSize: 12,
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: '500',
    height:48
  },
  buttonText: {
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default Button;
