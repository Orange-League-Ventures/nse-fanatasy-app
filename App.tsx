import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { REACT_APP_BASE_LOCAL_URL } from "@env"
import Home from './src/screens/Home';
import LoginForm from './src/screens/Login';
import SignupForm from './src/screens/SignUp';
import Header from './src/screens/Header';
import Profile from './src/screens/Profile';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  // console.log({ base: REACT_APP_BASE_LOCAL_URL });

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name='Home'
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/images/home.png')}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={HomeStack}
        />
        <Tab.Screen
          name='Profile'
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/images/home.png')}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    )
  }

  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ title: 'Login' }}
        />
        <Stack.Screen name="Signup" component={SignupForm} />
      </Stack.Navigator>
    )
  }


  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  }
});

export default App;
