import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Button from '../common/Button';
import CustomText from '../common/CustomText';
import {getQuizQuestions} from '../services/authService';

const Play = ({route}) => {
  const {openQuiz, setOpenQuiz,setQuizData,quizData,setQuizType} = route.params;
  const [loading, setLoading] = useState(false);

  const handleSubmit = (quizType:string) => {
    setOpenQuiz(!openQuiz);
    setLoading(true);
    setQuizType(quizType)
  };

  return (
    <View>
      <View style={{padding: 20}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#D4D4D4',
            borderRadius: 12,
            padding: 10,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText text="Game -1 Quiz" style={styles.text} />
          <Button
            onPress={() => handleSubmit('Quiz 1')}
            title="Play"
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#D4D4D4',
            borderRadius: 12,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText text="Game -2 Pattern Identifier" style={styles.text} />
          <Button
            onPress={() => handleSubmit('Quiz 2')}
            title="Play"
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3A2D7D',
    width: 320,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 30,
  },
});

export default Play;
