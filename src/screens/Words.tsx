import React, { useEffect, useState } from 'react';

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import InputBox from '../common/InputBox';
import { fetchDefinition, fetchWordOfTheDay, fetchWords } from '../services/dictionaryService';
import CustomText from '../common/CustomText';

interface IWords {
    letter: string;
    words: Array<IWord>
}

interface IWord {
    id: string;
    word: string;
}

interface IWordOfTheDay {
    word: string;
    definition: String;
}

const Words = () => {
    const [wordsState, setWordState] = useState<Array<IWords>>([]);
    const [definition, setDefinition] = useState<string>('')
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [wordOfTheDayState, setWordOfTheDayState] = useState<IWordOfTheDay>()
    useEffect(() => {
        wordsGroupByLetter();
        wordOfTheDay();
    }, []);

    const wordsGroupByLetter = () => {
        fetchWords().then((response) => {
            const data = response?.data;
            setWordState(response?.data?.wordsByLetter)
        }).catch((error) => {
            console.log({ error });

        })
    }

    const wordOfTheDay = async () => {
        fetchWordOfTheDay().then((response) => {
            const data = response?.data;
            console.log({ data });

            setWordOfTheDayState(data?.wordOfTheDay)
        }).catch((error) => {

        })
    }

    const wordDefinition = (id: string) => {
        setSelectedWord(null);
        fetchDefinition(id).then((response) => {
            const data = response?.data;
            setSelectedWord(id);
            setDefinition(data?.definition)
        }).catch((error: any) => {
            console.log("ERROR IN DEFINITION", error);

        })
    }

    return (
        <View style={styles.container}>
            {/* WORD OF THE DAY  */}
            {
                wordOfTheDayState ? (
                    <View style={styles.view1}>
                        <CustomText style={styles.wordOfTheDayHeading}>{
                            wordOfTheDayState?.word
                        }</CustomText>
                        <CustomText style={styles.wordOfTheDay}>
                            {
                                wordOfTheDayState?.definition

                            }
                        </CustomText>
                    </View>
                ) : null
            }

            <View style={styles.view2}>
                <InputBox
                    style={styles.searchBox}
                    placeholder="Search"
                />
            </View>
            <ScrollView>
                {
                    wordsState?.length > 0 ? (
                        <>
                            {
                                wordsState.map((item: IWords, index: number) => (
                                    <View key={index}>
                                        <CustomText style={styles.letter}>{item?.letter.toUpperCase()}</CustomText>
                                        {
                                            item?.words.map((wordItem: IWord, wordIndex: number) => (
                                                <View style={styles.view5} key={wordIndex}>
                                                    <TouchableOpacity
                                                        style={selectedWord === wordItem?.id ? styles.definition : null}
                                                        onPress={() => {
                                                            wordDefinition(wordItem?.id)
                                                        }}>
                                                        <CustomText style={selectedWord === wordItem?.id ? styles.selectedWord : styles.wordItem} >
                                                            {wordItem?.word?.charAt(0).toUpperCase()
                                                                + wordItem?.word?.slice(1)
                                                            }
                                                        </CustomText>
                                                        <View style={styles.view7}>
                                                            {selectedWord === wordItem?.id && (
                                                                <CustomText >
                                                                    {definition.charAt(0).toUpperCase()
                                                                        + definition?.slice(1)
                                                                    }
                                                                </CustomText>
                                                            )}
                                                        </View>
                                                    </TouchableOpacity>

                                                </View>
                                            ))
                                        }

                                    </View>
                                ))
                            }
                        </>
                    ) : null
                }
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        margin: 10,
    },
    view1: {
        alignItems: "stretch",
        borderRadius: 20,
        backgroundColor: "#E7E7F7",
        display: "flex",
        maxWidth: 328,
        flexDirection: "column",
        color: "#3A2D7D",
        padding: 16,
    },
    letter: {
        color: "#E66F25"
    },
    view2: {
        marginTop: 20,
        marginBottom: 20
    },
    view3: {
        marginTop: 8,
    },
    view4: {
        color: "#E66F25",
        textAlign: "center",
    },
    view5: {
        alignItems: "stretch",
        borderRadius: 8,
        display: "flex",
        marginTop: 16,
        width: "100%",
        flexDirection: "column",
    },
    view6: {
        color: "#E66F25",
    },
    view7: {
        color: "#03050A",
        marginTop: 12,
    },
    view8: {
        display: "flex",
        marginTop: 16,
        width: "100%",
        flexDirection: "column",
        fontSize: 14,
        color: "#4A4A4A",
        fontWeight: "400",
        textAlign: "center",
    },
    view9: { fontFamily: "Roboto, sans-serif" },
    searchBox: {
        borderRadius: 10
    },
    definition: {
        borderRadius: 20,
        backgroundColor: "rgba(230, 111, 37, 0.10)",
        padding: 20,
        color: "#E66F25",
    },
    wordItem: {
        color: '#4A4A4A'
    },
    selectedWord: {
        color: "#E66F25",
    },
    wordOfTheDay: {
        color: "#3A2D7D",
        fontWeight: "400",
        fontSize: 12
    },
    wordOfTheDayHeading: {
        color: "#3A2D7D",
        fontWeight: "600",
        fontSize: 14
    }
});


export default Words
