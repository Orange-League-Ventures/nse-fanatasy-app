import { TouchableOpacity, View, Image, TextInput, Text, FlatList } from "react-native";
import GlobalFonts from "../common/GlobalFonts";
import Header from "./Header";
import { useState } from "react";
import { NseIndia } from "stock-nse-india";

const CommonTopSearch = (props:any) => {
  const handlePress = () => {
    props.navigation.navigate("Play");
  };
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const nseIndia = new NseIndia();
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text) {
      try {
        const symbols = await nseIndia.getAllStockSymbols();

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
          <Header
            style={{ color: "#FFFFFF" }}
            title={"Stock Trading Simulator"}
            isTab={true}
          />
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
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    padding: 20,
    zIndex: -1, // Ensure the view content is behind the dropdown
  },
  top: {
    padding: 20,
    backgroundColor: "#3A2D7D",
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
    color: "#FFFFFF",
  },
  input: {
    width: "auto",
    height: "auto",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    color: "#000000",
    // borderColor: "#D4D4D4",
    marginTop: 8,
    marginBottom: 3,
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "400",
  },
  watchlistText: {
    fontFamily: GlobalFonts.RobotoSemiBold,
    fontSize: 16,
    color: "#03050A",
    fontWeight: "600",
  },
  companyCard: {
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  companyName: {
    color: "#E66F25",
    fontFamily: GlobalFonts.RobotoMedium,
    fontSize: 14,
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
});

export default CommonTopSearch;
