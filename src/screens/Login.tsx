import React, {useState, useEffect} from 'react';
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
import { setUser, setLoading, setError, logout,setToken }  from '../Redux/Slices/AuthSlice';
import {login} from '../services/authService';
import {useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const LoginForm = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg,setErrorMsg]=useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(setLoading(true)); 
    try {
      const data = await login(email, password);
      console.log("data in handle login---",data);
      dispatch(setToken(data.accessToken)); 
      dispatch(setUser(data.user)); 
      props.navigation.navigate('HomeScreen'); 
      console.log("Login successful! Redirecting to Home screen.", data); 
    } catch (error:any) {
      console.error('Login failed:', error.message); // Log error message
      dispatch(setError(error.message)); 
      setErrorMsg(error.message || 'Login failed. Please check your credentials.');
      props.navigation.navigate('Login'); 
    } finally {
      dispatch(setLoading(false)); // Always set loading to false regardless of success or failure
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginform}>
        <View>
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
        {errorMsg && <Text >{errorMsg}</Text>} 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: 'auto',
    height: 'auto',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 0,
  },
  loginform: {
    marginLeft: 16,
    marginRight: 16,
  },
  image: {
    width: 'auto',
    height: 60,
   justifyContent:'center',
    paddingVertical: 8,
    marginBottom: 42,
  },
  inputcontainer: {
    marginTop: 16,
    marginBottom: 12,
  },
  input: {
    width: 'auto',
    height: 'auto',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    color: '#000000',
    borderColor: '#D4D4D4',
    marginBottom: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '100',
  },

  loginButton: {
    backgroundColor: '#3A2D7D',
    width: 'auto',
    height: 'auto',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    color: '#000000',
    borderColor: '#D4D4D4',
    marginBottom: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '100',
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16.41,
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default LoginForm;
