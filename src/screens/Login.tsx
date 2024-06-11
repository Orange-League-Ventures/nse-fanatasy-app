import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageStyle,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { setUser, setLoading, setToken } from "../Redux/Slices/AuthSlice";
import { login, signupWithGoogle } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import InputBox from "../common/InputBox";
import imageUrls from "../constants/imageurls";
import { AuthState } from "../interfaces/autInterfaces";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import GlobalFonts from "../common/GlobalFonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import CustomCheckBox from "../common/CustomCheckBox";
import {auth}  from "./firebase";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { GoogleSignin ,GoogleSigninButton,statusCodes} from '@react-native-google-signin/google-signin';


type FormData = {
  email: string;
  password: string;
};

const LoginForm = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const dispatch = useDispatch();
  const loading = useSelector((state: AuthState) => state?.auth?.loading);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const isFocused = useIsFocused();

  const handleLogin = async (formData: { email: string; password: string }) => {
    dispatch(setLoading(true));
    const { email, password } = formData;
    try {
      const data = await login(email, password);
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("userData", JSON.stringify(data.user));
      dispatch(setToken(data.accessToken));
      dispatch(setUser(data.user));
      props.navigation.navigate("Home");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(
        error?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const checkAuthStatus = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const userData = await AsyncStorage.getItem("userData");

      if (accessToken && userData) {
        // User is already logged in, navigate to Home screen or any authenticated route
        dispatch(setToken(accessToken));
        dispatch(setUser(JSON.parse(userData)));
        props.navigation.navigate("Home");
      } else {
        // User is not logged in, navigate to Login screen
        props.navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      // Handle the error as needed
    }
  };

  // Call checkAuthStatus when the app starts up
  useEffect(() => {
    reset({
      email: "",
      password: "",
    });
    checkAuthStatus();
  }, []);

  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const userInfo = await GoogleSignin.getCurrentUser();

      const googleCredential = GoogleAuthProvider.credential(idToken);
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // const datas=await auth().signInWithCredential(googleCredential);

      const datas=await signInWithCredential(auth,googleCredential);

      const data = await signupWithGoogle(userInfo?.user?.name,userInfo?.user?.email,userInfo?.user?.id,userInfo?.user?.photo);
      
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("userData", JSON.stringify(data.user));
      dispatch(setToken(data.accessToken));
      dispatch(setUser(data.user));

      props.navigation.navigate("Home");
      setloggedIn(true);
    } catch (error) {
      Alert.alert("error")
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert("Cancel");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Signin in progress");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("PLAY_SERVICES_NOT_AVAILABLE");
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      // webClientId:'54446732572-mv6hm5uamvt29h3qqvv74mbgneb1d08e.apps.googleusercontent.com',
      webClientId:'682218343549-ppht5daqv1iva2du8ti9p70lo2p73ivq.apps.googleusercontent.com',
      // androidClientId:'682218343549-3mv6lmicb76sopp3m86lmu4dt4p98shc.apps.googleusercontent.com',
      iosClientId:'682218343549-uhs3sb4vu4b6j1thvg6t33thlt4mjs76.apps.googleusercontent.com',
    });
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.loginform}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/nseLogo.png")}
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
            errorText={errors?.email?.message ?? ""}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
          />
          {/* <CustomInput
            control={control}
            name="password"
            placeholder="Password"
            error={!!errors.password || !!loginError}
            secureTextEntry={!showPassword}
            errorText={errors?.password?.message ?? ""}
            rules={{
              required: "Password is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid Password",
              },
            }}
          /> */}
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
                  error={!!errors.password || !!loginError}
                />
              )}
              name="password"
              rules={{ required: "* Password is required!" }}
              defaultValue=""
            />
            {loginError && !loading && (
              <Text style={styles.errorMsg}>{loginError}</Text>
            )}
          </View>
          {errors?.password && (
            <Text style={styles.errorMsg}>{errors?.password?.message}</Text>
          )}
        </View>
        <View style={styles.FingerprintAndForgotPassword}>
          {/* <CheckBox
            title="Show Password"
            checked={showPassword}
            onPress={handleShowPassword}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
          /> */}
          <CustomCheckBox
            checked={showPassword}
            onPress={handleShowPassword}
            label="Show Password"
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ForgotPassword")}
          >
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
          title={"Log In"}
          loading={loading}
          style={styles.newButtonStyle}
          textStyle={styles.textStyle}
        />
        <View style={styles.horizontalLineContainer}>
          <View style={styles.horizontalLineLeft} />
          <Text style={styles.moreOptions}>Don't have an account?</Text>
          <View style={styles.horizontalLineRight} />
        </View>
        <TouchableOpacity
          style={styles.SignupButton}
          onPress={signIn}
          // onPress={() => props.navigation.navigate("Signup")}
        >
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.emailIcon as ImageStyle}
          />
          <Text style={styles.SignupbuttonText}>Continue with Google</Text>
        </TouchableOpacity>
        {/* <GoogleSigninButton/> */}
        <TouchableOpacity
          style={styles.SignupButton}
          onPress={() => props.navigation.navigate("Signup")}
        >
          <Image
            source={require("../../assets/images/phone.png")}
            style={styles.emailIcon as ImageStyle}
          />
          <Text style={styles.SignupbuttonText}>
            Continue with Phone Number
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignupButton}
          onPress={() => props.navigation.navigate("Signup")}
        >
          <Image
            source={require("../../assets/images/email.png")}
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
    display: "flex",
    flex: 1,
    width: "auto",
    height: "auto",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    padding: 0,
  },
  loginform: {
    marginLeft: 16,
    marginRight: 16,
  },
  imageContainer: {
    marginHorizontal: 60,
    marginBottom: 20,
    justifyContent: "center",
  },
  image: {
    width: 204,
    height: 54,
  },
  inputcontainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    width: "auto",
    // height: "auto",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    color: "#000000",
    borderColor: "#D4D4D4",
    // marginBottom: 8,
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "400",
    height: 48,
  },
  FingerprintAndForgotPassword: {
    flexDirection: "row", // Distribute space between children
    alignItems: "center", // Align children along the cross axis (vertically)
    marginBottom: 20,
    marginRight: 10,
    justifyContent: "space-between",
  },
  forgotPassword: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14,
    color: "#E66F25",
  },
  loginButton: {
    backgroundColor: "#3A2D7D",
    width: "auto",
    height: "auto",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    color: "#000000",
    borderColor: "#D4D4D4",
    marginBottom: 12,
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "100",
  },
  SignupButton: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    height: "auto",
    borderWidth: 1,
    color: "#03050A",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "#717171",
    marginBottom: 12,
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  buttonText: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    color: "#ffffff",
  },
  SignupbuttonText: {
    fontFamily: GlobalFonts.RobotoMedium,
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    color: "#03050A",
  },
  errorMsg: {
    color: "#CB0505",
    fontSize: 10,
    marginVertical: 5,
  },
  moreOptions: {
    color: "#717171",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14,
    marginVertical: 32,
    textAlign: "center",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordIcon: {
    position: "absolute",
    right: 10,
    top: "20%",
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
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0, // Adjust as needed
  },
  horizontalLineLeft: {
    flex: 1,
    height: 1,
    backgroundColor: "#717171",
    marginRight: 10,
  },
  horizontalLineRight: {
    flex: 1,
    height: 1,
    backgroundColor: "#717171",
    marginLeft: 10,
  },
  loadingButton: {
    opacity: 0.7,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  loadingImage: {
    width: 100, // Adjust the width and height of the image as needed
    height: 100,
  },
  newButtonStyle: {
    backgroundColor: "#3A2D7D",
    color: "#ffffff",
    fontFamily: GlobalFonts.RobotoMedium,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GlobalFonts.RobotoMedium,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingLeft: 0,
  },
  checkboxText: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14,
    color: "#03050A",
  },
});

export default LoginForm;
