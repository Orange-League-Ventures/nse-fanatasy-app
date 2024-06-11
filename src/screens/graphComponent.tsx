import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LineChart, yAxisSides } from "react-native-gifted-charts";
import { CandlestickChart } from "react-native-wagmi-charts";

const datas = [
  {
    timestamp: 1625945400000,
    open: 33575.25,
    high: 33600.52,
    low: 33475.12,
    close: 33520.11,
  },
  {
    timestamp: 1625946300000,
    open: 33565.25,
    high: 33560.52,
    low: 33510.12,
    close: 33520.11,
  },
  {
    timestamp: 1625947200000,
    open: 33510.25,
    high: 33515.52,
    low: 33250.12,
    close: 33250.11,
  },
  {
    timestamp: 1625948100000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11,
  },
  {
    timestamp: 1625948100000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11,
  },
  {
    timestamp: 1625948100000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11,
  },
  {
    timestamp: 1625948100000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11,
  },
  {
    timestamp: 1625948100000,
    open: 33215.25,
    high: 33430.52,
    low: 33215.12,
    close: 33420.11,
  },
];

const GraphComponent = ({
  data,
  highPrice,
  lowPrice,
  closePrice,
  companySymbol,
  selectedPeriod,
}) => {
  console.log(data, "data....");

  const formattedData = data.map(([x, y]) => y);

  const values = data.map(([_, value]) => value);

  // Calculate the maximum value in the dataset
  const maxValue = Math.max(...values);

  // Calculate the difference between each section on the y-axis
  const sectionDifference = Math.ceil(maxValue / 10);

  // Generate y-axis labels based on the maximum value and section difference
  // const yLabels = Array.from({ length: 10 }, (_, index) => (index + 1) * sectionDifference);
  const yLabels = [410, 420, 430, 440, 450];

  const ptDatas = data.map(([timestamp, value]) => {
    const date = new Date(timestamp);
    console.log(date, "dateaasasdasasaasdasd");

    const dateString = `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
    console.log(dateString, "dateString1232321jdskf");

    return { value, date: dateString };
  });

  const minValue = maxValue - 10; // Minimum value on the y-axis
  const noOfSections = 5; // Number of sections on the y-axis
  const stepValue = (maxValue - minValue) / noOfSections; // Step value for each section

  const isFocused = useIsFocused();
  const [apiResponse, setApiResponse] = useState();
  // ["1D", "1W", "1M", "1Y", "3Y", "5Y", "All"]
  const mapping = {
    "1D": ["daily", "intervalInMinutes=5"],
    "1W": ["weekly", "intervalInMinutes=30"],
    "1M": ["monthly", "intervalInMinutes=120"],
    "1Y": ["1y", "intervalInDays=3"],
    "3Y": ["3y", "intervalInDays=15"],
    "5Y": ["5y", "intervalInDays=25"],
    All: ["all", "noOfCandles=70"],
  };
  useEffect(() => {
    fetch(
      `https://groww.in/v1/api/charting_service/v2/chart/exchange/NSE/segment/CASH/${companySymbol}/${mapping[selectedPeriod][0]}?${mapping[selectedPeriod][1]}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setApiResponse(data);
        // Process the data here
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [isFocused, selectedPeriod]);

  const formattedDatas = apiResponse?.candles.map((candle) => ({
    timestamp: candle[0] * 1000,
    open: candle[1],
    high: candle[2],
    low: candle[3],
    close: candle[4],
  }));

  return (
    <View
      style={{
        paddingVertical: 10,
        paddingLeft: 20,
        backgroundColor: "#1C1C1C",
        borderRadius: 12,
        flex: 1,
      }}
    >
      {/* <LineChart
        areaChart
        data={ptDatas}
        rotateLabel
        width={250}
        hideDataPoints
        spacing={10}
        color="#00ff83"
        thickness={2}
        startFillColor="rgba(20,105,81,0.3)"
        endFillColor="rgba(20,85,81,0.01)"
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={5}
        maxValue={maxValue/40}
        // mostNegativeValue={}
        noOfSectionsBelowXAxis={4}
        yAxisOffset={maxValue-10}
        onlyPositive={true}
        yAxisColor="white"
        yAxisThickness={0}
        rulesColor="gray"
        yAxisTextStyle={{ color: "gray" }}
        yAxisSide={yAxisSides.LEFT}
        xAxisColor="lightgray"
        roundToDigits={2}
        pointerConfig={{
          // pointerStripHeight: 100,
          pointerStripColor: "lightgray",
          pointerStripWidth: 2,
          pointerColor: "lightgray",
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: false,
          pointerStripUptoDataPoint:true,
          barTouchable: true,
          stripOverPointer:true,
          strokeDashArray:[6],
          pointerLabelComponent: (items) => {
            console.log(items,'itemsddddddddddd');
            
            return (
              <View
                style={{
                  height: 120,
                  width: 100,
                  justifyContent: "center",
                  marginTop: -30,
                  marginLeft: -40,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    marginBottom: 6,
                    textAlign: "center",
                  }}
                >
                  {items[0].date}
                </Text>

                <View
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 16,
                    backgroundColor: "white",
                  }}
                >
                  <Text style={{ fontWeight: "bold", textAlign: "center" ,color:'#03050A'}}>
                    {"₹" + (items[0].value + (maxValue-10))}
                  </Text>
                </View>
              </View>
            );
          },
        }}
      /> */}
      <ScrollView horizontal>
        <TouchableWithoutFeedback>
          <CandlestickChart.Provider data={formattedDatas}>
            <CandlestickChart height={290}>
              <CandlestickChart.Candles />
              <CandlestickChart.Crosshair>
                <CandlestickChart.Tooltip xGutter={80} />
              </CandlestickChart.Crosshair>
              <CandlestickChart.DatetimeText
                style={{ color: "white" }}
                locale="en-GB"
                options={{
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                }}
              />
            </CandlestickChart>
          </CandlestickChart.Provider>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
    // <View>
    //   <LineChart
    //     style={{ height: 200 }}
    //     gridMin={-20}
    //     gridMax={120}
    //     data={data}
    //     svg={{ stroke: "rgb(134, 65, 244)" }}
    //     contentInset={{ top: 20, bottom: 20 }}
    //   >
    //     <Grid />
    //   </LineChart>

    //   <LineGraph
    //     linePaths={linePaths}
    //     width={600}
    //     height={300}
    //     paddingVert={20}
    //     paddingHorz={20}
    //     maxX={5}
    //     maxY={30}
    //   />
    // </View>
  );
};

export default GraphComponent;