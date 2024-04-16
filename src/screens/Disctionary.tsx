import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import CustomText from '../common/CustomText'

const Disctionary = () => {
    return (
        <View>
            <View >
                <CustomText style={styles.headingText}>Trading Dictionary</CustomText>
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
        marginTop: 20,
        marginBottom:10,
        fontSize: 14,
        fontWeight:'500',
        color: "#000000"
    },
    imageContainer: {
        marginTop: 20
    }
})

export default Disctionary
