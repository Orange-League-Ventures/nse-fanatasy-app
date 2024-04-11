import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const Disctionary = () => {
    return (
        <View>
            <View >
                <Text style={styles.headingText}>Trading Dictionary</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/images/dictionary.png')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        marginTop: 10,
        fontSize: 15,
        color: "#000000"
    },
    imageContainer: {
        marginTop: 20
    }
})

export default Disctionary
