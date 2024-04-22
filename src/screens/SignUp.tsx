import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {signup} from '../services/authService';
import { setError, setLoading, setToken, setUser } from '../Redux/Slices/AuthSlice';
import { useDispatch} from 'react-redux';


const SignupForm = (props: any) => {
  const [name, setName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg,setErrorMsg]=useState('');

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    dispatch(setLoading(true));
    try {
      if (!email || !password || !phone_number || !password) {
        setErrorMsg("All fields are required.");
        return;
      }
      const data = await signup(name, email, phone_number, password);
      dispatch(setToken(data.accessToken)); 
      dispatch(setUser(data.user)); 
      props.navigation.navigate('Welcome');
      setErrorMsg('');
    } catch (error:any) {
      dispatch(setError(error.message));
      setErrorMsg(error.message || 'create account Failed:');
      console.error('create account Failed:', error);
      props.navigation.navigate('Signup'); 
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
        {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>} 
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
  errorMsg: {
    color: '#CB0505',
    fontSize: 10,
    marginTop: 10,
  }
});

export default SignupForm;
function dispatch(arg0: { payload: any; type: "auth/setError"; }) {
  throw new Error('Function not implemented.');
}

