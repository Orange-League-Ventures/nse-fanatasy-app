import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  DimensionValue,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import {
  getQuestionBasedOnQuestionId,
  getQuestionsBasedOnQuizType,
} from "../services/quizServices";
import { Dimensions, Platform } from "react-native";
import GlobalFonts from "../common/GlobalFonts";
import { useWindowDimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const { height } = Dimensions.get("window");

interface IProps {
  openQuiz: any;
  setOpenQuiz: any;
  quizType: any;
}

const Quiz = (props: any) => {
  const windowDimensions = useWindowDimensions();
  const route: any = useRoute();
  const [quizData, setQuizData] = useState([]);
  const [currentQuizId, setCurrentQuizId] = useState("");
  // const [questionData, setQuestionData] = useState([]);
  const [questionData, setQuestionData] = useState<any>([]);

  const [questionNumber, setQuestionNumber] = useState(0);
  const [lastQuestion, setLastQuestion] = useState(false);
  const [score, setScore] = useState(0);

  const progressWidth =
    ((questionNumber + 1) / questionData?.questions?.length) * 100;

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
          setQuestionLoading(false);
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
  console.log(
    route?.params?.state?.quizTypes,
    "route?.params?.state?.quizTypes"
  );

  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctOption, setCorrectOption] = useState<any>();

  const handleOptionSelect = (optionText: any) => {
    setSelectedOption(optionText);
  };

  const handleSubmit = () => {
    const currentQuestion = questionData?.questions?.[questionNumber];
    let vv;
    currentQuestion?.option?.map((item: any) => {
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
    if (windowDimensions.height < 700) {
      dynamicHeight = "75%";
    } else {
      // Assuming iPhone 15 or similar
      dynamicHeight = "80%";
    }
  } else {
    dynamicHeight = "80%";
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3A2D7D" />
          </View>
        )}
      </View>
      <View style={{ flex: 1 }}>
        {!loading && (
          <View style={styles.top}>
            <View style={styles.mainBack}>
              <TouchableOpacity onPress={handlePress}>
                <Image
                  source={require("../../assets/images/Vector.png")}
                  style={styles.backArrowImage}
                />
              </TouchableOpacity>
              <Text style={styles.stylingChanges}>Quiz</Text>
              <Text></Text>
            </View>
            <View style={styles.mainQuestion}>
              <Text
                style={{
                  color: "#000000",
                  fontFamily: GlobalFonts.RobotoRegular,
                  fontSize: 14,
                }}
              >
                Q.{questionNumber + 1}/{questionData?.questions?.length}
              </Text>
            </View>
            <View style={styles.container}>
              <View
                style={[styles.progressBar, { width: `${progressWidth}%` }]}
              />
            </View>
            <ScrollView>
              <View>
                {route?.params?.state?.quizTypes !== "Quiz 2" && (
                  <Text style={styles.heading}>
                    <Text style={styles.headingText}>Situation: </Text>
                    <Text style={styles.headingTexts}>
                      {questionData?.questions?.[currentIndex]?.["sitituation"]}
                    </Text>
                  </Text>
                )}
                <Text style={styles.questionText}>
                  Q{questionNumber + 1}.{" "}
                  {questionData?.questions?.[currentIndex]?.["question_text"]}
                </Text>
                {route?.params?.state?.quizTypes === "Quiz 2" && (
                  <Image
                    source={require("../../assets/images/pattern_identifier.png")}
                    style={styles.patternIdentifier}
                  />
                )}
                <View>
                  {questionData?.questions?.[currentIndex]?.option?.map(
                    (option: any, index: any) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          if (!submitted) {
                            handleOptionSelect(option.option_text);
                          }
                        }}
                        activeOpacity={0.7}
                        style={{
                          ...(selectedOption === option.option_text && submitted
                            ? {
                                backgroundColor: isCorrect
                                  ? "#007A00"
                                  : "#CB0505",
                                borderRadius: 10,
                              }
                            : selectedOption === option.option_text
                            ? {
                                backgroundColor: "#E7E7F7",
                                borderRadius: 10,
                              }
                            : {}),
                            marginBottom:12
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
                                : undefined
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
                              fontSize:16,
                              fontWeight:'500',
                              fontFamily:GlobalFonts.RobotoMedium,
                              display:'flex',
                              flexWrap:'wrap',
                              marginRight:10,
                              flex:1,
                              // marginBottom:8
                            }}
                          >
                            {option.option_text}
                          </Text>
                        </View>
                      </TouchableOpacity>
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
                        padding: 16,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: isCorrect ? "#007A00" : "#CB0505",
                          fontWeight: "600",
                          fontSize: 18,
                          fontFamily:GlobalFonts.MontserratBold,
                          marginBottom:12
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
                            ]?.option?.map((item: any) => {
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
                      <View style={styles.notCorrectRightExplaination}>
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
            <View style={styles.bottomButtonContainer}>
              {submitted ? (
                <Pressable style={styles.button} onPress={handleNextQuestion}>
                  <Text style={styles.buttonText}>Next</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={[
                    styles.button,
                    { backgroundColor: selectedOption ? "#3A2D7D" : "#D4D4D4" },
                  ]}
                  onPress={selectedOption ? handleSubmit : undefined}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      </View>
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
    width: windowWidth * 0.9,
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
    // backgroundColor: "#F5F5F7",
    backgroundColor: "#D4D4D4",
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
    fontSize: 18,
    fontWeight: "700",
    fontFamily: GlobalFonts.MontserratBold,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    position: "absolute",
    marginTop: 300,
    marginBottom: 100,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  heading: {
    paddingBottom: 18,
    fontFamily: GlobalFonts.RobotoRegular,
    color: "#03050A",
  },
  headingText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: GlobalFonts.MontserratSemiBold,
    color: "#03050A",
  },
  headingTexts: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GlobalFonts.RobotoRegular,
    color: "#03050A",
  },
  questionText: {
    color: "#03050A",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: GlobalFonts.MontserratSemiBold,
    marginBottom: 18,
  },
  top: {
    padding: 20,
    flex: 1,
    // display: "flex",
    // justifyContent: "space-between",
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
    // marginBottom: 20,
    flex:1,
    textAlign:'center',
    // gap:8
  },
  correctExplaination: {
    color: "#03050A",
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 10,
  },
  explaination: {
    color: "#03050A",
    fontWeight: "400",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoRegular
  },
  correctOptionText: {
    marginBottom: 10,
    color: "#007A00",
    fontSize:14,
    fontWeight:'400',
    fontFamily:GlobalFonts.RobotoMedium
  },
  wrongAnswerExplaination: {
    color: "#03050A",
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 10,
  },
  wrongAnwerSelectedOption: {
    marginBottom: 8,
    color: "#CB0505",
    fontSize:14,
    fontWeight:'500',
    fontFamily:GlobalFonts.RobotoMedium
  },
  wrongRightExplaination: {
    color: "#03050A",
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 10,
  },
  wrongRightOption: {
    marginBottom: 8,
    color: "#007A00",
    fontSize:14,
    fontWeight:'500',
    fontFamily:GlobalFonts.RobotoMedium
  },
  rightAnswerText: {
    textAlign: "center",
    color: "#007A00",
    fontWeight: "600",
    fontSize: 18,
    fontFamily:GlobalFonts.MontserratBold,
    marginBottom:12
  },
  notCorrectRightExplaination: {
    backgroundColor: "rgba(0, 122, 0, 0.1)",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    marginBottom: 50,
  },
  backArrowImage: {
    width: 24,
    height: 24,
    marginLeft: 0,
    marginBottom: 12,
  },
  patternIdentifier: {
    width: windowWidth - 40,
    height: windowWidth > 400 ? 170 : 150,
    marginBottom: 28,
    borderRadius: 8,
  },
  bottomButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
export default Quiz;
