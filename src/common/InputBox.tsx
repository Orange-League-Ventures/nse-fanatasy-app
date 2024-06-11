import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputBox = (props:any) => (
  <TextInput
  style={[styles.input, props.style,props.error && styles.errorInput,]}
    value={props.value}
    onChangeText={props.onChangeText}
    placeholder={props.placeholder}
    keyboardType={props.keyboardType}
    placeholderTextColor="#717171"
    secureTextEntry={props.secureTextEntry}
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
  errorInput: {
    borderColor: '#CB0505', // Red border color for error
  },
});

export default InputBox;
