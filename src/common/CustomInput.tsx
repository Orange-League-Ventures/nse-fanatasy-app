import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  name: string;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
  error: boolean;
  errorText?: string;
  rules: object;
}

const CustomInput: React.FC<Props> = ({
  control,
  name,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  error,
  errorText = "",
  rules = {},
}) => {
  return (
    <View style={styles.inputs}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={"grey"}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
        )}
        name={name}
        rules={rules}
      />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMsg}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "auto",
    // height: "auto",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    color: "#000000",
    borderColor: "#D4D4D4",
    marginTop: 8,
    marginBottom: 3,
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "400",
    height:48,
  },
  errorInput: {
    borderColor: "#CB0505",
  },
  errorMsg: {
    color: "#CB0505",
    fontSize: 10,
    marginLeft: 8,
  },
  errorContainer: {
    marginTop: 0, // Add margin top for the error message
  },
  inputs:{
    marginBottom: 12,
  }
});

export default CustomInput;
