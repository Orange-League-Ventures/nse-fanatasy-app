import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "./Header";
import { useEffect, useState } from "react";
import {
  getAmountDetailsByUserId,
  getPortfolioData,
} from "../services/stockServices";
import { useSelector } from "react-redux";
import { AuthState } from "../interfaces/autInterfaces";
import GlobalFonts from "../common/GlobalFonts";
import { useIsFocused } from "@react-navigation/native";
import { NseIndia } from "stock-nse-india";
import { ActivityIndicator } from "react-native";

const Performers = (props: any) => {
  const nseIndia = new NseIndia();
  const details = useSelector((state: AuthState) => state?.auth);
  const userId = details?.user?.id;
  const [portfolioData, setPortfolioData] = useState();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // setLoading(true);
        const Data = await getPortfolioData(userId);

        setPortfolioData(Data.data || []);
        // setLoading(false);
      } catch (error) {
        // setLoading(false);
        console.log(error);
      }
    };
    fetchPortfolioData();
  }, [isFocused]);
  const [amount, setAmount] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const amount = await getAmountDetailsByUserId(userId);
      setAmount(amount?.data.amount);
    };
    fetchData();
  }, []);

  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);

  // Function to fetch current prices and calculate gainers/losers
  const fetchPerformers = async () => {
    try {
      setLoading(true);
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
      setLoading(false);

      // const totalCurrentValue = updatedData.reduce(
      //   (acc, item) => acc + item.currentValue,
      //   0
      // );

      const sortedByProfit = updatedData.sort(
        (a, b) => b.profitLossPerc - a.profitLossPerc
      );

      const gainers = sortedByProfit.filter((item) => item.profitLoss > 0);
      const losers = sortedByProfit.filter((item) => item.profitLoss < 0);
      setTopGainers(gainers.slice(0, 5));
      setTopLosers(losers.slice(0, 5));
      // setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching performers:", error);
    }
  };

  useEffect(() => {
    fetchPerformers();
  }, [portfolioData]);

  const [selectedTab, setSelectedTab] = useState("gainers");

  const handleTabPress = (tab: any) => {
    setSelectedTab(tab);
  };
  const obj = {
    gainers: topGainers,
    losers: topLosers,
  };

  // props.navigation.navigate("CompanyDetails", { stockSymbol: symbol });
  const handlePress = (symbol: any) => {
    props.navigation.navigate("CompanyDetails", { stockSymbol: symbol });
  };
  return (
    <View style={styles.main}>
      <View style={styles.top}>
        <Header style={styles.text} title={"Performers"} isTab={true} />
      </View>
      <View style={styles.container}>
        <View style={styles.profileBox}>
          <View style={styles.profileBottom}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "gainers" && styles.selectedTab,
              ]}
              onPress={() => handleTabPress("gainers")}
            >
              <Text
                style={[
                  styles.textCommon,
                  selectedTab === "gainers" && styles.selectedTextCommon,
                ]}
              >
                Top Gainers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "losers" && styles.selectedTab,
              ]}
              onPress={() => handleTabPress("losers")}
            >
              <Text
                style={[
                  styles.textCommon,
                  selectedTab === "losers" && styles.selectedTextCommon,
                ]}
              >
                Top Losers
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        {loading && <ActivityIndicator size="small" color="#0000ff" />}
        {!loading && (
          <View style={styles.content}>
            {obj[selectedTab]?.map((item: any, index: number) => {
              return (
                <Pressable
                  style={styles.cardTop}
                  key={index}
                  onPress={() => handlePress(item?.Stock?.stock_symbol)}
                >
                  <View>
                    <Text style={styles.stockSymbol}>
                      {item?.Stock?.stock_symbol}
                    </Text>
                    <Text style={styles.stock_name}>
                      {item?.Stock?.stock_name}
                    </Text>
                    <Text style={styles.averagePrice}>
                      {item.quantity} shares. Avg:
                      {item?.averagePrice.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.quantity_price}>
                    <Text style={styles.quantity}>
                      ₹{(item?.currentPrice * item?.quantity).toFixed(2)}
                    </Text>
                    <View style={styles.profitPerc}>
                      <Text style={styles.price}>
                        {item?.profitLoss.toFixed(2)}
                      </Text>
                      <Text style={styles.price}>
                        ({item?.profitLossPerc.toFixed(2)})
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    backgroundColor: "#3A2D7D",
  },
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  main: {
    backgroundColor: "#fff",
    flex: 1,
  },
  text: {
    paddingTop: 28,
    paddingBottom: 56,
    color: "#FFFFFF",
    fontFamily: GlobalFonts.MontserratBold,
    fontWeight: "700",
    fontSize: 18,
  },
  //   profileBox: {
  //     maxWidth: 600,
  //     marginHorizontal: "auto",
  //     borderWidth: 1,
  //     borderRadius: 8,
  //     backgroundColor: "white",
  //     borderColor: "white",
  //     marginTop: -60,
  //     paddingTop: 24,
  //     paddingBottom: 24,
  //     alignItems: "center",
  //   },
  profileBox: {
    maxWidth: 600,
    marginHorizontal: "auto",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "white",
    marginTop: -60,
    padding: 8,
    // alignItems: "center",
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
    flex: 1,
  },
  profileBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
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
    color: "#717171",
  },
  selectedTextCommon: {
    color: "#E66F25",
  },
  investment: {
    fontFamily: GlobalFonts.MontserratSemiBold,
    fontSize: 16,
    color: "#03050A",
  },
  card: {
    color: "black",
  },
  cardTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 17,
    paddingRight: 17,
    borderBottomColor: "#F8F8F8",
    borderBottomWidth: 1,
  },
  content: {
    // flexGrow: 1,
    paddingTop: 16,
  },
  stockSymbol: {
    color: "#E66F25",
    fontSize: 16,
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 4,
  },
  stock_name: {
    color: "#03050A",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoRegular,
    fontWeight: "400",
    marginBottom: 4,
  },
  averagePrice: {
    color: "#3A2D7D",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: "400",
    marginBottom: 8,
  },
  quantity_price: {
    marginTop: 18,
    marginBottom: 18,
  },
  quantity: {
    color: "#25D366",
    fontSize: 16,
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: "500",
    marginBottom: 4,
  },
  price: {
    color: "#3A2D7D",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: "500",
  },
  profitPerc: {
    display: "flex",
    flexDirection: "row",
  },
  selectedTab: {
    borderColor: "#E66F25",
    borderRadius: 8,
    // flex:2,
  },
  tab: {
    padding: 8,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 8,
  },
});
export default Performers;
