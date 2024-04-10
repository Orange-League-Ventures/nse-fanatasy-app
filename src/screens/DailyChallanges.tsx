import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';

const DailyChallanges = () => {
    return (
        <View style={styles.view1}>
            <View style={styles.view2}>
                <Text>Daily Challenges</Text>
            </View>
            <View style={styles.view3}>
                <View style={styles.view5}>
                    <Image
                        source={require('../../assets/images/dailyChallenge.png')}
                        style={styles.image1}
                    />
                </View>
            </View>
            <View style={styles.view7}>
                <Text>START THE QUIZ</Text>
            </View>
            <View style={styles.view8}>
                <Text>Terms & Conditions Apply</Text>
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
    },
    view2: {
        color: "#03050A",
        width: "100%",
    },
    view3: {
        alignItems: "stretch",
        borderRadius: 8,
        display: "flex",
        marginTop: 8,
        width: "100%",
        flexDirection: "column",
    },
    view4: {
        alignItems: "stretch",
        backgroundColor: "rgba(0, 0, 0, 0.50)",
        color: "#FFF",
        textAlign: "center",
        justifyContent: "center",
        //   padding: "8px 16px",
    },
    view5: {
        justifyContent: "center",
        alignItems: "stretch",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        fontSize: 12,
        color: "rgba(0, 0, 0, 0.50)",
        fontWeight: "400",
        padding: 16,
    },
    view6: { fontFamily: "Roboto, sans-serif" },
    image1: {},
    view7: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderColor: "rgba(37, 211, 102, 1)",
        borderStyle: "solid",
        borderWidth: 1,
        backgroundColor: "#25D366",
        marginTop: 8,
        marginLeft: 15,
        width: "100%",
        color: "#FFF",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 16,
    },
    view8: {
        color: "#C35516",
        textAlign: "center",
        alignSelf: "center",
        marginTop: 12,
    },
});

export default DailyChallanges
