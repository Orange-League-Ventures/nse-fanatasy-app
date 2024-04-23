import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { setUser, setLoading, setError, logout,setToken }  from '../Redux/Slices/AuthSlice';
import {login} from '../services/authService';
import {useDispatch} from 'react-redux';


const LoginForm = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg,setErrorMsg]=useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(setLoading(true)); 
    try {
      if (!email || !password) {
        setErrorMsg("Email and password are required.");
        return;
      }
      const data = await login(email, password);
      dispatch(setToken(data.accessToken)); 
      dispatch(setUser(data.user)); 
      props.navigation.navigate('Home'); 
      setErrorMsg('');
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
        {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>} 
        <Text style={styles.moreOptions}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.SignupButton}
          onPress={()=> props.navigation.navigate('Signup')}
          >
          <Text style={styles.SignupbuttonText}>Sign up with Email</Text>
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
  SignupButton:{
    backgroundColor: '#ffffff',
    width: 'auto',
    height: 'auto',
    borderWidth: 1,
    color: '#03050A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: '#D4D4D4',
    marginBottom: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
  },
  SignupbuttonText: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
    color: '#03050A',
  },
  errorMsg: {
    color: '#CB0505',
    fontSize: 10,
    marginTop: 10,
  },
  moreOptions: {
    color: '#717171',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
    marginVertical: 32,
    textAlign: 'center',
  }
  
});

export default LoginForm;
