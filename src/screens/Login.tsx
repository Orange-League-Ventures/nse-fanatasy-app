import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { setUser, setLoading, setError, logout,setToken }  from '../Redux/Slices/AuthSlice';
import {login} from '../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import InputBox from '../common/InputBox';
import { AuthState } from '../interfaces/autInterfaces';

type FormData = {
  email: string;
  password: string;
};

const LoginForm = (props: any) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<string | null>(null);
  const loading=useSelector((state: AuthState) => state?.auth?.loading);
  const handleLogin = async (formData: { email: string, password: string }) => {
    dispatch(setLoading(true));
    try {
      const {email,password}=formData;
      const data = await login(email,password);
      dispatch(setToken(data.accessToken)); 
      dispatch(setUser(data.user)); 
      props.navigation.navigate('Home'); 
    } catch (error:any) {
      console.error('Login failed:', error); 
      dispatch(setError(error?.response?.data?.message || 'Login failed. Please check your credentials.'));
      setLoginError(error?.response?.data?.message || 'Login failed. Please check your credentials.');
    }
    finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginform}>
        <View>
          <Image
            source={require('../../assets/images/nseLogo.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.inputcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputBox
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={false}
              />
            )}
            name="email"
            rules={{ required: "email is required" }}
          />
          {errors?.email && <Text style={styles.errorMsg}>{errors?.email?.message}</Text>}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputBox
                style={styles.input}
                placeholder="Password"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={true}
              />
            )}
            name="password"
            rules={{ required: 'Password is required' }}
            defaultValue=""
          />
          {errors?.password && <Text style={styles.errorMsg}>{errors?.password?.message}</Text>}
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit(handleLogin)}
          activeOpacity={1}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        {loginError && !loading && <Text style={styles.errorMsg}>{loginError}</Text>}
        <Text style={styles.moreOptions}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.SignupButton}
          onPress={() => props.navigation.navigate('Signup')}
        >
          <Text style={styles.SignupbuttonText}>Sign up with Email</Text>
        </TouchableOpacity>
        { loading && (
        <View style={styles.loadingContainer}>
          {/* <Image
            source={require('../../assets/images/LoaderIcon.gif')}
            style={styles.loadingImage}
          /> */}
          <ActivityIndicator size="large" color="#3A2D7D"/>
        </View>
      )}
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
    padding: 0,
  },
  loginform: {
    marginLeft: 16,
    marginRight: 16,
  },
  image: {
    width: 205,
    height: 54,
   justifyContent:'flex-end',
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
    marginVertical: 5,
  },
  moreOptions: {
    color: '#717171',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
    marginVertical: 32,
    textAlign: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    Color: '#3A2D7D',
  },
  loadingImage: {
    width: 100, // Adjust the width and height of the image as needed
    height: 100,
  },
  
});

export default LoginForm;
