import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "./Header";
import { useEffect, useState } from "react";
import {
  getAmountDetailsByUserId,
  getPortfolioData,
  getTransactionsDataByUserId,
} from "../services/stockServices";
import { useSelector } from "react-redux";
import { AuthState } from "../interfaces/autInterfaces";
import GlobalFonts from "../common/GlobalFonts";
import { useIsFocused } from "@react-navigation/native";
import { NseIndia } from "stock-nse-india";

const Transactions = () => {
  const nseIndia = new NseIndia();
  const details = useSelector((state: AuthState) => state?.auth);
  const userId = details?.user?.id;
  const [portfolioData, setPortfolioData] = useState();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const Data = await getPortfolioData(userId);
        setPortfolioData(Data.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
  }, [isFocused]);

  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);

  // Function to fetch current prices and calculate gainers/losers

  const [transactionData, setTransactionData] = useState();
  useEffect(() => {
    const fetchTransactionsData = async () => {
      try {
        setLoading(true);
        const Data = await getTransactionsDataByUserId(userId);
        setTransactionData(Data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchTransactionsData();
  }, [isFocused]);

  const groupedTransactions = transactionData?.reduce((acc, transaction) => {
    const transactionDate = new Date(transaction.createdAt).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

    if (!acc[transactionDate]) {
      // If not, initialize it with an empty array
      acc[transactionDate] = [];
    }

    // Push the transaction to the corresponding date array
    acc[transactionDate].push(transaction);

    return acc;
  }, {});

  const [selectedTab, setSelectedTab] = useState("gainers");

  const obj = {
    gainers: topGainers,
    losers: topLosers,
  };
  return (
    <View style={styles.main}>
      <View style={styles.top}>
        <Header style={styles.text} title={"Trades"} isTab={true} />
      </View>
      <ScrollView>
        {loading && <ActivityIndicator size="small" color="#0000ff" />}
        {!loading && (
          <View>
            <View style={styles.content}>
              <Text style={styles.stock}>All Stock Transactions</Text>
            </View>
            <View>
              {groupedTransactions &&
                Object.entries(groupedTransactions).length > 0 &&
                Object.entries(groupedTransactions).map(
                  ([date, transactions]) => (
                    <View style={styles.data} key={date}>
                      <Text style={styles.date}>{date}</Text>
                      {transactions.map((transaction: any) => (
                        <View style={styles.data1} key={transaction.id}>
                          <View style={styles.info}>
                            <Text style={styles.stock_names}>
                              {transaction.Stock.stock_name}
                            </Text>
                            <Text style={styles.stock_type}>
                              Type:{" "}
                              <Text style={styles.type}>
                                {transaction.type}
                              </Text>
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.delivery}>
                              {transaction.quantity} (Delivered)
                            </Text>
                            <Text style={styles.amount}>
                              ₹{transaction.price * transaction.quantity}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )
                )}
            </View>
            <View>
              {groupedTransactions &&
                Object.entries(groupedTransactions).length == 0 && (
                  <Text style={styles.transactions}>No Tranctions Done Yet</Text>
                )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    backgroundColor: "#3A2D7D",
    paddingTop: 32,
    paddingBottom: 18,
    paddingLeft: 17,
    paddingRight: 17,
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
    color: "#FFFFFF",
    fontFamily: GlobalFonts.MontserratBold,
    fontWeight: "700",
    fontSize: 18,
  },
  transactions: {
    fontSize: 14,
    fontFamily: GlobalFonts.MontserratSemiBold,
    fontWeight: "400",
    color: "#03050A",
    padding:17
  },
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
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 3,
  },
  stockSymbol: {
    color: "#E66F25",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 4,
  },
  stock_name: {
    color: "#03050A",
    fontSize: 12,
    fontFamily: GlobalFonts.RobotoRegular,
    fontWeight: "400",
    marginBottom: 4,
  },
  averagePrice: {
    color: "#3A2D7D",
    fontSize: 12,
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: "500",
    marginBottom: 8,
  },
  quantity_price: {
    marginTop: 18,
    marginBottom: 18,
  },
  quantity: {
    color: "#25D366",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: "500",
    marginBottom: 4,
  },
  price: {
    color: "#3A2D7D",
    fontSize: 12,
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
  stock: {
    fontSize: 16,
    fontFamily: GlobalFonts.MontserratSemiBold,
    fontWeight: "600",
    color: "#03050A",
  },
  data: {
    display: "flex",
    flexDirection: "column",
    padding: 17,
  },
  data1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
    flexWrap:'wrap'
  },
  date: {
    paddingBottom: 8,
    color: "#3A2D7D",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: GlobalFonts.RobotoMedium,
  },
  stock_names: {
    paddingBottom: 4,
    paddingTop: 4,
    color: "#03050A",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GlobalFonts.RobotoRegular,
  },
  stock_type: {
    paddingBottom: 4,
    color: "#717171",
    fontWeight:'400',
    fontSize:14
  },
  type: {
    color: "#E66F25",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: GlobalFonts.RobotoMedium,
  },
  delivery: {
    color: "#2C76D3",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GlobalFonts.RobotoRegular,
  },
  amount: {
    color: "#03050A",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: GlobalFonts.RobotoRegular,
    alignSelf:'flex-end',
    marginTop:4
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
});
export default Transactions;
