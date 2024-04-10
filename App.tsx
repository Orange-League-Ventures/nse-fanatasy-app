import React from 'react';
import type { PropsWithChildren } from 'react';
import {
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
import { REACT_APP_BASE_LOCAL_URL } from "@env"
import Home from './src/screens/Home';
import LoginForm from './src/screens/Login';
import SignupForm from './src/screens/SignUp';
import Header from './src/screens/Header';


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


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}
          options={{
            header: props => <Header />,
            title: '', // Hide the default header title
          }}

        />
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ title: 'Login' }}
        />
        <Stack.Screen name="Signup" component={SignupForm} />
      </Stack.Navigator>
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
