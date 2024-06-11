import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import RenderHtml from "react-native-render-html";
import { contentByTopicId } from "../services/topicservice";
import { windowHeight } from "../common/Dimensions";

import CustomText from "../common/CustomText";
import GlobalFonts from "../common/GlobalFonts";

const Content = (props: any) => {
  const route: any = useRoute();
  const { width } = useWindowDimensions();

  const topic_id = route?.params?.state?.topic_id;
  // const lesson_id = route?.params?.state?.lesson_id;
  const topic_name = route?.params?.state?.topic_name;

  const [contentItem, setContentItem] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    // props.navigation.setOptions({
    //   headerTitle: `Page ${currentPage} / ${totalPages}`,
    // });
    setLoading(true);
    contentByTopicId({ topic_id })
      .then((response) => {
        const contentResult = response?.data?.content;
        setContentItem(contentResult[0]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // console.log('ERR');
      });
  };
  const handlePress = () => {
    props.navigation.navigate("ChartList", {
      state: { lesson_id: props.route.params?.state?.id, lesson_name: props.route.params?.state?.lesson_name },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainBack}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require("../../assets/images/Vector.png")}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
        <Text style={styles.stylingChanges}>
        {props.route.params?.state.topic_name.charAt(0).toUpperCase() +
               props.route.params?.state.topic_name.slice(1)}
        </Text>
        <Text></Text>
      </View>
      <ScrollView>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3A2D7D" />
          </View>
        )}
        <View>
          {contentItem && (
            <>
              {/* {contentItem.content_image ? ( */}
              <Image
                source={{
                  uri:
                    "https://image.binance.vision/editor-uploads/6da65f0b97a2435f9d12504d3a65df27.png",
                }}
                style={styles.image}
              />
              {/* ) : null} */}
              <Text style={styles.topicName}>{topic_name}</Text>
              <RenderHtml
                contentWidth={width}
                source={{ html: contentItem?.content_value }}
                baseStyle={{ color: "black", fontSize: 14, fontWeight: "400" }}
              />
            </>
          )}
          {/* {(contentItem && contentItem?.content_value.length > (windowHeight - 50)) && <View style={{ ...styles.footer }}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                props.navigation.navigate("ChartList", { state: { lesson_id, lesson_name } })
              }}
            >
              <Text style={styles.buttonText}>Completed</Text>
            </TouchableOpacity>
          </View>} */}
        </View>
      </ScrollView>
      {/* {(contentItem && contentItem?.content_value.length < (windowHeight - 50)) && <View style={{ ...styles.footer, marginHorizontal: 16 }}>
        <TouchableOpacity
          style={styles.nextButton}
          // onPress={onNextPage}
          disabled={currentPage === totalPages} // Disable the button if currentPage equals totalPages
        >
          <Text style={styles.buttonText}>Completed</Text>
        </TouchableOpacity>
      </View>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "green",
    resizeMode: "cover",
    borderRadius:8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    height: 80,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    position: "absolute",
    top: 20,
    bottom: 20,
    left: 0,
    right: 0,
  },
  topicName: {
    marginTop: 18,
    color: "#03050A",
    fontWeight: "700",
    fontSize: 14,
    marginBottom:8,
    fontFamily:GlobalFonts.MontserratSemiBold
  },
  nextButton: {
    width: "100%",
    backgroundColor: "#3A2D7D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  mainBack: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backArrowImage: {
    width: 24,
    height: 24,
    marginLeft: 0,
    marginBottom: 12,
  },
  stylingChanges: {
    marginBottom: 20,
    display: "flex",
    color: "#000000",
    fontSize: 18,
    fontWeight: "700",
    fontFamily:GlobalFonts.MontserratBold
  },
});

export default Content;
