import React from 'react'
import { Image, StyleSheet,  View, Dimensions } from 'react-native'
import CustomText from '../common/CustomText'

const windowWidth : number = Dimensions.get('window').width;
const Dictionary = () => {
    return (
        <View>
            <View >
                <CustomText style={styles.headingText}>Trading Dictionary</CustomText>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/images/dictionary_4x.png')} style={ styles.image}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        marginTop: 20,
        fontSize: 14,
        fontWeight:'500',
        color: "#000000",
    },
    imageContainer: {
        marginVertical: 12,  
        // backgroundColor :'red',
    },
    image : {
        borderRadius: 8,
        width: (windowWidth-32),
        height : windowWidth > 400 ? 170 : 150,
        resizeMode: windowWidth > 400? 'cover' : 'contain',
    }
})

export default Dictionary
