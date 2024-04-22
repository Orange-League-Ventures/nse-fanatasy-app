// CheckBoxComponent.tsx

import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface CheckboxProps {
    isChecked: boolean;
    onChange: (newValue: boolean) => void;
}

const CheckBoxComponent: React.FC<CheckboxProps> = ({ isChecked, onChange }) => {
    const toggleCheckbox = () => {
        onChange(!isChecked);
    };

    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
            <View style={[styles.checkbox, isChecked && styles.checkedBox]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        marginRight: 10, // Adjust margin as needed
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    checkedBox: {
        backgroundColor: '#000',
    },
});

export default CheckBoxComponent;
