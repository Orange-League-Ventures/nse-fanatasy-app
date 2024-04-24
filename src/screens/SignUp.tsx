import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {signup} from '../services/authService';
import {
  setError,
  setLoading,
  setToken,
  setUser,
} from '../Redux/Slices/AuthSlice';
import InputBox from '../common/InputBox';
import imageUrls from '../constants/imageurls';

type FormValues = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
};
const SignupForm = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleSignUp = async (formData: any) => {
    dispatch(setLoading(true));
    try {
      const {email, password, phone_number, name, confirmPassword} = formData;

      if (!email || !password || !phone_number || !name || !confirmPassword) {
        setErrorMsg('All fields are required.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      const data = await signup(name, email, phone_number, password);
      dispatch(setToken(data.accessToken));
      dispatch(setUser(data.user));
      props.navigation.navigate('Welcome');
      setErrorMsg('');
    } catch (error: any) {
      console.error('create account Failed:', error);
      dispatch(setError(error?.response?.data?.message));
      setErrorMsg(
        error?.response?.data?.message ||
          'Sign up failed. Please try again later.',
      );
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
            render={({field}) => (
              <InputBox
                style={styles.input}
                placeholder="Name"
                autoCapitalize="none"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
            name="name"
            rules={{required: 'Name is required'}} // Define validation rules
            defaultValue=""
          />
          {errors?.name && (
            <Text style={styles.errorMsg}>{errors.name.message}</Text>
          )}

          <Controller
            control={control}
            render={({field}) => (
              <InputBox
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
            name="email"
            rules={{required: 'Email is required'}}
            defaultValue=""
          />
          {errors?.email && (
            <Text style={styles.errorMsg}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            render={({field}) => (
              <InputBox
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType="numeric"
                autoCapitalize="none"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
            name="phone_number"
            rules={{required: 'Mobile number is required'}}
            defaultValue=""
          />
          {errors?.phone_number && (
            <Text style={styles.errorMsg}>{errors.phone_number.message}</Text>
          )}

          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              render={({field}) => (
                <InputBox
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
              name="password"
              rules={{required: 'Password is required'}}
              defaultValue=""
            />
            <TouchableOpacity
              style={styles.passwordIcon}
              onPress={handleShowPassword}>
              <Image source={showPassword ? imageUrls.lockeyeIcon : imageUrls.openEyeIcon} style={{ ...styles.eyeIcon, tintColor: '#D4D4D4'}} />
            </TouchableOpacity>
          </View>
          {errors?.password && (
            <Text style={styles.errorMsg}>{errors.password.message}</Text>
          )}

          <Controller
            control={control}
            render={({field}) => (
              <InputBox
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
            name="confirmPassword"
            rules={{required: 'Confirm password is required'}}
            defaultValue=""
          />
          {errors?.confirmPassword && (
            <Text style={styles.errorMsg}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleSubmit(handleSignUp)}
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
    color: '#03050A',
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
    marginTop: 0,
    marginBottom: 10,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordIcon: {
    position: 'absolute',
    right: 10,
    top: '20%',
  },
  eyeIcon: {
    width: 25,
    height: 25,
  },
});

export default SignupForm;
