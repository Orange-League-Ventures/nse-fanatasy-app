import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = (props:any) => (
  <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
    <Text style={[styles.buttonText, props.textStyle]}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;