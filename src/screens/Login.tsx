import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageStyle,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {setUser, setLoading, setToken} from '../Redux/Slices/AuthSlice';
import {login} from '../services/authService';
import {useDispatch, useSelector} from 'react-redux';
import InputBox from '../common/InputBox';
import imageUrls from '../constants/imageurls';
import {AuthState} from '../interfaces/autInterfaces';
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';

type FormData = {
  email: string;
  password: string;
};

const LoginForm = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormData>();

  const dispatch = useDispatch();
  const loading = useSelector((state: AuthState) => state?.auth?.loading);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (formData: {email: string; password: string}) => {
    dispatch(setLoading(true));
    const {email, password} = formData;
    login(email, password)
      .then(data => {
        dispatch(setToken(data.accessToken));
        dispatch(setUser(data.user));
        props.navigation.navigate('Home');
      })
      .catch((error: any) => {
        console.error('Login failed:', error);
        setLoginError(
          error?.response?.data?.message ||
            'Login failed. Please check your credentials.',
        );
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginform}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/nseLogo.png')}
            style={styles.image as ImageStyle}
          />
        </View>
        <View style={styles.inputcontainer}>
          {/* <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputBox
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={false}
                error={!!errors.email || !!loginError}
              />
            )}
            name="email"
            rules={{required: 'Email is required!'}}
          />
          {errors?.email && (
            <Text style={styles.errorMsg}>{errors?.email?.message}</Text>
          )} */}
          <CustomInput
            control={control}
            name="email"
            placeholder="Email Address"
            keyboardType="email-address"
            error={!!errors.email || !!loginError}
            errorText={errors?.email?.message ?? ''}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            }}
          />
          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <InputBox
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={!!errors.password || !!loginError}
                />
              )}
              name="password"
              rules={{required: 'Password is required!'}}
              defaultValue=""
            />
            <TouchableOpacity
              style={styles.passwordIcon}
              onPress={handleShowPassword}>
              <Image
                source={
                  showPassword ? imageUrls.lockeyeIcon : imageUrls.openEyeIcon
                }
                style={{...styles.eyeIcon, tintColor: '#D4D4D4'}}
              />
            </TouchableOpacity>
          </View>
          {errors?.password && (
            <Text style={styles.errorMsg}>{errors?.password?.message}</Text>
          )}
        </View>
        <View style={styles.FingerprintAndForgotPassword}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit(handleLogin)}
          activeOpacity={1}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
     style={[styles.loginButton, loading && styles.loadingButton]}
    onPress={handleSubmit(handleLogin)}
    activeOpacity={1}
    disabled={loading}
  >
    {loading && (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3A2D7D" />
      </View>
    )}
    <Text style={styles.buttonText}>Log In</Text>
  </TouchableOpacity> */}
        <CustomButton
          onPress={handleSubmit(handleLogin)}
          title={'Log In'}
          loading={loading}
          style={{backgroundColor: '#3A2D7D', color: '#ffffff'}}
        />
        {loginError && !loading && (
          <Text style={styles.errorMsg}>{loginError}</Text>
        )}
        <View style={styles.horizontalLineContainer}>
          <View style={styles.horizontalLineLeft} />
          <Text style={styles.moreOptions}>Don't have an account?</Text>
          <View style={styles.horizontalLineRight} />
        </View>
        <TouchableOpacity
          style={styles.SignupButton}
          onPress={() => props.navigation.navigate('Signup')}>
          <Image
            source={require('../../assets/images/EmailIcon.png')}
            style={styles.emailIcon as ImageStyle}
          />
          <Text style={styles.SignupbuttonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignupButton}
          onPress={() => props.navigation.navigate('Signup')}>
          <Image
            source={require('../../assets/images/EmailIcon.png')}
            style={styles.emailIcon as ImageStyle}
          />
          <Text style={styles.SignupbuttonText}>Continue with Phone Number</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignupButton}
          onPress={() => props.navigation.navigate('Signup')}>
          <Image
            source={require('../../assets/images/EmailIcon.png')}
            style={styles.emailIcon as ImageStyle}
          />
          <Text style={styles.SignupbuttonText}>Signup with Email</Text>
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
  imageContainer: {
    marginHorizontal: 60,
    marginBottom: 20,
    justifyContent: 'center',
  },
  image: {
    width: 204,
    height: 54,
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
    // marginBottom: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  FingerprintAndForgotPassword: {
    flexDirection: 'row', // Distribute space between children
    alignItems: 'center', // Align children along the cross axis (vertically)
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginRight: 10,
  },
  forgotPassword: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
    color: '#E66F25',
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
  SignupButton: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
    borderWidth: 1,
    color: '#03050A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: '#717171',
    marginBottom: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
  SignupbuttonText: {
    fontFamily: 'Roboto',
    fontWeight: '700',
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
  emailIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  horizontalLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0, // Adjust as needed
  },
  horizontalLineLeft: {
    flex: 1,
    height: 1,
    backgroundColor: '#717171',
    marginRight: 10,
  },
  horizontalLineRight: {
    flex: 1,
    height: 1,
    backgroundColor: '#717171',
    marginLeft: 10,
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
  loadingImage: {
    width: 100, // Adjust the width and height of the image as needed
    height: 100,
  },
});

export default LoginForm;
