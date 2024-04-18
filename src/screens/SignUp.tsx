import React, {useState, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AuthState} from '../interfaces/autInterfaces';
import {signup} from '../services/authService';
import { setError, setLoading, setToken, setUser } from '../Redux/Slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';

const SignupForm = (props: any) => {
  const [name, setName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state: AuthState) => state?.auth?.loading);
  const error = useSelector((state: AuthState) => state?.auth?.error);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    dispatch(setLoading(true));
    try {
      const data = await signup(name, email, phone_number, password);
      dispatch(setToken(data.accessToken)); 
      dispatch(setUser(data.user)); 
      props.navigation.navigate('Welcome');
    } catch (error:any) {
      dispatch(setError(error.message));
      console.error('create account Failed:', error);
    }
    finally{
      dispatch(setLoading(false));
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginform}>
        <View style={styles.headers}>
          <Text style={styles.createAccountText}>Create Account</Text>
          <Text style={styles.textInfo}>
            Unlock the fun of investing! Create your free NSE Learn account and
            start your journey to stock market mastery.
          </Text>
        </View>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            keyboardType="email-address"
            autoCapitalize="none"
            value={name}
            onChangeText={setName}
          />
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
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            autoCapitalize="none"
            value={phone_number}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleSignUp}
          activeOpacity={1}>
          <Text style={styles.buttonText}>Create Account</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0,
  },
  loginform: {
    marginLeft: 16,
    marginRight: 16,
  },
  headers: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    marginBottom: 42,
  },
  createAccountText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    color: '#03050A', // Specify your desired text color
    marginBottom: 16,
  },
  textInfo: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15.6,
    color: '#717171',
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
  createButton: {
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
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default SignupForm;
function dispatch(arg0: { payload: any; type: "auth/setError"; }) {
  throw new Error('Function not implemented.');
}

