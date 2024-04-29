import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = (props: any) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.button, props.style]}>
    <Text style={[styles.buttonText, props.textStyle]}>{props.title}</Text>
  </TouchableOpacity>
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
    height: 'auto',
    borderWidth: 1,
    color: '#03050A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: '#717171',
    marginBottom: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default Button;
