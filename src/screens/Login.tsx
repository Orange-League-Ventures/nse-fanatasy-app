import React, {useState,useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';

// import { login } from '../Redux/actions';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const LoginForm = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableFingerprint, setEnableFingerprint] = useState(false);
  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with:', email, password);
  };

  // const {
  //   control,
  //   handleSubmit,
  //   formState: {errors},
  // } = useForm();

  // const onSubmit = (data: any) => {
  //   console.log(data); // Handle form submission here
  //   // For login functionality, you can call your authentication API here
  // };

  return (
    <View style={styles.container}>
      <View style={styles.loginform}>
        <View style={styles.image}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.input}
            placeholder="Email-Address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={1}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginform: {
    // backgroundColor:'black',
  },
  image: {
    width: 'auto',
    height: 54,
    justifyContent: 'center',
    marginBottom: 42,
  },
  inputcontainer: {
    marginBottom: 12,
  },
  input: {
    width: 328,
    height: 44,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000000',
    borderColor: '#D4D4D4',
    marginBottom: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '100',
    lineHeight: 15.6,
  },

  loginButton: {
    width: 328,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#3A2D7D',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default LoginForm;
