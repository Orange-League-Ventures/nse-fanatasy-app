import React from 'react';
import {Image, StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './src/screens/Home';
import LoginForm from './src/screens/Login';
import SignupForm from './src/screens/SignUp';
import Welcome from './src/screens/Welcome';
import Profile from './src/screens/Profile';
import LearnSection from './src/screens/Learn.Section';
import ChartList from './src/screens/ChartList';
import Play from './src/screens/Play';
import Quiz from './src/screens/Quiz';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import Content from './src/screens/Content';
import Words from './src/screens/Words';
import ReportPage from './src/screens/ReportPage';
import imageUrls from './src/constants/imageurls';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

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
          name="Home "
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Image
                source={imageUrls.home}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
          component={HomeStack}
        />
        <Tab.Screen
          name="Play"
          options={{
            tabBarIcon: ({color, size}) => (
              <Image
                source={imageUrls.gamepad}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
          component={Play}
        />
        <Tab.Screen
          name="Learn"
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Image
                source={imageUrls.learn}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
          component={LearnSection}
        />
        <Tab.Screen
          name="Settings"
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Image
                source={imageUrls.settings}
                style={{width: size, height: size, tintColor: color}}
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
      <Stack.Navigator initialRouteName="HomeScreen" >
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={Home}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginForm}
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
        <Stack.Screen name="Play" component={Play} />
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
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={MainTabStackNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginForm}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={SignupForm}
            options={{title: ''}}
            
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{title: 'Welcome'}}
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
