import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import ReportPage from "./ReportPage";
import {
  UpdateReport,
  getQuestionBasedOnQuestionId,
  getQuestionsBasedOnQuizType,
} from "../services/quizServices";
import { Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;

const { height } = Dimensions.get("window");

interface IProps {
  openQuiz: any;
  setOpenQuiz: any;
  quizType: any;
}

const Quiz = (props: any) => {
  const route: any = useRoute();
  const [quizData, setQuizData] = useState([]);
  const [currentQuizId, setCurrentQuizId] = useState("");
  const [questionData, setQuestionData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [lastQuestion, setLastQuestion] = useState(false);
  const [score, setScore] = useState(0);

  const progressWidth =
    ((questionNumber + 1) / questionData?.questions?.length) * 100;
  const navigation = useNavigation();

  const handlePress = () => {
    props.navigation.navigate("Play");
  };

  const [loading, setLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  useEffect(() => {
    const fetchQuestionsBasedOnQuizType = () => {
      setLoading(true);
      getQuestionsBasedOnQuizType(route?.params?.state?.quizTypes)
        .then((response) => {
          setQuizData(response?.data.quiz);
          setCurrentQuizId(response?.data.quiz[0]?.id);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching:", error.message);
        });
    };
    fetchQuestionsBasedOnQuizType();
  }, []);

  useEffect(() => {
    const fetchQuestionBasedOnQuestonId = () => {
      setQuestionLoading(true);
      getQuestionBasedOnQuestionId(currentQuizId)
        .then((response) => {
          setQuestionData(response?.data);
          setLoading(false);
        })
        .catch((error) => {
          setQuestionLoading(false);
          console.error("Error fetching:", error.message);
        });
    };
    fetchQuestionBasedOnQuestonId();
  }, [currentQuizId]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentIndex < questionData?.questions?.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentQuizId(quizData[0]?.["id"]);
      setQuestionNumber(questionNumber + 1); // Reset question index for the new quiz
    } else {
      props.navigation.navigate("ReportPage", {
        score: score,
        quizId: quizData[0]?.["id"],
        quizType: route?.params?.state?.quizTypes,
        totalQuestions: questionData?.questions?.length,
      });
    }
    setSubmitted(false);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctOption, setCorrectOption] = useState();

  const handleOptionSelect = (optionText) => {
    setSelectedOption(optionText);
  };

  const handleSubmit = () => {
    const currentQuestion = questionData?.questions?.[questionNumber];
    let vv;
    currentQuestion?.option?.map((item) => {
      // setCorrectOption(item);
      if (item.is_correct === true) {
        vv = item?.option_text;
        setCorrectOption(item);
      }
    });
    if (selectedOption === vv) {
      setScore(score + 1);
    }
    setIsCorrect(selectedOption === vv ? true : false);
    setSubmitted(true);
  };

  let kk;

  let dynamicHeight;

  if (Platform.OS === "ios") {
    if (height < 700) {
      // Assuming iPhone SE (3rd generation)
      dynamicHeight = "75%";
    } else {
      // Assuming iPhone 15 or similar
      dynamicHeight = "80%";
    }
  } else {
    dynamicHeight = "75%"; // For Android or other platforms
  }

  return (
    <View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3A2D7D" />
        </View>
      )}
      {!loading ? (
        <View style={styles.top}>
          <View style={styles.mainBack}>
            <TouchableOpacity onPress={handlePress}>
              <Image
                source={require("../../assets/images/Vector.png")}
                style={{
                  width: 6,
                  height: 10,
                  marginLeft: 0,
                  marginBottom: 12,
                }} // Adjust width and height as needed
              />
            </TouchableOpacity>
            <Text style={styles.stylingChanges}>Quiz</Text>
            <Text></Text>
          </View>
          <View style={styles.mainQuestion}>
            <Text>
              Q.{questionNumber + 1}/{questionData?.questions?.length}
            </Text>
          </View>
          <View style={styles.container}>
            <View
              style={[styles.progressBar, { width: `${progressWidth}%` }]}
            />
          </View>
          <View style={{ maxHeight: "90%", height: dynamicHeight }}>
            <ScrollView>
              <View>
                <Text style={styles.heading}>
                  <Text style={styles.headingText}>Situation: </Text>
                  {questionData?.questions?.[currentIndex]?.["sitituation"]}
                </Text>
                <Text style={styles.questionText}>
                  Q{questionNumber + 1}.{" "}
                  {questionData?.questions?.[currentIndex]?.["question_text"]}
                </Text>
                <View>
                  {questionData?.questions?.[currentIndex]?.option?.map(
                    (option, index) => (
                      <View
                        key={index}
                        style={{
                          ...(selectedOption === option.option_text && submitted
                            ? {
                                backgroundColor: isCorrect
                                  ? "#007A00"
                                  : "#CB0505",
                                borderRadius: 10,
                              }
                            : selectedOption === option.option_text
                            ? { backgroundColor: "#E7E7F7", borderRadius: 10 }
                            : {}),
                        }}
                      >
                        <View style={styles.option}>
                          <RadioButton.Android
                            value={option.option_text}
                            status={
                              selectedOption === option.option_text
                                ? "checked"
                                : "unchecked"
                            }
                            onPress={
                              !submitted
                                ? () => handleOptionSelect(option.option_text)
                                : null
                            }
                            color={submitted ? "#FFFFFF" : "#C35516"}
                            style={
                              selectedOption === option.option_text
                                ? {
                                    backgroundColor: isCorrect
                                      ? "green"
                                      : "green",
                                  }
                                : {}
                            }
                          />
                          <Text
                            style={{
                              color:
                                submitted &&
                                selectedOption === option.option_text
                                  ? "#FFFFFF"
                                  : "#03050A",
                            }}
                          >
                            {option.option_text}
                          </Text>
                        </View>
                      </View>
                    )
                  )}
                </View>
                {submitted && (
                  <View>
                    <View
                      style={{
                        backgroundColor: isCorrect
                          ? "rgba(0, 122, 0, 0.1)"
                          : "#FFE6E6",
                        marginTop: 10,
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: isCorrect ? "#007A00" : "#CB0505",
                          fontWeight: "600",
                          fontSize: 14,
                        }}
                      >
                        {isCorrect ? "Correct!" : "Well Tried !!"}
                      </Text>
                      {isCorrect && (
                        <View>
                          <Text style={styles.correctExplaination}>
                            Explanation
                          </Text>
                          <Text style={styles.correctOptionText}>
                            {correctOption?.option_text}
                          </Text>
                          <Text style={styles.explaination}>
                            {correctOption?.explaination?.explaination_text}
                          </Text>
                        </View>
                      )}
                      {!isCorrect && (
                        <View>
                          <View>
                            <Text style={styles.wrongAnswerExplaination}>
                              Explanation
                            </Text>
                            <Text style={styles.wrongAnwerSelectedOption}>
                              {selectedOption}
                            </Text>
                            {questionData?.questions?.[
                              currentIndex
                            ]?.option?.map((item) => {
                              if (item.option_text === selectedOption) {
                                kk = item?.explaination?.explaination_text;
                              }
                            })}
                            <Text style={styles.explaination}>{kk}</Text>
                          </View>
                        </View>
                      )}
                    </View>
                    {!isCorrect && (
                      <View
                        style={styles.notCorrectRightExplaination}
                      >
                        <Text style={styles.rightAnswerText}>
                          Right Answer is
                        </Text>
                        <Text style={styles.wrongRightExplaination}>
                          Explaination
                        </Text>
                        <Text style={styles.wrongRightOption}>
                          {correctOption?.option_text}
                        </Text>
                        <Text style={styles.explaination}>
                          {correctOption?.explaination?.explaination_text}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
          <View>
            {submitted ? (
              <TouchableOpacity
                style={styles.button}
                onPress={handleNextQuestion}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: selectedOption ? "#3A2D7D" : "#D4D4D4" },
                ]}
                onPress={selectedOption && handleSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <></>
        // <ReportPage
        //   score={score}
        //   totalQuestions={questionData?.questions?.length}
        //   // setOpenQuiz={setOpenQuiz}
        //   // openQuiz={openQuiz}
        //   quizType={route?.params?.state?.quizTypes}
        //   dynamicHeight={dynamicHeight}
        //   quizId={quizData[0]?.['id']}
        // />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#3A2D7D",
    width: windowWidth * 0.9, // Adjust percentage as needed
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    height: 10,
    backgroundColor: "#F5F5F7",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#C35516",
  },
  stylingChanges: {
    marginBottom: 20,
    display: "flex",
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  heading: {
    paddingBottom: 10,
  },
  headingText: {
    fontSize: 14,
    fontWeight: "600",
  },
  questionText: {
    color: "#03050A",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Montserrat",
    marginBottom: 10,
  },
  top: {
    padding: 20,
  },
  mainBack: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainQuestion: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  correctExplaination: {
    color: "#03050A",
    fontWeight: "500",
    fontSize: 12,
    marginBottom: 10,
  },
  explaination: {
    color: "#03050A",
    fontWeight: "400",
    fontSize: 10,
    fontFamily: "Roboto",
  },
  correctOptionText: {
    marginBottom: 10,
    color: "#007A00",
  },
  wrongAnswerExplaination: {
    color: "#03050A",
    fontWeight: "500",
    fontSize: 12,
    marginBottom: 10,
  },
  wrongAnwerSelectedOption: {
    marginBottom: 10,
    color: "#CB0505",
  },
  wrongRightExplaination: {
    color: "#03050A",
    fontWeight: "500",
    fontSize: 12,
    marginBottom: 10,
  },
  wrongRightOption: {
    marginBottom: 10,
    color: "#007A00",
  },
  rightAnswerText: {
    textAlign: "center",
    color: "#007A00",
    fontWeight: "600",
    fontSize: 14,
  },
  notCorrectRightExplaination: {
    backgroundColor: "rgba(0, 122, 0, 0.1)",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
});
export default Quiz;
