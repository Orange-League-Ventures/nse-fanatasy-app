import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import imageUrls from "../constants/imageurls";
import GlobalFonts from "../common/GlobalFonts";
import CustomButton from "../common/CustomButton";
import { LineChart } from "react-native-chart-kit";
import {
  getAllQuizIds,
  getScoresForLastSevenDays,
} from "../services/quizServices";
import { useSelector } from "react-redux";
import { AuthState } from "../interfaces/autInterfaces";
import { ActivityIndicator } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const DailyChallanges = (props: any) => {
  const isFocused = useIsFocused();
  const details = useSelector((state: AuthState) => state?.auth);
  const userId = details?.user?.id;
  const [loading, setLoading] = useState(true);
  const [dataNewly, setDataNewly] = useState<any>([]);
  const [days, setDays] = useState<any>();
  useEffect(() => {
    quizIds();
  }, [isFocused]);

  const quizIds = () => {
    getAllQuizIds().then((response) => {
      getContent(response?.data.quiz);
    });
  };
  const getContent = async (quizIds: any) => {
    try {
      setLoading(true);
      const newDatasets = [];
      const colors = [
        "rgba(255, 0, 0, 1)",
        "rgba(0, 255, 0, 1)",
        "rgba(0, 0, 255, 1)",
      ];
      let colorIndex = 0;
      for (const quizIdObj of quizIds) {
        const quizId = quizIdObj.id;
        const response = await getScoresForLastSevenDays({
          quizId: quizId,
          userId: userId,
        });
        const formattedDatasets = response?.map((item) =>
          item.score !== null ? parseFloat(item.score) : 0
        );
        const daysData = response?.map((item) => item.day);

        newDatasets.push({
          data: formattedDatasets,
          // color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          color: (opacity = 1) => colors[colorIndex++ % colors.length],
        });
        setDays(daysData);
      }
      setDataNewly(newDatasets); // Set dataNewly to the newDatasets array
      setLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      setLoading(false); // Set loading state to false in case of error
      console.error("Error:", error);
    }
  };

  const data = {
    labels: days,
    datasets: dataNewly ? dataNewly : [{}],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    yAxisLabel: "",
    propsForVerticalLabels: {
      fontSize: 10,
    },
    formatYLabel: () => "", // Removed the y-axis labels completely
    propsForDots: {
      r: "2", // Adjusted the radius of data points
    },
  };

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipValue, setTooltipValue] = useState("");

  const handleTooltip = (x, y, value) => {
    setTooltipPosition({ x, y });
    setTooltipValue(value);
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <View style={styles.view1}>
      <View>
        <Text style={styles.text2}>Performance Analytics</Text>
      </View>
      <View style={styles.view5}>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : dataNewly.length > 0 ? (
          <LineChart
            data={data}
            width={windowWidth - 3}
            height={220}
            chartConfig={chartConfig}
            bezier
            yAxisInterval={1}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              marginLeft: -30,
            }}
          />
        ) : null}
        {/* {!loading &&
        tooltipVisible && (
            <View
              style={{
                position: "absolute",
                left: tooltipPosition.x - 50, // Adjust tooltip position
                top: tooltipPosition.y - 30, // Adjust tooltip position
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "#fff" }}>{tooltipValue}</Text>
            </View>
          )
        } */}

        {/* <Image source={imageUrls.performanceAnalytics} style={styles.image1} /> */}
      </View>

      <View>
        <Text style={styles.text2}>Test your Knowledge</Text>
      </View>

      <View style={styles.view5}>
        <Image source={imageUrls.testTrading} style={styles.image2} />
      </View>

      {/* <View style={styles.view5}>
        <Image source={imageUrls.dailyChallengeImg} style={styles.image1} />
      </View> */}

      <CustomButton
        onPress={() => props.navigation.navigate("Play")}
        title={`START THE QUIZ`}
        style={styles.view7}
        textStyle={styles.btnText}
      />

      <View>
        <Text style={styles.text2}>Discover Trading Terminology</Text>
      </View>

      <Pressable
        style={styles.view5}
        onPress={() => {
          props.navigation.navigate("Words");
        }}
      >
        <Image source={imageUrls.StockDictionary} style={styles.image2} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 16,
    flex: 1,
    marginTop: 12,
  },
  text2: {
    color: "#03050A",
    width: "100%",
    fontSize: 16,
    fontFamily: GlobalFonts.RobotoMedium,
    marginTop:10
  },
  view3: {
    alignItems: "stretch",
    borderRadius: 8,
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  view4: {
    alignItems: "stretch",
    backgroundColor: "rgba(0, 0, 0, 0.50)",
    color: "#FFF",
    textAlign: "center",
    justifyContent: "center",
  },
  view5: {
    justifyContent: "center",
    alignItems: "stretch",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.50)",
    fontWeight: "400",
    paddingVertical: 8,
  },
  // image1: {
  //   width: windowWidth - 32,
  //   resizeMode: 'cover',
  //   height: windowWidth > 400 ? 360 : 300,
  //   borderRadius: 8,
  // },
  image1: {
    width: windowWidth - 32,
    resizeMode: "cover",
    // height: windowWidth > 400 ? 360 : 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 24,
  },
  image2: {
    width: windowWidth - 32,
    resizeMode: "cover",
    // height: windowWidth > 400 ? 360 : 160,
    height: 180,
    borderRadius: 8,
  },
  view7: {
    borderRadius: 8,
    backgroundColor: "#25D366",
    color: "#FFF",
    marginBottom: 24,
    borderColor: "white",
  },
  btnText: {
    fontFamily: GlobalFonts.MontserratSemiBold,
    fontSize:16,
    fontWeight:'600'
  },
  text8: {
    color: "#C35516",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 10,
    fontWeight: "400",
  },
  customButton: {
    backgroundColor: "green",
    marginTop: 20,
  },
  customButtonText: {
    color: "red",
    fontSize: 20,
  },
});

export default DailyChallanges;
