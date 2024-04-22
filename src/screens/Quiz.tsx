import {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getQuizQuestions} from '../services/authService';
import axios from 'axios';
import {RadioButton} from 'react-native-paper';
import ReportPage from './ReportPage';

const Quiz = ({openQuiz, setOpenQuiz, quizType}) => {
  const [quizData, setQuizData] = useState([]);
  const [seconds, setSeconds] = useState(30);
  const progressWidth = (4 / 5) * 100;
  const navigation = useNavigation();
  console.log(quizData.length, 'dldlsdsdlinlof');

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);
  const handlePress = () => {
    setOpenQuiz(!openQuiz);
  };
  const [currentQuizId, setCurrentQuizId] = useState('');
  const [questionData, setQuestionData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/quiz?quizType=${quizType}`)
      .then(response => {
        setQuizData(response.data.quiz);
        setCurrentQuizId(response.data.quiz[0].id); // Set the first quiz ID
      })
      .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    if (currentQuizId) {
      axios
        .get(`http://localhost:8000/api/v1/question?quizId=${currentQuizId}`)
        .then(response => {
          setQuestionData(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [currentQuizId]);
  const [lastQuestion, setLastQuestion] = useState(false);
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
  console.log(questionNumber, 'questionNumber');

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
    currentQuestion?.option.map(item => {
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
  console.log(score, 'cscosdnosifwoif');

  const [explain, setExplain] = useState();
  let kk;
  return (
    // <View style={{padding: 20}}>
    //   <View
    //     style={{
    //       display: 'flex',
    //       flexDirection: 'row',
    //       justifyContent: 'space-between',
    //     }}>
    //     <Text style={styles.backSymbol} onPress={handlePress}>
    //       {'<'}
    //     </Text>
    //     <Text style={styles.stylingChanges}>Quiz</Text>
    //     <Text></Text>
    //   </View>
    //   <View
    //     style={{
    //       display: 'flex',
    //       flexDirection: 'row',
    //       justifyContent: 'space-between',
    //       marginBottom: 20,
    //     }}>
    //     <Text>Q.4/5</Text>
    //     <Text>{seconds} sec</Text>
    //   </View>
    //   <View style={styles.container}>
    //     <View style={[styles.progressBar, {width: `${progressWidth}%`}]} />
    //   </View>
    //   <View style={{maxHeight: 900, height: 480}}>
    //     <Text style={{color: '#03050A', fontSize: 14, fontWeight: '600'}}>
    //       Q{questionNumber + 1}.{' '}
    //       {questionData.questions?.[0]?.['question_text']}
    //     </Text>
    //     <View>
    //       {questionData.questions?.[0]?.option.map((option, index) => (
    //         <View
    //           key={index}
    //           // style={
    //           //   selectedOption === option.option_text
    //           //     ? {backgroundColor: '#E7E7F7', borderRadius: 5}
    //           //     : {}
    //           // }
    //           style={{
    //             ...(selectedOption === option.option_text && submitted
    //               ? {
    //                   backgroundColor: isCorrect ? '#007A00' : '#CB0505',
    //                   borderRadius: 10,
    //                 }
    //               : selectedOption === option.option_text
    //               ? {backgroundColor: '#E7E7F7', borderRadius: 10}
    //               : {}),
    //           }}>
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               padding: 10,
    //             }}>
    //             <RadioButton.Android
    //               value={option.option_text}
    //               status={
    //                 selectedOption === option.option_text
    //                   ? 'checked'
    //                   : 'unchecked'
    //               }
    //               onPress={() => handleOptionSelect(option.option_text)}
    //               color={submitted? 'white':'#C35516'}
    //               style={
    //                 selectedOption === option.option_text
    //                   ? {backgroundColor: isCorrect ? 'green' : 'green'}
    //                   : {}
    //               }
    //             />
    //             <Text>{option.option_text}</Text>
    //           </View>
    //         </View>
    //       ))}
    //     </View>
    //     {submitted && (
    //       <View
    //         style={{
    //           backgroundColor: isCorrect ? 'rgba(0, 122, 0, 0.1)' : '#FFE6E6',
    //           marginTop: 10,
    //         }}>
    //         <Text>{isCorrect ? 'Correct!' : 'Incorrect!'}</Text>
    //         {isCorrect && (
    //           <View>
    //             <Text>Explaination</Text>
    //             <Text>{correctOption?.explaination?.explaination_text}</Text>
    //           </View>
    //         )}
    //         {!isCorrect && (
    //           <View>
    //             <Text>Explaination</Text>
    //             {questionData.questions?.[0]?.option.map(item => {
    //               console.log(item.option_text, 'vhjbksdvshbjsna');
    //               if (item.option_text === selectedOption) {
    //                 console.log(
    //                   item?.explaination?.explaination_text,
    //                   'kjdjkdjkjdjdjd',
    //                 );
    //                 kk = item?.explaination?.explaination_text;
    //               }
    //             })}
    //             <Text>{kk}</Text>
    //           </View>
    //         )}
    //       </View>
    //     )}
    //   </View>
    //   <View>
    //     {submitted ? (
    //       <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
    //         <Text style={styles.buttonText}>Next</Text>
    //       </TouchableOpacity>
    //     ) : (
    //       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
    //         <Text style={styles.buttonText}>Submit</Text>
    //       </TouchableOpacity>
    //     )}
    //   </View>
    //   {lastQuestion && <Text>Report Page</Text>}
    // </View>
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
            <Text>Q.4/5</Text>
            <Text>{seconds} sec</Text>
          </View>
          <View style={styles.container}>
            <View style={[styles.progressBar, {width: `${progressWidth}%`}]} />
          </View>
          <View style={{maxHeight: 900, height: 480}}>
            <Text style={{color: '#03050A', fontSize: 14, fontWeight: '600'}}>
              Q{questionNumber + 1}.{' '}
              {questionData.questions?.[0]?.['question_text']}
            </Text>
            <View>
              {questionData.questions?.[0]?.option.map((option, index) => (
                <View
                  key={index}
                  // style={
                  //   selectedOption === option.option_text
                  //     ? {backgroundColor: '#E7E7F7', borderRadius: 5}
                  //     : {}
                  // }
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
                    borderRadius:10,
                    padding:10
                  }}>
                  <Text style={{textAlign:'center',color:isCorrect?'#007A00':'#CB0505',fontWeight:'600',fontSize:14}}>{isCorrect ? 'Correct!' : 'Well Tried !!'}</Text>
                  {isCorrect && (
                    <View>
                      <Text style={{color:'#03050A',fontWeight:'500',fontSize:12}}>Explanation</Text>
                      <Text>
                        {correctOption?.explaination?.explaination_text}
                      </Text>
                    </View>
                  )}
                  {!isCorrect && (
                    <View>
                      <View>
                        <Text style={{color:'#03050A',fontWeight:'500',fontSize:12}}>Explanation</Text>
                        {questionData.questions?.[0]?.option.map(item => {
                          if (item.option_text === selectedOption) {
                            console.log(
                              item?.explaination?.explaination_text,
                              'kjdjkdjkjdjdjd',
                            );
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
                      borderRadius:10,
                      padding:10
                    }}>
                      <Text  style={{textAlign:'center',color:'#007A00',fontWeight:'600',fontSize:14}}>
                        Right Answer is
                      </Text>
                      <Text style={{color:'#03050A',fontWeight:'500',fontSize:12}}>
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
        />
      )}
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
