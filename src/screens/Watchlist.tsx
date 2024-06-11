import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Header from "./Header";
import CustomInput from "../common/CustomInput";
import { TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import { NseIndia } from "stock-nse-india";
import GlobalFonts from "../common/GlobalFonts";
import { useEffect, useState } from "react";
import {
  getAllFavouriteStocks,
  getPortfolioData,
  makeFavouriteStock,
} from "../services/stockServices";
import { useSelector } from "react-redux";
import { AuthState } from "../interfaces/autInterfaces";
import { getAmountDetailsByUserId } from "../services/stockServices";
import { useIsFocused } from "@react-navigation/native";
import InputBox from "../common/InputBox";

const { width: deviceWidth } = Dimensions.get("window");

const cardWidth = (deviceWidth - 32) / 2;
enum DateRange {
  DAY,
  MONTH,
  CUSTOM, // You can define additional ranges as needed
}
const screenWidth = Dimensions.get("window").width;

const Watchlist = (props: any) => {
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const nseIndia = new NseIndia();
  const isFocused = useIsFocused();

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
  const [symbols, setSymbols] = useState();
  const [historicalData, setHistoricalData] = useState([]);

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

  const [showWatchlist, setShowWatchList] = useState(true);
  const details = useSelector((state: AuthState) => state?.auth);
  const userId = details?.user?.id;

  const handleSelectSuggestion = async (symbol: string) => {
    props.navigation.navigate("CompanyDetails", { stockSymbol: symbol });
    setShowSuggestions(false);
    setSearchQuery("");
  };
  const [companyInfo, setCompanyInfo] = useState();
  const [loading, setLoading] = useState(false);
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
  }, [symbols]);
  const handlePress = () => {
    props.navigation.navigate("Play");
  };

  const handleEnter = () => {
    console.log("entered into graph page");
  };

  const handleFavourites = async () => {
    try {
      const data = await makeFavouriteStock(
        userId,
        companyInfo?.info?.symbol,
        companyInfo?.info?.companyName
      );
      console.log(data, "data");
    } catch (error) {
      console.error("Error making stock favorite:", error);
    }
  };
  const [favouriteStock, setFavouriteStock] = useState<any>([]);
  useEffect(() => {
    const fetchFavouriteStocks = async () => {
      const favouriteStock = await getAllFavouriteStocks(userId);
      setFavouriteStock(favouriteStock.data.data);
    };
    fetchFavouriteStocks();
  }, [isFocused]);

  const token = details?.token || "";
  const [userData, setUserData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    profile_picture: "",
  });
  useEffect(() => {
    if (details && details.user) {
      setUserData({
        name: details.user.name,
        phone_number: details.user.phone_number,
        email: details.user.email,
        password: details.user.password,
        profile_picture: details.user.profile_picture,
      });
    }
  }, [details]);

  const [topGainers, setTopGainers] = useState([]);
  const [topLoosers, setTopLoosers] = useState([]);
  const [loadingGainers, setLoadingGainers] = useState(true);
  const [error, setError] = useState(null);
  const [test, setTest] = useState();
  useEffect(() => {
    const fetchTopGainers = async () => {
      try {
        const response = await fetch(
          "https://groww.in/v1/api/stocks_data/explore/v2/indices/GIDXNIFTY100/market_trends?discovery_filter_types=TOP_GAINERS&size=10"
        );
        const loosersResponse = await fetch(
          "https://groww.in/v1/api/stocks_data/explore/v2/indices/GIDXNIFTY100/market_trends?discovery_filter_types=TOP_LOSERS&size=10"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const items = data?.categoryResponseMap?.TOP_GAINERS?.items || [];
        setTest(items);
        setTopGainers(data?.categoryResponseMap?.TOP_GAINERS?.items);

        const loosersData = await loosersResponse.json();
        setTopLoosers(loosersData.categoryResponseMap.TOP_LOSERS.items);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopGainers();
  }, []);

  const [amount, setAmount] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const amount = await getAmountDetailsByUserId(userId);
      setAmount(amount?.data.amount);
    };
    fetchData();
  }, [isFocused]);

  const [portfolioData, setPortfolioData] = useState();
  useEffect(() => {
    const fetchPortfolioData = async () => {
      const Data = await getPortfolioData(userId);

      setPortfolioData(Data.data || []);
    };
    fetchPortfolioData();
  }, [isFocused]);

  const [topLosers, setTopLosers] = useState([]);
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);

  const fetchPerformers = async () => {
    try {
      const updatedData = await Promise.all(
        portfolioData?.map(async (item) => {
          let currentPrice = await nseIndia.getEquityCorporateInfo(
            item.Stock.stock_symbol
          );
          currentPrice = currentPrice?.priceInfo?.lastPrice;

          const { averagePrice, quantity } = item;
          const currentValue = quantity * currentPrice;
          const investedValue = quantity * averagePrice;
          const profitLoss = currentValue - investedValue;
          const profitLossPerc = (profitLoss / investedValue) * 100;

          return {
            ...item,
            currentPrice,
            profitLoss,
            profitLossPerc,
            currentValue,
          };
        })
      );
      const currentValue = updatedData?.reduce(
        (acc, item) => acc + item.currentValue,
        0
      );

      setTotalCurrentValue(currentValue);
    } catch (error) {
      console.error("Error fetching performers:", error);
    }
  };

  useEffect(() => {
    fetchPerformers();
  }, [portfolioData]);

  const totalInvestedValue = portfolioData?.reduce((acc, transaction) => {
    return acc + transaction.quantity * transaction.averagePrice;
  }, 0);

  return (
    <View style={styles.main}>
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
      </View>
      <View style={styles.topss}>
        <View style={styles.profileBox}>
          <View style={styles.profileTop}>
            <View style={styles.profileName}>
              <View style={styles.image}>
                <View style={styles.left}>
                  <Image
                    source={{
                      uri: userData?.profile_picture
                        ? userData?.profile_picture
                        : "https://cdn.builder.io/api/v1/image/assets/TEMP/0afdad6062808b75f0c28108ce49a468ccef7d64aa18f95e1d0f05400491f9e5?apiKey=7f48bd1f1f1e45f5914640147dc815d6&",
                    }}
                    style={styles.images}
                  />
                </View>
                <View style={styles.right}>
                  <Text style={styles.text1}>Welcome!!</Text>
                  <Text style={styles.text2}>{userData?.name}</Text>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={[
                  styles.profit,
                  totalCurrentValue - totalInvestedValue < 0 && {
                    color: "red",
                  },
                ]}
              >
                ₹{(totalCurrentValue - totalInvestedValue)?.toFixed(2)}
              </Text>
              {totalCurrentValue - totalInvestedValue < 0 ? (
                <Text
                  style={[
                    styles.total_profit,
                    totalCurrentValue - totalInvestedValue < 0 && {
                      color: "red",
                    },
                  ]}
                >
                  Total Loss
                </Text>
              ) : (
                <Text style={styles.total_profit}>Total Pofit</Text>
              )}
            </View>
          </View>
          <View style={styles.border}></View>
          <View style={styles.profileBottom}>
            <View style={styles.common}>
              <Text style={styles.investment}>
                ₹{totalCurrentValue?.toFixed(2)}
              </Text>
              <Text style={styles.textCommon}>Current Value</Text>
            </View>
            <View style={styles.common1}>
              <Text style={styles.investment}>
                ₹{totalInvestedValue?.toFixed(2)}
              </Text>
              <Text style={styles.textCommon}>Total Invested</Text>
            </View>
            <View style={styles.common2}>
              <Text style={styles.investment}>₹{amount?.total_amount}</Text>
              <Text style={styles.textCommon}>Balance</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={styles.ScrollView}>
        <View style={styles.inputContainer}>
          <InputBox
            style={styles.input}
            onChangeText={handleSearch}
            value={searchQuery}
            placeholder="Search Stock"
            placeholderTextColor="grey"
          />

          <View>
            {searchQuery && showSuggestions && (
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
        <View style={styles.contianer}>
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.watchlistText}>Your Watchlist</Text>
            <View style={styles.cards}>
              {favouriteStock.map(
                (item: any) =>
                  item.is_favourite && (
                    <View
                      key={item.id}
                      onPointerEnter={handleEnter}
                      style={styles.companyCard}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          handleSelectSuggestion(item.stock_symbol)
                        }
                      >
                        <Text style={styles.companyName}>
                          {item.stock_symbol}
                        </Text>
                        <Text style={styles.companyFullName}>
                          {item.stock_name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
              )}
            </View>
            <View>
              {favouriteStock?.length === 0 && (
                <Text style={styles.stock_names}>No Watchlists</Text>
              )}
            </View>
          </View>
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.watchlistText}>Top Trending</Text>
            <View style={styles.cards}>
              {favouriteStock.map(
                (item: any) =>
                  item.is_favourite && (
                    <View
                      key={item.id}
                      onPointerEnter={handleEnter}
                      style={styles.companyCard}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          handleSelectSuggestion(item.stock_symbol)
                        }
                      >
                        <Text style={styles.companyName}>
                          {item.stock_symbol}
                        </Text>
                        <Text style={styles.companyFullName}>
                          {item.stock_name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
              )}
            </View>
            <View>
              {favouriteStock?.length === 0 && (
                <Text style={styles.stock_names}>No Trendings</Text>
              )}
            </View>
          </View>
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.watchlistText}>Top Gainers</Text>
            <View style={styles.cards}>
              {topGainers?.map((item, index) => {
                return (
                  <View
                    key={index}
                    onPointerEnter={handleEnter}
                    style={styles.companyCard}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        handleSelectSuggestion(item?.company?.nseScriptCode)
                      }
                    >
                      <Image
                        source={{ uri: item?.company?.logoUrl }}
                        style={styles.backArrowImage}
                      />
                      <Text style={styles.companyName}>
                        {item?.company?.companyShortName}
                      </Text>
                      <Text style={styles.companyFullName}>
                        {item?.stats?.ltp}
                      </Text>
                      <View style={styles.stockPrice}>
                        <Text
                          style={[
                            styles.companyFullName,
                            item?.stats?.dayChange > 0
                              ? styles.positive
                              : styles.negative,
                          ]}
                        >
                          {item?.stats?.dayChange.toFixed(2)}
                        </Text>
                        <Text
                          style={[
                            styles.companyFullName,
                            item?.stats?.dayChangePerc > 0
                              ? styles.positive
                              : styles.negative,
                          ]}
                        >
                          ({item?.stats?.dayChangePerc.toFixed(2)}%)
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.watchlistText}>Top Loser's</Text>
            <View style={styles.cards}>
              {topLoosers?.map((item: any, index) => (
                <View
                  key={index}
                  onPointerEnter={handleEnter}
                  style={styles.companyCard}
                >
                  <TouchableOpacity
                    onPress={() =>
                      handleSelectSuggestion(item.company.nseScriptCode)
                    }
                  >
                    <Image
                      source={{
                        uri: item.company.logoUrl,
                      }}
                      style={styles.backArrowImage}
                    />
                    <Text style={styles.companyName}>
                      {item.company.companyShortName}
                    </Text>
                    <Text style={styles.companyFullName}>{item.stats.ltp}</Text>
                    <View style={styles.stockPrice}>
                      <Text
                        style={[
                          styles.companyFullName,
                          item.stats.dayChange > 0
                            ? styles.positive
                            : styles.negative,
                        ]}
                      >
                        {item.stats.dayChange.toFixed(2)}
                      </Text>
                      <Text
                        style={[
                          styles.companyFullName,
                          item.stats.dayChangePerc > 0
                            ? styles.positive
                            : styles.negative,
                        ]}
                      >
                        ({item.stats.dayChangePerc.toFixed(2)}%)
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    flex: 1,
  },
  contianer: {
    padding: 10,
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
    paddingBottom: 36,
  },
  topss: {
    padding: 10,
    marginTop: -64,
    // backgroundColor:'whiet'
  },
  mainBack: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36,
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
    // width: "auto",
    // height: "auto",
    // paddingHorizontal: 16,
    // paddingVertical: 10,
    // borderRadius: 8,
    // backgroundColor: "#ffffff",
    color: "#000000",
    borderColor: "#D4D4D4",
    // marginTop: 8,
    // fontSize: 12,
    // fontFamily: "Roboto",
    // fontWeight: "400",
    // borderWidth: 1,
    // borderBottomWidth: 1,
    // borderBottomColor:'white'
    height: 48,
  },
  watchlistText: {
    fontFamily: GlobalFonts.RobotoBold,
    fontSize: 16,
    color: "#03050A",
    fontWeight: "700",
  },
  companyCard: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    // width: 172,
    width: cardWidth,
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 16,
    paddingRight: 12,
    paddingLeft: 12,
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
    fontFamily: GlobalFonts.RobotoSemiBold,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
  },
  companyFullName: {
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoRegular,
    fontWeight: "400",
    color: "#03050A",
    marginBottom: 4,
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
    marginBottom: 300,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 4,
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
    justifyContent: "space-around",
  },
  profileName: {
    display: "flex",
    flexDirection: "row",
  },
  common: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    flex: 1,
  },
  common1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    flex: 1,
  },
  common2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textCommon: {
    fontSize: 16,
    color: "#03050A",
    fontWeight: "400",
    fontFamily: GlobalFonts.RobotoRegular,
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
    justifyContent: "space-between",
  },
  ScrollView: {
    zIndex: -1,
    backgroundColor: "white",
  },
  inputContainer: {
    // paddingLeft: 20,
    // paddingRight: 20,
    padding: 10,
  },
  image: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#F8F8F8",
    borderRadius: 8,
  },
  left: {
    marginRight: 8,
  },
  right: {
    flexDirection: "column",
  },
  images: {
    width: 40,
    height: 40,
    aspectRatio: 1,
    borderRadius:8
  },
  text1: {
    color: "#03050A",
    marginBottom: 4,
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoRegular,
  },
  text2: {
    color: "#03050A",
    fontSize: 16,
    fontFamily: GlobalFonts.MontserratBold,
  },
  investment: {
    fontFamily: GlobalFonts.MontserratBold,
    fontSize: 18,
    color: "#03050A",
    marginBottom: 4,
    // flex:1
  },
  stockPrice: {
    display: "flex",
    flexDirection: "row",
  },
  positive: {
    color: "#25D366",
  },
  negative: {
    color: "#d55438",
  },
  profit: {
    color: "#25D366",
    fontFamily: GlobalFonts.MontserratBold,
    fontWeight: "700",
    fontSize: 18,
  },
  total_profit: {
    color: "#25D366",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: GlobalFonts.RobotoMedium,
  },
  stock_names: {
    paddingBottom: 4,
    paddingTop: 4,
    color: "#03050A",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GlobalFonts.RobotoRegular,
  },
});

export default Watchlist;
