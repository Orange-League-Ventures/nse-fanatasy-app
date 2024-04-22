import React, { useState } from 'react';
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
import LearnSection from './src/screens/Learn.Section';
import ChartList from './src/screens/ChartList';
import Play from './src/screens/Play';
import Quiz from './src/screens/Quiz';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const[openQuiz,setOpenQuiz]=useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const [quizData, setQuizData] = useState();
  const [quizType,setQuizType]=useState()
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator >
        <Tab.Screen
          name='Home'
          options={{
            headerShown: false,
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
          name='Learn'
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/images/learn.png')}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={LearnSection}
        />
        <Tab.Screen
          name='Profile'
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/images/profile.png')}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Profile}
        />
        {/* <Tab.Screen
          name='Play'
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/images/profile.png')}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Play}
          initialParams={{ openQuiz, setOpenQuiz }}
        /> */}
        <Tab.Screen
          name='Play'
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/images/home.png')}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
          component={Play}
          initialParams={{ openQuiz, setOpenQuiz ,setQuizData,quizData,setQuizType}}
        />
      </Tab.Navigator>
    )
  }

  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName="HomeScreen"  >
        <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={Home} />
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ title: 'Login' }}
        />
        <Stack.Screen name="Signup" component={SignupForm} />
        {/* <Stack.Screen name="NewScreen" component={Quiz} /> */}
        <Stack.Screen name="ChartList" component={ChartList} />
      </Stack.Navigator>
    )
  }


  return (
    <NavigationContainer>
      {/* <TabNavigator /> */}
      {openQuiz ? <Quiz openQuiz={openQuiz} setOpenQuiz={setOpenQuiz} setQuizData={setQuizData} quizData={quizData} quizType={quizType}/> : <TabNavigator />}
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
