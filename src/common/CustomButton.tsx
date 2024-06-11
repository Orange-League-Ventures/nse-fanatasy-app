import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const CustomButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.loading}
      activeOpacity={1}
      style={[styles.button, props.style]}
    >
      {props.loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.buttonText, props.textStyle,{ marginHorizontal: 8 }]}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    height: "auto",
    borderWidth: 1,
    color: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderColor: "#717171",
  },
  buttonText: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default CustomButton;
