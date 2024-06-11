import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import Profile from "./Profile";
import DailyChallanges from "./DailyChallanges";
import DailyLearning from "./DailyLearning";
import Header from "./Header";
import { NseIndia } from "stock-nse-india";

const Home = (props: any) => {
  return (
    <ScrollView style={styles.container}>
      <Header isHome={true} isTab={true} />
      <Profile isHome={true} />
      <DailyChallanges navigation={props.navigation} />
      {/* <DailyLearning /> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  heading: {
    color: "black",
    fontSize: 30,
  },
  container: {
    backgroundColor: "#fff",
  },
});

export default Home;
