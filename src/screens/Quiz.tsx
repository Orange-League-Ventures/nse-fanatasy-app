import {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {RadioButton} from 'react-native-paper';
import ReportPage from './ReportPage';
import {
  UpdateReport,
  getQuestionBasedOnQuestionId,
  getQuestionsBasedOnQuizType,
} from '../services/quizServices';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Quiz = ({openQuiz, setOpenQuiz, quizType}) => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuizId, setCurrentQuizId] = useState('');
  const [questionData, setQuestionData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [lastQuestion, setLastQuestion] = useState(false);

  const progressWidth = ((questionNumber + 1) / quizData.length) * 100;
  const navigation = useNavigation();

  const handlePress = () => {
    setOpenQuiz(!openQuiz);
  };

  const [loading, setLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  useEffect(() => {
    const fetchQuestionsBasedOnQuizType = () => {
      setLoading(true);
      getQuestionsBasedOnQuizType(quizType)
        .then(response => {
          setQuizData(response.data.quiz);
          setCurrentQuizId(response.data.quiz[0].id);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.error('Error fetching:', error.message);
        });
    };
    fetchQuestionsBasedOnQuizType();
  }, [quizType]);

  useEffect(() => {
    const fetchQuestionBasedOnQuestonId = () => {
      setQuestionLoading(true);
      getQuestionBasedOnQuestionId(currentQuizId)
        .then(response => {
          setQuestionData(response?.data);
          setLoading(false);
        })
        .catch(error => {
          setQuestionLoading(false);
          console.error('Error fetching:', error.message);
        });
    };
    fetchQuestionBasedOnQuestonId();
  }, [currentQuizId]);

  const handleNextQuestion = () => {
    const currentIndex = quizData.findIndex(
      item => item?.['id'] === currentQuizId,
    );
    if (currentIndex < quizData.length - 1) {
      setCurrentQuizId(quizData[currentIndex + 1]?.['id']);
      setQuestionNumber(questionNumber + 1); // Reset question index for the new quiz
    } else {
      setLastQuestion(!lastQuestion);
    }
    setSubmitted(false);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctOption, setCorrectOption] = useState();

  const handleOptionSelect = optionText => {
    setSelectedOption(optionText);
  };
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    const currentQuestion = questionData.questions?.[questionNumber];
    let vv;
    currentQuestion?.option?.map(item => {
      setCorrectOption(item);
      if (item.is_correct === true) {
        vv = item?.option_text;
      }
    });
    if (selectedOption === vv) {
      setScore(score + 1);
    }
    setIsCorrect(selectedOption === vv ? true : false);
    setSubmitted(true);
  };

  let kk;
  return (
    <View>
      {!lastQuestion ? (
        <View style={{padding: 20}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.backSymbol} onPress={handlePress}>
              {'<'}
            </Text>
            <Text style={styles.stylingChanges}>Quiz</Text>
            <Text></Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text>
              Q.{questionNumber + 1}/{quizData.length}
            </Text>
          </View>
          <View style={styles.container}>
            <View style={[styles.progressBar, {width: `${progressWidth}%`}]} />
          </View>
          <View style={{maxHeight: 900, height: 480}}>
            <Text style={{color: '#03050A', fontSize: 14, fontWeight: '600'}}>
              Q{questionNumber + 1}.{' '}
              {questionData?.questions?.[0]?.['question_text']}
            </Text>
            <View>
              {questionData?.questions?.[0]?.option?.map((option, index) => (
                <View
                  key={index}
                  style={{
                    ...(selectedOption === option.option_text && submitted
                      ? {
                          backgroundColor: isCorrect ? '#007A00' : '#CB0505',
                          borderRadius: 10,
                        }
                      : selectedOption === option.option_text
                      ? {backgroundColor: '#E7E7F7', borderRadius: 10}
                      : {}),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <RadioButton.Android
                      value={option.option_text}
                      status={
                        selectedOption === option.option_text
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => handleOptionSelect(option.option_text)}
                      color={submitted ? 'white' : '#C35516'}
                      style={
                        selectedOption === option.option_text
                          ? {backgroundColor: isCorrect ? 'green' : 'green'}
                          : {}
                      }
                    />
                    <Text>{option.option_text}</Text>
                  </View>
                </View>
              ))}
            </View>
            {submitted && (
              <View>
                <View
                  style={{
                    backgroundColor: isCorrect
                      ? 'rgba(0, 122, 0, 0.1)'
                      : '#FFE6E6',
                    marginTop: 10,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: isCorrect ? '#007A00' : '#CB0505',
                      fontWeight: '600',
                      fontSize: 14,
                    }}>
                    {isCorrect ? 'Correct!' : 'Well Tried !!'}
                  </Text>
                  {isCorrect && (
                    <View>
                      <Text
                        style={{
                          color: '#03050A',
                          fontWeight: '500',
                          fontSize: 12,
                        }}>
                        Explanation
                      </Text>
                      <Text>
                        {correctOption?.explaination?.explaination_text}
                      </Text>
                    </View>
                  )}
                  {!isCorrect && (
                    <View>
                      <View>
                        <Text
                          style={{
                            color: '#03050A',
                            fontWeight: '500',
                            fontSize: 12,
                          }}>
                          Explanation
                        </Text>
                        {questionData.questions?.[0]?.option?.map(item => {
                          if (item.option_text === selectedOption) {
                            kk = item?.explaination?.explaination_text;
                          }
                        })}
                        <Text>{kk}</Text>
                      </View>
                    </View>
                  )}
                </View>
                {!isCorrect && (
                  <View
                    style={{
                      backgroundColor: 'rgba(0, 122, 0, 0.1)',
                      marginTop: 10,
                      borderRadius: 10,
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#007A00',
                        fontWeight: '600',
                        fontSize: 14,
                      }}>
                      Right Answer is
                    </Text>
                    <Text
                      style={{
                        color: '#03050A',
                        fontWeight: '500',
                        fontSize: 12,
                      }}>
                      Explaination
                    </Text>
                    <Text>
                      {correctOption?.explaination?.explaination_text}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
          <View>
            {submitted ? (
              <TouchableOpacity
                style={styles.button}
                onPress={handleNextQuestion}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <ReportPage
          score={score}
          totalQuestions={quizData.length}
          setOpenQuiz={setOpenQuiz}
          openQuiz={openQuiz}
          quizType={quizType}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3A2D7D',
    width: windowWidth * 0.9, // Adjust percentage as needed
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
  container: {
    height: 10,
    backgroundColor: '#F5F5F7',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#C35516',
  },
  stylingChanges: {
    marginBottom: 20,
    display: 'flex',
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  backSymbol: {
    fontSize: 20,
    color: '#03050A',
    height: 25,
  },
});
export default Quiz;
