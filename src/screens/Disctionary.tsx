import React from 'react'
import { Image, StyleSheet,  View, Dimensions , Text, TouchableOpacity} from 'react-native'
import CustomText from '../common/CustomText'

const windowWidth : number = Dimensions.get('window').width;
const Dictionary = (props: any) => {
    return (
        <View>
            <View >
                <Text style={styles.headingText}>Trading Dictionary</Text>
            </View>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("Words") }}>
                    <Image
                        source={require('../../assets/images/dictionary_4x.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: '500',
        color:'#03050A'
    },
    imageContainer: {
        marginVertical: 12,  
    },
    image : {
        borderRadius: 8,
        width: (windowWidth-32),
        height : windowWidth > 400 ? 170 : 150,
        resizeMode: windowWidth > 400? 'cover' : 'contain',
    }
})

export default Dictionary
