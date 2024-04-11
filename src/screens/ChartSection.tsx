import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

const ChartSection = () => {
    return (
        <View >
            <View style={styles.textContainer}>
                <Text style={styles.headingText} >Understaing Chart</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/lineChart.png')}
                    />
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/candelStick.png')}
                    />
                </View>
            </View>
            <View style={styles.chartPatternContainer}>
                <Image
                    source={require('../../assets/images/chartPattern.png')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
    },
    imageContainer: {
        marginRight: 10,
    },
    chartPatternContainer: {
        marginTop: 10
    },
    textContainer: {
        marginTop: 20
    },
    headingText: {
        marginTop: 10,
        fontSize: 15,
        color: "#000000"
    }
});

export default ChartSection;
