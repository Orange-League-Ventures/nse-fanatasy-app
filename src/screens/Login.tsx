import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { setUser, setLoading, setError, logout,setToken }  from '../Redux/Slices/AuthSlice';
import {login} from '../services/authService';
import {useDispatch} from 'react-redux';
import InputBox from '../common/InputBox';

type FormData = {
  email: string;
  password: string;
};

const LoginForm = (props: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleLogin = async (formData: { email: string, password: string }) => {
    dispatch(setLoading(true)); 
    try {
      const data = await login(formData.email, formData.password);
      dispatch(setToken(data.accessToken)); 
      dispatch(setUser(data.user)); 
      props.navigation.navigate('Home'); 
    } catch (error:any) {
      console.error('Login failed:', error?.response?.data?.message); 
      dispatch(setError(error?.response?.data?.message || 'Login failed. Please check your credentials.'));
      setLoginError(error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false)); 
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword); 
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
                autoCapitalize="none"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="email"
            rules={{ required: "email is required" }}
          />
          {errors?.email && <Text style={styles.errorMsg}>{errors?.email?.message}</Text>}
          <View style={styles.passwordContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputBox
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="password"
            rules={{ required: 'Password is required' }}
            defaultValue=""
          />
          <TouchableOpacity style={styles.passwordIcon} onPress={handleShowPassword}>
          <Image
              source={require('../../assets/images/eye.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
          {errors?.password && <Text style={styles.errorMsg}>{errors?.password?.message}</Text>}
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit(handleLogin)}
          activeOpacity={1}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        {loginError && <Text style={styles.errorMsg}>{loginError}</Text>}
        <Text style={styles.moreOptions}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.SignupButton}
          onPress={() => props.navigation.navigate('Signup')}
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
  passwordContainer : {
    position : 'relative', 
  },
  passwordIcon : {
    position : 'absolute',
    right : 10,
    top: '20%'
  },
  eyeIcon : {
    width : 25,
    height : 25,
    color : "#D4D4D4",
  }
  
});

export default LoginForm;
