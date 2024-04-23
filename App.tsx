import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
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

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {REACT_APP_BASE_LOCAL_URL} from '@env';
import Home from './src/screens/Home';
import LoginForm from './src/screens/Login';
import SignupForm from './src/screens/SignUp';
import Welcome from './src/screens/Welcome';
import Header from './src/screens/Header';
import Profile from './src/screens/Profile';
import LearnSection from './src/screens/Learn.Section';
import ChartList from './src/screens/ChartList';
import Play from './src/screens/Play';
import Quiz from './src/screens/Quiz';
import {Provider, useSelector} from 'react-redux';
import store from './src/Redux/store';
import Content from './src/screens/Content';
import Words from './src/screens/Words';
import {AuthState} from './src/interfaces/autInterfaces';
import ReportPage from './src/screens/ReportPage';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const [openQuiz, setOpenQuiz] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const [quizData, setQuizData] = useState();
  const [quizType, setQuizType] = useState();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#3A2D7D',
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIconStyle: styles.tabBarIcon,
        }}>
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./assets/images/home.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
          component={HomeStack}
        />
        <Tab.Screen
          name="Learn"
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./assets/images/learn.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
          component={LearnSection}
        />
        <Tab.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./assets/images/profile.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
          component={Profile}
        />
        <Tab.Screen
          name="Play"
          options={{
            headerShown: !openQuiz && true,
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./assets/images/home.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
          component={PlayStack}
        />
      </Tab.Navigator>
    );
  };

  const PlayStack = () => {
    return (
      <Stack.Navigator initialRouteName="PlayScreen">
        <Stack.Screen
          options={{headerShown: false}}
          name="PlayScreen"
          component={Play}
        />
      </Stack.Navigator>
    );
  };

  const HomeStack = (props: any) => {
    return (
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={Home}
        />
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Signup"
          component={SignupForm}
          options={{title: 'Signup'}}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{title: 'Welcome'}}
        />
        {/* <Stack.Screen name="Signup" component={SignupForm} /> */}
        {/* <Stack.Screen name="NewScreen" component={Quiz} /> */}
        <Stack.Screen
          name="ChartList"
          options={({route}: any) => ({
            title:
              route.params?.state.chart_type.charAt(0).toUpperCase() +
              route.params?.state.chart_type.slice(1) +
              ' Chart',
          })}
          component={ChartList}
        />
        <Stack.Screen
          name="Play"
          component={Play}
        />
        <Stack.Screen
          name="ReportPage"
          options={{headerShown: false}}
          component={ReportPage}
        />
        <Stack.Screen
          name="Content"
          options={({route}: any) => ({
            title:
              route.params?.state.topic_name.charAt(0).toUpperCase() +
              route.params?.state.topic_name.slice(1),
          })}
          component={Content}
        />

        <Stack.Screen
          name="Words"
          options={{title: 'Dictionary'}}
          component={Words}
        />
      </Stack.Navigator>
    );
  };
  const MainTabStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  return (
    <Provider store={store}>
      {/* <AppWrapper /> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={MainTabStackNavigator}
          options={{ headerShown:false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginForm}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupForm}
            options={{ title: 'Signup' }}
          />
            <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{headerShown: false}}
          />

        </Stack.Navigator>
      </NavigationContainer>
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
    fontWeight: '500',
    fontSize: 12,
  },
  tabBarIcon: {
    marginTop: 5,
  },
});

export default App;
