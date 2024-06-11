import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NseIndia } from "stock-nse-india";
import { useCallback, useEffect, useState } from "react";
import GraphComponent from "./graphComponent";
import CustomButton from "../common/CustomButton";
import GlobalFonts from "../common/GlobalFonts";
import {
  getAllFavouriteStocks,
  makeFavouriteStock,
} from "../services/stockServices";
import { useSelector } from "react-redux";
import { AuthState } from "../interfaces/autInterfaces";
import { useIsFocused } from "@react-navigation/native";

enum DateRange {
  DAY,
  MONTH,
  CUSTOM, // You can define additional ranges as needed
}

const CompanyDetails = (props: any) => {
  const nseIndia = new NseIndia();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState();
  const [historicalData, setHistoricalData] = useState([]);

  const details = useSelector((state: AuthState) => state?.auth);
  const userId = details?.user?.id;

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text) {
      try {
        const symbols = await nseIndia.getAllStockSymbols();

        const testingData = await nseIndia.getDataByEndpoint(
          "/api/market-data-pre-open?key=ALL"
        );

        const filtered = symbols?.filter((symbol) =>
          symbol.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching stock symbols:", error);
      }
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };
  const [showWatchlist, setShowWatchList] = useState(true);
  const [symbols, setSymbols] = useState();

  useEffect(() => {
    if (props.route.params?.stockSymbol) {
      const symbol = props.route.params.stockSymbol;
      setSymbols(symbol);
    }
  }, [props]);

  const handleSelectSuggestion = async (symbol: string) => {
    setShowWatchList(false);
    setSymbols(symbol);

    setSearchQuery(symbol);
    setShowSuggestions(false);
  };
  const handlePress = () => {
    props.navigation.navigate("Watchlist");
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await nseIndia.getEquityCorporateInfo(symbols);
        setCompanyInfo(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [symbols, isFocused]);

  async function getEquityIntradayData(
    symbol: string,
    dateRange: DateRange = DateRange.DAY
  ): Promise<IntradayData> {
    let startDate: Date;
    let endDate: Date;

    switch (dateRange) {
      case DateRange.DAY:
        startDate = new Date(); // Today's date
        endDate = new Date(); // Today's date
        break;
      case DateRange.MONTH:
        startDate = new Date();
        startDate.setDate(1); // First day of the current month
        endDate = new Date(); // Today's date
        break;
      case DateRange.CUSTOM:
        // You can define custom logic to specify a custom date range
        break;
      default:
        // Handle invalid range
        break;
    }
    const data = await nseIndia.getEquityIntradayData(
      symbol,
      startDate,
      endDate
    );

    return data;
  }

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        // const data = await nseIndia.getEquityIntradayData("TATAPOWER");
        const symbol = "TATAPOWER";

        const data = await getEquityIntradayData(symbols, DateRange.MONTH);

        setHistoricalData(data["grapthData"]);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };
    fetchHistoricalData();
    const interval = setInterval(fetchHistoricalData, 60000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [symbols]);

  const fetchWeeklyData = async (symbol: string) => {
    try {
      const today = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7);

      console.log("enterdfsdfsdfdfsdsdsdsd");
      console.log(oneWeekAgo.toISOString().split("T")[0], "todaydsdsddsdddd");

      // Fetch historical data for the last week
      const historicalData = await nseIndia.getEquityHistoricalData(symbol, {
        start: oneWeekAgo.toISOString().split("T")[0],
        end: today.toISOString().split("T")[0],
      });

      console.log(historicalData, "historicalDataffsfsfsdfsf");

      console.log("Historical data for the last week:", historicalData);
      return historicalData;
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    fetchWeeklyData("TATAPOWER");
  }, [isFocused]);

  const [favouriteStock, setFavouriteStock] = useState<any>([]);
  const [isfavoritedItem, setIsfavoritedItem] = useState();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFavoritedItem, setIsFavoritedItem] = useState(null);
  useEffect(() => {
    const fetchFavouriteStocks = async () => {
      try {
        const response = await getAllFavouriteStocks(userId);
        const favouriteStocks = response?.data?.data || [];
        setFavouriteStock(favouriteStocks);

        const defaultStock = { stock_symbol: "", is_favourite: false }; // default object

        const foundStock =
          favouriteStocks.find(
            (stock) => stock.stock_symbol === companyInfo?.info?.symbol
          ) || defaultStock;
        setIsFavoritedItem(foundStock);
        setIsFavorited(foundStock.is_favourite); // sync state with fetched data
      } catch (error) {
        console.error("Error fetching favourite stocks:", error);
      }
    };

    fetchFavouriteStocks();
  }, [userId, companyInfo, isFocused]);

  const handleFavourites = async () => {
    try {
      const data = await makeFavouriteStock(
        userId,
        companyInfo?.info?.symbol,
        companyInfo?.info?.companyName
      );
      setIsFavorited(!isFavorited);
      setIsFavoritedItem((prev) => ({ ...prev, is_favourite: !isFavorited }));
    } catch (error) {
      console.error("Error making stock favorite:", error);
    }
  };

  const initialData = [
    { time: "2018-12-22", value: 32.51 },
    { time: "2018-12-23", value: 31.11 },
    { time: "2018-12-24", value: 27.02 },
    { time: "2018-12-25", value: 27.32 },
    { time: "2018-12-26", value: 25.17 },
    { time: "2018-12-27", value: 28.89 },
    { time: "2018-12-28", value: 25.46 },
    { time: "2018-12-29", value: 23.92 },
    { time: "2018-12-30", value: 22.68 },
    { time: "2018-12-31", value: 22.67 },
  ];

  const timePeriods = ["1D", "1W", "1M", "1Y", "3Y", "5Y", "All"];

  const [selectedPeriod, setSelectedPeriod] = useState("1D");
  const [animation] = useState(new Animated.Value(0));

  const handlePressFilter = (period) => {
    setSelectedPeriod(period);
    Animated.spring(animation, {
      toValue: period === selectedPeriod ? 1 : 0,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };
  console.log(selectedPeriod,'selectedPeriod12233');
  
  return (
    <View>
      <View style={styles.top}>
        <View style={styles.mainBack}>
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={require("../../assets/images/stock_back_icon.png")}
              style={styles.backArrowImage}
            />
          </TouchableOpacity>

          <Text style={styles.stockTrading}>Stock Trading Simulator</Text>
          {/* <Header
            style={{ color: "#FFFFFF" }}
            title={"Stock Trading Simulator"}
            isTab={true}
          /> */}
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/stock_back_icon.png")}
              style={styles.backArrowImages}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={handleSearch}
          value={searchQuery}
          placeholder="Search Stock"
          placeholderTextColor="grey"
        />
        <View>
          {showSuggestions && (
            <View style={styles.suggestionDropdown}>
              <FlatList
                data={filteredSuggestions}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectSuggestion(item)}
                  >
                    <Text style={styles.suggestionItem}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.tops}>
        <View style={styles.loader}>
          {loading && <ActivityIndicator size="small" color="#0000ff" />}
        </View>
        {!loading && (
          <View style={styles.contianers}>
            <ScrollView style={styles.contianerss}>
              <View>
                <View style={styles.favourite}>
                  <Text style={styles.companyName}>
                    {companyInfo?.info?.symbol}
                  </Text>
                  <Text
                    style={[
                      styles.stock_names,
                      isFavoritedItem?.is_favourite == true
                        ? styles.favorited
                        : styles.notFavorited,
                    ]}
                    onPress={handleFavourites}
                  >
                    <Text style={styles.emojiContainer}>
                      <Text
                        style={[
                          styles.emoji,
                          isFavoritedItem?.is_favourite && { fontSize: -1 },
                        ]}
                      >
                        {isFavoritedItem?.is_favourite == true ? "⭐️" : "✩"}
                      </Text>
                    </Text>
                  </Text>
                </View>
                <Text style={styles.companyDefinition}>
                  {companyInfo?.info?.companyName}
                </Text>
                <Text style={styles.companyDefinitions}>
                  {companyInfo?.industryInfo?.industry}
                </Text>
                <View style={styles.container}>
                  {timePeriods.map((period) => {
                    const scale = animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.2],
                    });
                    const backgroundColor =
                      period === selectedPeriod ? "#4CAF50" : "#FFFFFF";
                    const color =
                    period === selectedPeriod ? "#FFFFFF" : "#4CAF50";

                    return (
                      <Pressable
                        key={period}
                        onPress={() => handlePressFilter(period)}
                        style={[styles.button, { backgroundColor }]}
                      >
                        <Animated.Text
                          style={[styles.text, { transform: [{ scale }] ,color}]}
                        >
                          {period}
                        </Animated.Text>
                      </Pressable>
                    );
                  })}
                </View>
                <View style={styles.chart}>
                  <GraphComponent
                    data={historicalData}
                    highPrice={companyInfo?.priceInfo?.intraDayHighLow?.max}
                    lowPrice={companyInfo?.priceInfo?.intraDayHighLow?.min}
                    closePrice={companyInfo?.preOpenMarket?.prevClose}
                    companySymbol={companyInfo?.info?.symbol}
                    selectedPeriod={selectedPeriod}
                  />
                  {/* <CandlestickChart/> */}
                </View>
                <Text style={styles.stockPreformance}>Stock Performance</Text>
                <View style={styles.price}>
                  <Text style={styles.priceHeading}>Open Price</Text>
                  <Text style={styles.openTodayHigh}>
                    {companyInfo?.priceInfo?.lastPrice}
                  </Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.priceHeading}>
                    Previous Opening Price
                  </Text>
                  <Text style={styles.commonPrice}>
                    {companyInfo?.preOpenMarket?.prevClose}
                  </Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.priceHeading}>
                    Previous Closing Price
                  </Text>
                  <Text style={styles.commonPrice}>
                    {companyInfo?.preOpenMarket?.prevClose}
                  </Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.priceHeading}>Today’s High</Text>
                  <Text style={styles.openTodayHigh}>
                    {companyInfo?.priceInfo?.intraDayHighLow?.max}
                  </Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.priceHeading}>Today’s Low</Text>
                  <Text style={styles.commonPrice}>
                    {companyInfo?.priceInfo?.intraDayHighLow?.min}
                  </Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.priceHeading}>Week’s High</Text>
                  <Text style={styles.commonPrice}>
                    {companyInfo?.priceInfo?.weekHighLow?.max}
                  </Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.priceHeading}>Week’s Low</Text>
                  <Text style={styles.commonPrice}>
                    {companyInfo?.priceInfo?.weekHighLow?.min}
                  </Text>
                </View>
                {/* <View style={styles.price}>
                  <Text style={styles.priceHeading}>Volume</Text>
                  <Text style={styles.commonPrice}>1234</Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.priceHeading}>P/E</Text>
                  <Text style={styles.commonPrice}>1234</Text>
                </View> */}
              </View>
            </ScrollView>
            <View style={styles.buySellContainer}>
              <CustomButton
                onPress={() =>
                  props.navigation.navigate("SellScreen", {
                    companySymbol: companyInfo?.info?.symbol,
                    companyName: companyInfo?.info?.companyName,
                    stockPrice: companyInfo?.priceInfo?.lastPrice,
                    change: companyInfo?.priceInfo?.change,
                    perChange: companyInfo?.priceInfo?.pChange,
                  })
                }
                title={`Sell`}
                style={styles.sellButton}
                textStyle={styles.btnText}
              />
              <CustomButton
                onPress={() =>
                  props.navigation.navigate("BuyScreen", {
                    companySymbol: companyInfo?.info?.symbol,
                    companyName: companyInfo?.info?.companyName,
                    stockPrice: companyInfo?.priceInfo?.lastPrice,
                    change: companyInfo?.priceInfo?.change,
                    perChange: companyInfo?.priceInfo?.pChange,
                  })
                }
                title={`Buy`}
                style={styles.buyButton}
                textStyle={styles.btnText}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contianer: {
    padding: 20,
    zIndex: -1,
  },
  favourite: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contianers: {
    padding: 20,
    // marginBottom: 300,
    paddingBottom: 300,
    zIndex: -1,
  },
  tops: {
    zIndex: -1,
  },
  top: {
    padding: 16,
    backgroundColor: "#3A2D7D",
  },
  topss: {
    padding: 10,
    marginTop: -60,
    // backgroundColor:'white'
  },
  mainBack: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    alignContent: "center",
  },
  backArrowImage: {
    width: 24,
    height: 24,
    marginLeft: 0,
    marginBottom: 12,
    color: "#FFFFFF",
  },
  backArrowImages: {
    width: 24,
    height: 24,
    marginLeft: 0,
    marginBottom: 12,
    color: "#FFFFFF",
    opacity: 0,
  },
  stockTrading: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: GlobalFonts.MontserratBold,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    width: "auto",
    height: "auto",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    color: "#000000",
    marginBottom: 3,
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "400",
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
    paddingLeft: 16,
  },
  watchlistText: {
    fontFamily: GlobalFonts.RobotoSemiBold,
    fontSize: 16,
    color: "#03050A",
    fontWeight: "600",
  },
  companyCard: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    width: 150,
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 16,
    paddingRight: 12,
    paddingLeft: 12,
    marginRight: 16,
  },
  // companyCard: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   borderRadius: 8,
  //   padding: 10,
  //   marginRight: 5, // Adjust spacing between cards
  // },
  companyName: {
    color: "#E66F25",
    fontFamily: GlobalFonts.MontserratSemiBold,
    fontSize: 18,
    marginBottom: 4,
    fontWeight: "600",
  },
  suggestionDropdown: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    elevation: 5, // for Android shadow
    zIndex: 1,
    maxHeight: 300,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    color: "#E66F25",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoMedium,
  },
  price: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  stockPreformance: {
    color: "#03050A",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: GlobalFonts.RobotoSemiBold,
    marginBottom: 16,
    marginTop: 24,
  },
  priceHeading: {
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoRegular,
    fontWeight: "400",
    color: "#03050A",
  },
  companyDefinition: {
    color: "#03050A",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoRegular,
    marginBottom: 4,
  },
  companyDefinitions: {
    color: "#03050A",
    fontWeight: "400",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoRegular,
    marginBottom: 4,
  },
  chart: {
    marginTop: 20,
  },
  view7: {
    borderRadius: 8,
    backgroundColor: "#25D366",
    color: "#FFF",
    marginBottom: 24,
    borderColor: "white",
  },
  buySellContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 350,
  },
  buyButton: {
    backgroundColor: "#25D366",
    padding: 10,
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: "white",
  },
  sellButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    marginRight: 16,
    borderColor: "white",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GlobalFonts.RobotoMedium,
  },
  loader: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    display: "flex",
  },
  profileBox: {
    // flex: 1,
    maxWidth: 600,
    marginHorizontal: "auto",
    padding: 24,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "white",
  },
  profileTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  border: {
    borderTopColor: "#D4D4D4",
    borderTopWidth: 1,
    marginTop: 12,
    marginBottom: 12,
  },
  profileBottom: {
    display: "flex",
    flexDirection: "row",
    // justifyContent:'space-evenly',
  },
  profileName: {
    display: "flex",
    flexDirection: "row",
  },
  common: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  common1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  common2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textCommon: {
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  ScrollView: {
    marginBottom: 250,
    zIndex: -1,
  },
  inputContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  stock_names: {
    paddingBottom: 4,
    paddingTop: 4,
    color: "#03050A",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GlobalFonts.RobotoRegular,
  },
  openTodayHigh: {
    color: "#E66F25",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: "500",
  },
  commonPrice: {
    color: "#3A2D7D",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: "500",
  },
  emoji: {
    fontSize: 20,
  },
  emojiContainer: {
    width: 34,
    // height: 20,
    display: "flex",
    alignItems: "center",
  },
  favorited: {
    color: "black", // Change color to black when favorited
    // Add other styles as needed
  },
  notFavorited: {
    color: "black",
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  text: {
    fontSize: 14,
    color: '#4CAF50',
  },

});
export default CompanyDetails;
