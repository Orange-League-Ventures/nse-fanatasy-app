import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import GlobalFonts from "./GlobalFonts";

type CustomCheckboxProps = {
  checked: boolean;
  onPress: () => void;
  label: string;
};

const CustomCheckBox: React.FC<CustomCheckboxProps> = ({
  checked,
  onPress,
  label,
}) => {
  return (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity onPress={onPress} >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Text style={styles.checkboxTick}>✓</Text>}
        </View>
      </TouchableOpacity>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#D4D4D4",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#3A2D7D",
  },
  checkboxTick: {
    color: "#ffffff",
    fontSize: 16,
  },
  checkboxLabel: {
    fontFamily: GlobalFonts.RobotoRegular,
    fontWeight: "400",
    fontSize: 14,
    color: "#4A4A4A",
  },
});

export default CustomCheckBox;
