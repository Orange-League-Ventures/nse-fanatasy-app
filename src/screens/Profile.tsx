import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Header from './Header';

const Profile = (props: any) => {
    return (
        <View>
            <View>
                {
                    !props?.isHome ? (
                        <Header title={"Profile"} isTab={true} />

                    ) : null
                }
            </View>
            <View style={styles.container}>

                <View style={styles.left}>
                    <Image
                        source={{
                            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/0afdad6062808b75f0c28108ce49a468ccef7d64aa18f95e1d0f05400491f9e5?apiKey=7f48bd1f1f1e45f5914640147dc815d6&",
                        }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.right}>
                    <Text style={styles.text1}>Good morning!!</Text>
                    <Text style={styles.text2}>Jitendra Singh</Text>
                </View>
                <View>
                    {
                        !props?.isHome ? (
                            <View>
                                <Text style={styles.text2}>Pure Profile</Text>
                            </View>
                        ) : null
                    }
                </View>

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        padding: 8,
    },
    left: {
        marginRight: 8,
    },
    right: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        width: 40,
        height: 40,
        aspectRatio: 1,
    },
    text1: {
        color: '#717171',
        marginBottom: 4,
    },
    text2: {
        color: '#03050A',
    },
});

export default Profile;
