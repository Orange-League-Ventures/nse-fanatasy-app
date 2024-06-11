import React from 'react'
import { Image, StyleSheet,  View, Dimensions , Text, TouchableOpacity, Pressable} from 'react-native'
import CustomText from '../common/CustomText'
import GlobalFonts from '../common/GlobalFonts';

const windowWidth : number = Dimensions.get('window').width;
const Dictionary = (props: any) => {
    return (
        <View>
            <View >
                <Text style={styles.headingText}>Trading Dictionary</Text>
            </View>
            <View style={styles.imageContainer}>
                <Pressable onPress={() => { props.navigation.navigate("Words") }}>
                    <Image
                        source={require('../../assets/images/dictionary_4x.png')}
                        style={styles.image}
                    />
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        marginTop: 32,
        fontSize: 16,
        color:'#03050A', 
        fontFamily : GlobalFonts.RobotoMedium,
    },
    imageContainer: {
        // marginVertical: 4,
        marginTop:8
    },
    image : {
        borderRadius: 8,
        width: (windowWidth-32),
        height : windowWidth > 400 ? 170 : 150,
        resizeMode: windowWidth > 400? 'cover' : 'contain',
    }
})

export default Dictionary
