import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { AuthState } from "../interfaces/autInterfaces";
import imageUrls from "../constants/imageurls";
import Button from "../common/Button";
import { windowWidth } from "../common/Dimensions";
import GlobalFonts from "../common/GlobalFonts";

const Welcome = (props: any) => {
  const details = useSelector((state: AuthState) => state?.auth);
  const data = details?.user;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.welcome}>
        <View style={styles.started}>
          <View style={styles.container1}>
            <View style={styles.left}>
              <Text style={styles.textinfo}>
                Your Account Has Been Created Successfully
              </Text>
            </View>
            <View style={styles.right}>
              <Image style={styles.image} source={imageUrls.iconParkSuccess} />
            </View>
          </View>
          <View style={styles.container2}>
            <Text style={styles.textContainer}>
              <Text style={styles.welcomeText}>Welcome aboard! </Text>
              <Text style={styles.userNameText}>{data?.name}</Text>
            </Text>
            <Text style={styles.descriptionText}>
              Your account is ready. Get ready to conquer the stock market with
              fun and games!
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonStyle}
            textStyle={styles.textStyle}
            title={"Get Started"}
            onPress={() => props.navigation.navigate("Home")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  welcome: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    // backgroundColor: '#F8F8F8',
  },
  started: {
    marginBottom: 16,
    marginHorizontal: 16,
    marginTop: 32,
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginBottom:8
  },
  left: {
    width: "70%",
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
  },
  container2: {
    display: "flex",
    rowGap: 4,
    // paddingVertical: 8,
  },
  textinfo: {
    fontFamily: GlobalFonts.MontserratBold,
    fontSize: 18,
    lineHeight: 27,
    color: "#007A00",
    fontWeight:'700'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom:8,
    paddingTop:5
  },
  welcomeText: {
    fontFamily: GlobalFonts.MontserratBold,
    fontSize: 18,
    lineHeight: 21,
    color: "#03050A",
    fontWeight:'700'
  },
  userNameText: {
    fontFamily: GlobalFonts.MontserratBold,
    fontSize: 18,
    lineHeight: 21,
    color: "#E66F25",
  },
  descriptionText: {
    fontFamily: GlobalFonts.RobotoRegular,
    fontSize: 14,
    lineHeight: 15.6,
    color: "#717171",
    fontWeight:'400'
  },

  buttonStyle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    height:48
  },

  textStyle: {
    fontFamily: GlobalFonts.RobotoMedium,
    fontSize: 16,
    fontWeight:'500',
    color:'#FFFFFF'
  },

  buttonContainer: {
    width: windowWidth - 32,
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
  },
});

export default Welcome;
