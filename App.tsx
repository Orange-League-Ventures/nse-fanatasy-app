import React from "react";
import { Image, StyleSheet, useColorScheme } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./src/screens/Home";
import LoginForm from "./src/screens/Login";
import SignupForm from "./src/screens/SignUp";
import Welcome from "./src/screens/Welcome";
import Profile from "./src/screens/Profile";
import LearnSection from "./src/screens/Learn.Section";
import ChartList from "./src/screens/ChartList";
import Play from "./src/screens/Play";
import Quiz from "./src/screens/Quiz";
import { Provider } from "react-redux";
import store from "./src/Redux/store";
import Content from "./src/screens/Content";
import Words from "./src/screens/Words";
import ReportPage from "./src/screens/ReportPage";
import imageUrls from "./src/constants/imageurls";
import Portfolio from "./src/screens/Portfolio";
import Watchlist from "./src/screens/Watchlist";
import BuyScreen from "./src/screens/BuyScreen";
import SellScreen from "./src/screens/SellScreen";
import CompanyDetails from "./src/screens/CompanyDetails";
import Performers from "./src/screens/Performers";
import Transactions from "./src/screens/Transactions";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#3A2D7D",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIconStyle: styles.tabBarIcon,
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={imageUrls.home}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={HomeStack}
        />
        <Tab.Screen
          name="Play"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={imageUrls.gamepad}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Play}
        />
        <Tab.Screen
          name="Learn"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={imageUrls.learn}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={LearnSection}
        />
        {/* <Tab.Screen
          name="Watchlist"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={imageUrls.settings}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Watchlist}
        />
        <Tab.Screen
          name="Portfolio"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={imageUrls.settings}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Portfolio}
        /> */}
        <Tab.Screen
          name="Settings"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={imageUrls.settings}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    );
  };

  const HomeStack = (props: any) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginForm}
        />
        <Stack.Screen
          name="Signup"
          component={SignupForm}
          options={{ title: "Signup" }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="ChartList"
          options={{ headerShown: false }}
          component={ChartList}
        /> */}
        {/* <Stack.Screen
          name="Content"
          // options={({ route }: any) => ({
          //   title:
          //     route.params?.state.topic_name.charAt(0).toUpperCase() +
          //     route.params?.state.topic_name.slice(1),
          //   headerTitleAlign: "center",
          // })}
          options={{ headerShown: false }}
          component={Content}
        /> */}

        {/* <Stack.Screen
          name="Words"
          // options={{ title: "Dictionary" }}
          options={{ headerShown: false }}
          component={Words}
        /> */}
      </Stack.Navigator>
    );
  };
  const MainTabStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  const StockStack = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#3A2D7D",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIconStyle: styles.tabBarIcon,
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={imageUrls.home}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Watchlist}
        />
        <Tab.Screen
          name="Portfolio"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={imageUrls.portfolio}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Portfolio}
        />
        <Tab.Screen
          name="Performers"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={imageUrls.performers}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Performers}
        />
        <Tab.Screen
          name="Trades"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={imageUrls.trades}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Transactions}
        />
      </Tab.Navigator>
    );
  };
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Home"
              component={MainTabStackNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupForm}
              options={{ headerShown: false, title: "Signup" }}
            />
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ReportPage"
              options={{ headerShown: false }}
              component={ReportPage}
            />
            <Stack.Screen
              name="Words"
              // options={{ title: "Dictionary" }}
              options={{ headerShown: false }}
              component={Words}
            />
            <Stack.Screen
              name="Watchlist"
              // options={{ title: "Dictionary" }}
              options={{ headerShown: false }}
              component={StockStack}
            />
            <Stack.Screen
              name="ChartList"
              options={{ headerShown: false }}
              component={ChartList}
            />
            <Stack.Screen
              name="Content"
              // options={({ route }: any) => ({
              //   title:
              //     route.params?.state.topic_name.charAt(0).toUpperCase() +
              //     route.params?.state.topic_name.slice(1),
              //   headerTitleAlign: "center",
              // })}
              options={{ headerShown: false }}
              component={Content}
            />
            <Stack.Screen
              name="BuyScreen"
              // options={{ title: "Dictionary" }}
              options={{ headerShown: false }}
              component={BuyScreen}
            />
            <Stack.Screen
              name="SellScreen"
              // options={{ title: "Dictionary" }}
              options={{ headerShown: false }}
              component={SellScreen}
            />
            <Stack.Screen
              name="CompanyDetails"
              options={{ headerShown: false }}
              component={CompanyDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  tabBarLabel: {
    paddingBottom: 5,
    fontWeight: "500",
    fontSize: 12,
  },
  tabBarIcon: {
    marginTop: 5,
  },
});

export default App;
