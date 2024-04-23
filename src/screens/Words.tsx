import React, {useEffect, useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputBox from '../common/InputBox';
import {
  fetchDefinition,
  fetchWordOfTheDay,
  fetchWords,
} from '../services/dictionaryService';
import CustomText from '../common/CustomText';
import {useDebounce} from '../hooks/useDebounce';

interface IWords {
  word: string;
  first_letter: string;
  definition: string;
  words: Array<IWord>;
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
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  useEffect(() => {
    const wordsGroupByLetter = () => {
      fetchWords(debouncedSearchTerm)
        .then(response => {
          console.log(response?.data?.wordsByLetter);

          setWordState(response?.data?.wordsByLetter);
        })
        .catch(error => {
          console.log({error});
        });
    };
    wordsGroupByLetter();
  }, [debouncedSearchTerm]);

  //   const wordOfTheDay = async () => {
  //     fetchWordOfTheDay()
  //       .then(response => {
  //         const data = response?.data;
  //         console.log({data});
  //         setWordOfTheDayState(data?.wordOfTheDay);
  //       })
  //       .catch(error => {});
  //   };

  //   const wordDefinition = (id: string) => {
  //     setSelectedWord(null);
  //     fetchDefinition(id)
  //       .then(response => {
  //         const data = response?.data;
  //         setSelectedWord(id);
  //         setDefinition(data?.definition);
  //       })
  //       .catch((error: any) => {
  //         console.log('ERROR IN DEFINITION', error);
  //       });
  //   };

  return (
    <View style={styles.container}>
      {/* WORD OF THE DAY  */}
      {/* {wordOfTheDayState ? (
        <View style={styles.view1}>
          <CustomText style={styles.wordOfTheDayHeading}>
            {wordOfTheDayState?.word}
          </CustomText>
          <CustomText style={styles.wordOfTheDay}>
            {wordOfTheDayState?.definition}
          </CustomText>
        </View>
      ) : null} */}

      <View style={styles.view2}>
        <InputBox
          style={styles.searchBox}
          placeholder="Search"
          onChangeText={text => setSearchTerm(text.toLowerCase())}
        />
      </View>
      <ScrollView>
        {wordsState?.length > 0 ? (
          <>
            {wordsState.map((item: IWords, wordIndex: number) => (
              <View style={styles.view5} key={wordIndex}>
                {wordIndex === 0 ||
                item.first_letter !== wordsState[wordIndex - 1].first_letter ? (
                  <CustomText style={styles.header}
                    text={item.first_letter.toUpperCase()}
                  />
                ) : null}
                <TouchableOpacity
                  style={selectedWord === item?.id ? styles.definition : null}
                  onPress={() => {
                    setSelectedWord(item.id);
                  }}>
                  <CustomText
                    style={
                      selectedWord === item?.id
                        ? styles.selectedWord
                        : styles.item
                    } 
                    text={item?.word?.charAt(0).toUpperCase() + item?.word?.slice(1)}
                  />
                  <View style={styles.view7}>
                    {selectedWord === item?.id && (
                      <CustomText style={styles.selectedWord} 
                        text={item.definition.charAt(0).toUpperCase() +
                          item.definition?.slice(1)}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    margin: 10,
  },
  view1: {
    alignItems: 'stretch',
    borderRadius: 20,
    backgroundColor: '#E7E7F7',
    display: 'flex',
    maxWidth: 328,
    flexDirection: 'column',
    color: '#3A2D7D',
    padding: 16,
  },
  letter: {
    color: '#E66F25',
  },
  view2: {
    marginTop: 20,
    marginBottom: 20,
  },
  view3: {
    marginTop: 8,
  },
  view4: {
    color: '#E66F25',
    textAlign: 'center',
  },
  view5: {
    alignItems: 'stretch',
    borderRadius: 8,
    display: 'flex',
    marginTop: 12,
    width: '100%',
    flexDirection: 'column',
  },
  view6: {
    color: '#E66F25',
  },
  view7: {
    color: '#03050A',
    // marginTop: 12,
  },
  view8: {
    display: 'flex',
    marginTop: 16,
    width: '100%',
    flexDirection: 'column',
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '400',
    textAlign: 'center',
  },
  view9: {fontFamily: 'Roboto, sans-serif'},
  searchBox: {
    borderRadius: 10,
  },
  definition: {
    borderRadius: 20,
    backgroundColor: 'rgba(230, 111, 37, 0.10)',
    padding: 20,
    color: '#E66F25',
  },
  wordItem: {
    color: '#4A4A4A',
  },
  selectedWord: {
    color: '#E66F25',
  },
  wordOfTheDay: {
    color: '#3A2D7D',
    fontWeight: '400',
    fontSize: 12,
  },
  wordOfTheDayHeading: {
    color: '#3A2D7D',
    fontWeight: '600',
    fontSize: 14,
  },
  header: {marginBottom: 8, color: '#E66F25', fontWeight: '600', fontSize: 14},
});

export default Words;
