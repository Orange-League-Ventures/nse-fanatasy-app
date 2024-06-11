import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../common/CustomButton";
import GlobalFonts from "../common/GlobalFonts";
import {
  getAmountDetailsByUserId,
  getStockDetailsByStockSymbol,
  getStockDetailsByStockSymbolAndUserId,
  sellStock,
  updateAmountAfterSelling,
  updateSharesAfterSeling,
} from "../services/stockServices";
import { useSelector } from "react-redux";
import { AuthState } from "../interfaces/autInterfaces";
import { useEffect, useState } from "react";
import { updateAmountAfterBuying } from "../services/stockServices";
import { buyStock } from "../services/stockServices";

const SellScreen = (props: any) => {
  const details = useSelector((state: AuthState) => state?.auth);
  const userId = details?.user?.id;
  const handlePress = () => {
    props.navigation.navigate("Watchlist");
  };
  const [stockDetails, setStockDetails] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchStockDetails = async () => {
      const detail = await getStockDetailsByStockSymbolAndUserId(
        props.route.params.companySymbol,
        userId
      );
      setStockDetails(detail?.data);
    };
    fetchStockDetails();
  }, [userId]);

  const [amount, setAmount] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const amount = await getAmountDetailsByUserId(userId);
      setAmount(amount?.data.amount);
    };
    fetchData();
  }, []);

  const [quantity, setQuantity] = useState(""); // State for quantity input
  const [stockPrice, setStockPrice] = useState("0");

  const [number, setNumber] = useState(0);
  const [totalPrice, setTotalPrice] = useState("");

  const handleSell = async() => {
    setLoading(true);
    try {
      // await updateAmountAfterSelling(userId, totalPrice);
      // await updateSharesAfterSeling(
      //   userId,
      //   props.route.params.companySymbol,
      //   props.route.params.stockPrice,
      //   number
      // );
      await sellStock(userId, props.route.params.companySymbol, number);
      props.navigation.navigate("CompanyDetails");
    } catch (error) {
      // Handle error appropriately (e.g., show an alert or log the error)
      console.error("Error during stock purchase:", error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeNumber = (text) => {
    if (text > parseInt(stockDetails?.data?.quantity)) {
      Alert.alert("There is no limited stocks");
    }
    setNumber(text);
    const totalPrice = text ? (parseFloat(text) * stockPrice).toFixed(2) : "";
    setTotalPrice(String(totalPrice));
  };

  useEffect(() => {
    if (props.route.params && props.route.params.stockPrice) {
      setTotalPrice(String(props.route.params.stockPrice));
      setStockPrice(String(props.route.params.stockPrice));
    }
  }, [props.route.params.stockPrice]);
  
  const handleBuy = async () => {
    // insertDataIntoStocks(
    //   userId,
    //   props.route.params.companyName,
    //   props.route.params.companySymbol,
    //   props.route.params.stockPrice,
    //   number
    // );
    // setLoading(true);
    try {
      const amount = await getAmountDetailsByUserId(userId);
      if(amount?.data?.amount>totalPrice){
        await updateAmountAfterBuying(userId, totalPrice);
        await buyStock(
          userId,
          props.route.params.companyName,
          props.route.params.companySymbol,
          number,
          props.route.params.stockPrice
        );
        props.navigation.navigate("Watchlist");
      }else{
        Alert.alert(`Available amount in your account is not sufficient`)
      }
    } catch (error) {
      // Handle error appropriately (e.g., show an alert or log the error)
      console.error("Error during stock purchase:", error);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require("../../assets/images/stock_back_icon.png")}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.companySymbol}>
            {props.route.params.companySymbol}
          </Text>
          <View style={styles.stockPrices}>
            <Text style={styles.stockPrice}>
              ₹{props.route.params.stockPrice}
            </Text>
            <Text style={styles.stockPrice}>
              ({props.route.params?.perChange.toFixed(2)}%)
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/stock_back_icon.png")}
            style={styles.backArrowImages}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.inputBox}>
          <Text style={styles.quantity}>Quantity</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Eg : 10"
            keyboardType="numeric"
            placeholderTextColor="#D4D4D4"
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.quantity}>Price</Text>
          <TextInput
            style={styles.input}
            value={totalPrice}
            placeholder="Price"
            keyboardType="numeric"
          />
        </View>
      </View>
      {/* {number < parseInt(stockDetails?.data?.quantity) && (
        <View style={styles.bottomButton}>
          <CustomButton
            onPress={handleSell}
            title={`Sell Stock`}
            style={styles.buyButton}
            textStyle={styles.btnText}
          />
        </View>
      )}
      {number > parseInt(stockDetails?.data?.quantity) || !stockDetails && (
        <View style={styles.bottomButton}>
          <CustomButton
            onPress={handleSell}
            title={`Buy Stock`}
            style={styles.buyButton}
            textStyle={styles.btnText}
          />
        </View>
      )} */}
      {!stockDetails || number > parseInt(stockDetails.data.quantity) ? (
        <View style={styles.bottomButton}>
          <View style={styles.enough}>
            <Text style={styles.enoughText}>
              Available amount is not enough
            </Text>
          </View>
          <CustomButton
            onPress={handleBuy}
            title="Buy Stock"
            style={styles.buyButton}
            textStyle={styles.btnText}
            loading={loading}
          />
        </View>
      ) : (
        <View style={styles.bottomButton}>
          <CustomButton
            onPress={handleSell}
            title="Sell Stock"
            style={styles.buyButton}
            textStyle={styles.btnText}
            loading={loading}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 150,
    borderRadius: 8,
    color: "#25D366",
    fontWeight: "600",
    fontSize: 18,
    fontFamily: GlobalFonts.MontserratSemiBold,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    borderColor: "#D4D4D4",
  },
  inputs: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 150,
    borderRadius: 8,
    color: "#03050A",
    fontWeight: "600",
    fontSize: 18,
    fontFamily: GlobalFonts.MontserratSemiBold,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    borderColor: "#D4D4D4",
  },
  buyButton: {
    // backgroundColor: "#3A2D7D",
    // padding: 10,
    // borderRadius: 8,
    // paddingTop: 10,
    // paddingBottom: 10,
    // paddingLeft: 16,
    // paddingRight: 16,
    // borderColor: "white",
    backgroundColor: "#3A2D7D",
    color: "#ffffff",
    fontFamily: GlobalFonts.RobotoMedium,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  btnText: {
    // color: "#FFFFFF",
    // textAlign: "center",
    // fontSize: 16,
    // fontWeight: "600",
    // fontFamily: GlobalFonts.MontserratSemiBold,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GlobalFonts.RobotoMedium,
  },
  backArrowImage: {
    width: 24,
    height: 24,
    marginLeft: 0,
    marginBottom: 12,
  },
  backArrowImages: {
    width: 24,
    height: 24,
    marginLeft: 0,
    marginBottom: 12,
    color: "white",
    opacity:0
  },
  container: {
    // padding: 20,
    flex: 1,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#3A2D7D",
    justifyContent: "space-between",
  },
  inputBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomButton: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  main: {
    paddingLeft: 17,
    paddingRight: 16,
  },
  companySymbol: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: GlobalFonts.MontserratBold,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    textAlign:'center'
  },
  stockPrice: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GlobalFonts.RobotoRegular,
  },
  quantity: {
    color: "#03050A",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GlobalFonts.RobotoRegular,
  },
  enough: {
    backgroundColor: "orange",
    padding: 5,
    borderRadius: 10,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  enoughText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: GlobalFonts.MontserratSemiBold,
  },
  stockPrices: {
    flexDirection: "row",
  },
});
export default SellScreen;
