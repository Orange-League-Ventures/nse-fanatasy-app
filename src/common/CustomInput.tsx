import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';

interface Props {
  control: any;
  name: string;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  error: boolean;
  errorText?: string;
}

const CustomInput: React.FC<Props> = ({
  control,
  name,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  error,
  errorText = '',
  rules = {},
}) => {
  return (
    <View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={'grey'}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
        )}
        name={name}
        rules={rules}
      />
      {error && <Text style={styles.errorMsg}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 'auto',
    height: 'auto',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    color: '#000000',
    borderColor: '#D4D4D4',
    marginTop: 8,
    marginBottom: 8,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  errorInput: {
    borderColor: '#CB0505',
  },
  errorMsg: {
    color: '#CB0505',
    fontSize: 12,
    marginLeft: 8,
  },
});

export default CustomInput;
