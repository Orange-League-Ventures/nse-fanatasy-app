import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputBox = (props:any) => (
  <TextInput
  style={[styles.input, props.style]}
    value={props.value}
    onChangeText={props.onChangeText}
    placeholder={props.placeholder}
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
