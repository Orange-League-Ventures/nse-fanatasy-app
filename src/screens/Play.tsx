import React from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import Button from "../common/Button";
import Header from "./Header";
import GlobalFonts from "../common/GlobalFonts";

const Play = (props: any) => {
  const handleSubmit = (quizTypes: string) => {
    props.navigation.navigate("Quiz", { state: { quizTypes } });
  };

  const handleMove = () => {
    props.navigation.navigate("Watchlist");
  };

  return (
    <View>
      <Header title={"PLAY"} isTab={true} />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <View
            style={{
              borderRadius: 12,
              paddingTop: 170,
              marginBottom: 20,
              justifyContent: "flex-end",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("../../assets/images/quiz1Image.png")}
              style={styles.backgroundImage}
            ></ImageBackground>
            <Button
              onPress={() => handleSubmit("Quiz 1")}
              title="Play"
              style={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
          <View
            style={{
              borderRadius: 12,
              paddingTop: 170,
              marginBottom: 20,
              justifyContent: "flex-end",
              alignContent: "center",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <ImageBackground
              source={require("../../assets/images/quiz2Image.png")}
              style={styles.backgroundImage}
            ></ImageBackground>
            <Button
              onPress={() => handleSubmit("Quiz 2")}
              title="Play"
              style={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
          <View
            style={{
              borderRadius: 12,
              paddingTop: 170,
              marginBottom: 20,
              justifyContent: "flex-end",
              alignContent: "center",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <ImageBackground
              source={require("../../assets/images/stock_simulator.png")}
              style={styles.backgroundImage}
            ></ImageBackground>
            <Button
              onPress={() => handleMove()}
              title="Play"
              style={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3A2D7D",
    width: 320,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    fontFamily:GlobalFonts.RobotoMedium
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
    color: "#03050A",
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 30,
  },
  backgroundImage: {
    width: "100%",
    height: 248,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default Play;
