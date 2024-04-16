import React from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomText from '../common/CustomText';

const ChartSection = (props: any) => {
    const handleImageClick = (chartType: string) => {
        // chartType will be passed as state
        props.navigation.navigate('ChartList');
    }

    return (
        <View >
            <View style={styles.textContainer}>
                <CustomText style={styles.headingText} >Understanding Charts</CustomText>
            </View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('ChartList'); }}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../assets/images/lineChart.png')}
                        />
                    </View>
                </TouchableOpacity>
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
        marginTop: 10,
        flexDirection: 'row',
    },
    imageContainer: {
        marginRight: 5,
    },
    chartPatternContainer: {
        marginTop: 5
    },
    textContainer: {
        marginTop: 3
    },
    headingText: {
        marginTop: 20,
        marginBottom:10,
        fontSize: 14,
        fontWeight:'500',
        color: "#000000"
    }
});

export default ChartSection;
