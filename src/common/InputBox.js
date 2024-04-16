import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputBox = ({ value, placeholder ,style,onChangeText}) => (
  <TextInput
  style={[styles.input, style]}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default InputBox;
