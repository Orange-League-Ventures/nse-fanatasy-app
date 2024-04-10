import React from 'react';
import {  StyleSheet, Text, View } from 'react-native';

const DailyLearning = () => {
    return (
        <View style={styles.view1}>
            <View style={styles.view2}>
                <Text style={styles.text1}>Daily Learning</Text>
            </View>
            <View style={styles.view3}>
                <Text style={styles.text2}>Resume Learning</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view1: {
        alignItems: "stretch",
        display: "flex",
        maxWidth: 328,
        flexDirection: "column",
        fontSize: 14,
        // color: "#03050A",
    },
    view2: {
        width: "100%",
    },
    view3: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        borderColor: "rgba(212, 212, 212, 1)",
        borderStyle: "solid",
        borderWidth: 1,
        marginTop: 8,
        width: "100%",
    },
    text1: {
        color: "black",
        fontWeight: "500",
    },
    text2: {
        color: "black",
        fontWeight: "400",
    },
});

export default DailyLearning;
