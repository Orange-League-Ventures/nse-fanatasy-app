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
import CheckBox from '@react-native-community/checkbox';
import { setUser, setLoading, setError, logout }  from '../Redux/Slices/AuthSlice';
import {login} from '../services/authService';
import {useDispatch, useSelector} from 'react-redux';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const LoginForm = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

  const handleLogin = async () => {
    dispatch(setLoading(true));
    try {
      console.log("user info---");
      const user = await login(email,password);
      dispatch(setUser(user));
      console.log("user info---",user);
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

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
    width: 'auto',
    height: 'auto',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'cenetr',
    padding: 0,
  },
  loginform: {
    marginLeft: 16,
    marginRight: 16,
  },
  image: {
    width: 'auto',
    height: 54,
    justifyContent: 'left',
    paddingVertical: 8,
    marginBottom: 42,
  },
  inputcontainer: {
    margintop: 16,
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
