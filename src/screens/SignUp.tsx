import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { signup } from '../services/authService';
import { setError, setLoading, setToken, setUser } from '../Redux/Slices/AuthSlice';
import InputBox from '../common/InputBox';
import { AuthState } from '../interfaces/autInterfaces';

type FormValues = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
};
const SignupForm = (props: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [passwordError,setPasswordError]=useState<string | null>(null);
  const loading=useSelector((state: AuthState) => state?.auth?.loading);
  const handleSignUp = (formData: any) => {
    dispatch(setLoading(true));
    const { email, password, phone_number, name, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      dispatch(setLoading(false));
      return;
    }
    signup(name, email, phone_number, password)
      .then((data) => {
        dispatch(setToken(data.accessToken));
        dispatch(setUser(data.user));
        props.navigation.navigate('Welcome');
      })
      .catch((error: any) => {
        console.error('create account Failed:', error);
        setErrorMsg(error?.response?.data?.message);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
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
          <Controller
            control={control}
            render={({ field }) => (
              <InputBox
                style={styles.input}
                placeholder="Name"
                autoCapitalize="none"
                value={field.value}
                onChangeText={field.onChange}
                secureTextEntry={false}
                error={!!errors?.name || !!errorMsg}
              />
            )}
            name="name"
            rules={{ required: 'Name is required' }} // Define validation rules
            defaultValue=""
          />
          {errors?.name && <Text style={styles.errorMsg}>{errors.name.message}</Text>}

          <Controller
            control={control}
            render={({ field }) => (
              <InputBox
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={field.value}
                onChangeText={field.onChange}
                secureTextEntry={false}
                error={!!errors?.email || !!errorMsg}
              />
            )}
            name="email"
            rules={{ required: 'Email is required' }}
            defaultValue=""
          />
          {errors?.email && <Text style={styles.errorMsg}>{errors.email.message}</Text>}

          <Controller
            control={control}
            render={({ field }) => (
              <InputBox
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType="numeric"
                autoCapitalize="none"
                value={field.value}
                onChangeText={field.onChange}
                secureTextEntry={false}
                error={!!errors?.phone_number || !!errorMsg}
              />
            )}
            name="phone_number"
            rules={{ required: 'Mobile number is required' }}
            defaultValue=""
          />
          {errors?.phone_number && <Text style={styles.errorMsg}>{errors.phone_number.message}</Text>}

          <Controller
            control={control}
            render={({ field }) => (
              <InputBox
                style={styles.input}
                placeholder="Password"
                value={field.value}
                onChangeText={field.onChange}
                secureTextEntry={true}
                error={!!errors?.password || !!errorMsg || !!passwordError}
              />
            )}
            name="password"
            rules={{ required: 'Password is required' }}
            defaultValue=""
          />
          {errors?.password && <Text style={styles.errorMsg}>{errors.password.message}</Text>}

          <Controller
            control={control}
            render={({ field }) => (
              <InputBox
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={field.value}
                onChangeText={field.onChange}
                error={!!errors?.confirmPassword || !!errorMsg || !!passwordError}
              />
            )}
            name="confirmPassword"
            rules={{ required: 'Confirm password is required' }}
            defaultValue=""
          />
          {errors?.confirmPassword && <Text style={styles.errorMsg}>{errors.confirmPassword.message}</Text>}
        </View>
        {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
      <View style={styles.createButtonContainer}></View>
        {/* <TouchableOpacity
          style={styles.createButton}
          onPress={handleSubmit(handleSignUp)}
          activeOpacity={1}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
    style={[styles.createButton, loading && styles.loadingButton]}
    onPress={handleSubmit(handleSignUp)}
    activeOpacity={1}
    disabled={loading}
  >
    {loading && (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3A2D7D" />
      </View>
    )}
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
    justifyContent: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal:0,
  },
  createAccountText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    color: '#03050A',
    marginBottom: 16,
  },
  textInfo: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
    color: '#717171',
  },
  inputcontainer: {
    marginTop: 8,
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
  createButtonContainer: {
    marginBottom: 0, 
  },
  createButton: {
    backgroundColor: '#3A2D7D',
    width: 'auto',
    height: 'auto',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    color: '#000000',
    borderColor: '#D4D4D4',
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
    marginTop:0,
    marginBottom: 10,
  },
  loadingButton: {
    opacity: 0.7,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  // loadingImage: {
  //   width: 'auto', // Adjust the width and height of the image as needed
  //   height: 'auto',
  // },
});

export default SignupForm;
