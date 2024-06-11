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
import CustomInput from "../common/CustomInput";
import {
  buyStock,
  insertDataIntoStocks,
  updateAmountAfterBuying,
} from "../services/stockServices";
import { useSelector } from "react-redux";
import { AuthState } from "../interfaces/autInterfaces";
import { useEffect, useState } from "react";
import { getAmountDetailsByUserId } from "../services/stockServices";

const BuyScreen = (props: any) => {
  const details = useSelector((state: AuthState) => state?.auth);
  const userId = details?.user?.id;
  const handlePress = () => {
    props.navigation.navigate("CompanyDetails");
  };
  const [totalPrice, setTotalPrice] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    // insertDataIntoStocks(
    //   userId,
    //   props.route.params.companyName,
    //   props.route.params.companySymbol,
    //   props.route.params.stockPrice,
    //   number
    // );
    setLoading(true);
    try {
      const amount = await getAmountDetailsByUserId(userId);
      if(parseInt(amount?.data?.amount.total_amount)>parseInt(totalPrice)){
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
      setLoading(false);
    }
  };
  const [quantity, setQuantity] = useState(""); // State for quantity input
  const [stockPrice, setStockPrice] = useState("0");

  const [number, setNumber] = useState();

  const onChangeNumber = (text:any) => {
    setNumber(text);
    // Calculate total price when the number of stocks changes
    const totalPrice = text ? (parseFloat(text) * stockPrice).toFixed(2) : "";
    setTotalPrice(String(totalPrice));
  };

  useEffect(() => {
    if (props.route.params && props.route.params.stockPrice) {
      setTotalPrice(String(props.route.params.stockPrice));
      setStockPrice(String(props.route.params.stockPrice)); // Convert to string to ensure it's rendered correctly in TextInput
    }
  }, [props.route.params.stockPrice]);

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
              ({props.route.params.perChange.toFixed(2)}%)
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
      <View style={styles.bottomButton}>
        <CustomButton
          onPress={handleSubmit}
          title={`Buy Stock`}
          style={styles.buyButton}
          textStyle={styles.btnText}
          loading={loading}
        />
      </View>
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
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GlobalFonts.RobotoMedium,
  },
  backArrowImage: {
    width: 24,
    height: 24,
    marginLeft: 0,
    marginBottom: 12,
    color: "white",
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
  stockPrices: {
    flexDirection: "row",
  },
});
export default BuyScreen;
