import React from 'react'
import { Image, StyleSheet,  View, Dimensions , TouchableOpacity} from 'react-native'
import CustomText from '../common/CustomText'

const windowWidth : number = Dimensions.get('window').width;
const Dictionary = (props: any) => {
    return (
        <View>
            <View >
                <CustomText style={styles.headingText}>Trading Dictionary</CustomText>
            </View>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("Words") }}>
                    <Image
                        source={require('../../assets/images/dictionary.png')}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: '500',
        color: "#000000"
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
