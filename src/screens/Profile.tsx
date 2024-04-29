import React, { useEffect, useState } from "react";
import {
  DimensionValue,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setLoading,
  setError,
  logout,
} from "../Redux/Slices/AuthSlice";
import { updateUser } from "../services/authService";
import { AuthState } from "../interfaces/autInterfaces";
import GlobalFonts from "../common/GlobalFonts";
import { Dimensions, Platform } from "react-native";

const screenWidth = Dimensions.get("window").width;

const textInputWidth = screenWidth * 0.7; // For example, set it to 80% of the screen width

const Profile = (props: any) => {
  const details = useSelector((state: AuthState) => state?.auth);
  //console.log("details---",details);
  const token = details?.token || "";
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (details && details.user) {
      setUserData({
        name: details.user.name,
        phone_number: details.user.phone_number,
        email: details.user.email,
        password: details.user.password,
      });
    }
  }, [details]);
  
  const [editModes, setEditModes] = useState({
    name: false,
    phone_number: false,
    email: false,
    password: false,
  });

  const handleChange = (field: keyof typeof userData, value: string) => {
    setUserData((prevData: any) => ({ ...prevData, [field]: value }));
  };
  const handleEdit = async (field: keyof typeof userData) => {
    dispatch(setLoading(true));
    try {
      setEditModes((prevModes) => ({
        ...prevModes,
        [field]: !prevModes[field as keyof typeof editModes],
      }));
      if (!editModes[field as keyof typeof editModes]) {
        return;
      }
      const updatedFields: Partial<typeof userData> = {
        [field]: userData[field],
      };

      const updatedUser = await updateUser(token, updatedFields);
      dispatch(setUser(updatedUser.user));
      setErrorMsg("");
    } catch (error) {
      console.error("Error updating user :", error.response.data.message);
      dispatch(setError(error.message));
      setErrorMsg(error.response.data.message || "Error updating user.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <ScrollView>
      <View>
        <View>
          {!props?.isHome ? <Header title={"SETTINGS"} isTab={true} /> : null}
        </View>
        {props?.isHome ? (
          <View style={styles.container}>
            <View style={styles.left}>
              <Image
                source={{
                  uri:
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/0afdad6062808b75f0c28108ce49a468ccef7d64aa18f95e1d0f05400491f9e5?apiKey=7f48bd1f1f1e45f5914640147dc815d6&",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.right}>
              <Text style={styles.text1}>Good morning!!</Text>
              <Text style={styles.text2}>{userData?.name}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.subcontainer}>
            <View style={styles.profileContainer}>
              <View style={styles.imagecontainer}>
                <Image
                  style={styles.profileimage}
                  source={require("../../assets/images/UserImage.png")}
                />
              </View>
              {/* <View style={styles.Referaldetails}>
              <View style={styles.left2}>
                <Text style={styles.refercode}>Referal Code</Text>
                <Text style={styles.code}>JITENDRA3260</Text>
              </View>
              <View style={styles.right2}>
                <Text style={styles.copy}>Copy</Text>
              </View>
            </View> */}
              <View style={styles.Referaldetails}>
                <View
                  style={[
                    styles.details,
                    { borderTopEndRadius: 8, borderTopLeftRadius: 8 },
                  ]}
                >
                  <View style={styles.left2}>
                    {editModes.name ? (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <TextInput
                            value={userData?.name}
                            onChangeText={(text) => handleChange("name", text)}
                            placeholder="Update your name"
                            style={styles.textBorderStyles}
                          />
                          <Text style={styles.refercode}>Name</Text>
                        </View>
                        <Text
                          style={styles.save}
                          onPress={() => handleEdit("name")}
                        >
                          Save
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.edit}>
                        <View>
                          <Text style={styles.detailsName}>
                            {userData?.name}
                          </Text>
                          <Text style={styles.refercode}>Name</Text>
                        </View>
                        <View style={styles.right2}>
                          <TouchableOpacity onPress={() => handleEdit("name")}>
                            <Image
                              style={styles.editIcon}
                              source={require("../../assets/images/EditIcon.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    {/* <Text style={styles.refercode}>Name</Text> */}
                  </View>
                  {/* <View style={styles.right2}>
                    <TouchableOpacity onPress={() => handleEdit('name')}>
                      <Image style={styles.editIcon} source={require('../../assets/images/EditIcon.png')} />
                    </TouchableOpacity>
                  </View> */}
                </View>
                <View style={styles.details}>
                  <View style={styles.left2}>
                    {editModes.phone_number ? (
                      <TextInput
                        value={userData.phone_number}
                        onChangeText={(text) =>
                          handleChange("phone_number", text)
                        }
                        placeholder="Update your MobileNumber"
                      />
                    ) : (
                      <Text style={styles.detailsName}>
                        {userData?.phone_number}
                      </Text>
                    )}
                    <Text style={styles.refercode}>Phone Number</Text>
                  </View>
                  <View style={styles.right2}>
                    <TouchableOpacity
                      onPress={() => handleEdit("phone_number")}
                    >
                      <Image
                        style={styles.editIcon}
                        source={require("../../assets/images/EditIcon.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.details}>
                  <View style={styles.left2}>
                    {editModes.email ? (
                      <TextInput
                        value={userData.email}
                        onChangeText={(text) => handleChange("email", text)}
                        placeholder="Update your email"
                      />
                    ) : (
                      <Text style={styles.detailsName}>{userData?.email}</Text>
                    )}
                    <Text style={styles.refercode}>Email</Text>
                  </View>
                  <View style={styles.right2}>
                    <TouchableOpacity onPress={() => handleEdit("email")}>
                      <Image
                        style={styles.editIcon}
                        source={require("../../assets/images/EditIcon.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={[
                    styles.details,
                    { borderBottomRightRadius: 8, borderBottomLeftRadius: 8 },
                  ]}
                >
                  <View style={styles.left2}>
                    {editModes.password ? (
                      <TextInput
                        value={userData?.password}
                        onChangeText={(text) => handleChange("password", text)}
                        placeholder="Update your password"
                      />
                    ) : (
                      <Text style={styles.detailsName}>********</Text>
                    )}
                    <Text style={styles.refercode}>password</Text>
                  </View>
                  <View style={styles.right2}>
                    <TouchableOpacity onPress={() => handleEdit("password")}>
                      <Image
                        style={styles.editIcon}
                        source={require("../../assets/images/EditIcon.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  left: {
    marginRight: 8,
  },
  right: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    width: 40,
    height: 40,
    aspectRatio: 1,
  },
  text1: {
    color: "#03050A",
    marginBottom: 2,
    fontSize: 12,
    fontFamily: GlobalFonts.RobotoRegular,
  },
  text2: {
    color: "#03050A",
    fontSize: 14,
    fontFamily: GlobalFonts.MontserratSemiBold,
  },
  subcontainer: {
    // backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
  },
  section: {
    backgroundColor: "#F8F8F8",
    flexDirection: "row",
    paddingBottom: 24,
    borderRadius: 8,
    justifyContent: "center",
  },
  profileContainer: {
    height: "auto",
    paddingTop: 8,
  },
  Referaldetails: {
    // flexDirection: 'row',
    // padding: 16,
    // backgroundColor: '#FFFFFF',
    marginVertical: 16,
    // borderRadius: 8,
  },
  details: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    // borderRadius: 8,
  },
  edit: {
    flexDirection: "row",
  },
  imagecontainer: {
    alignItems: "center",
  },
  profileimage: {
    width: 120,
    height: 120,
    borderRadius: 32,
    // borderWidth: 3,
  },
  refercode: {
    fontFamily: GlobalFonts.RobotoRegular,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15.6,
    color: "#717171",
  },
  code: {
    fontFamily: GlobalFonts.MontserratSemiBold,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 21,
    textAlign: "left",
    color: "#C35516",
  },
  detailsName: {
    fontFamily: GlobalFonts.RobotoMedium,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 15.6,
    textAlign: "left",
    color: "#03050A",
  },
  copy: {
    fontFamily: GlobalFonts.MontserratSemiBold,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 21,
    textAlign: "left",
    color: "#3A2D7D",
  },
  left2: {
    flex: 1,
  },
  right2: {
    marginLeft: "auto",
    justifyContent: "center",
  },
  editIcon: {
    width: 15,
    height: 15,
  },
  errorMsg: {
    color: "#CB0505",
    fontSize: 10,
    marginTop: 10,
  },
  save: {
    fontSize: 12,
    fontFamily: GlobalFonts.RobotoRegular,
    color: "#E66F25",
  },
  textBorderStyles: {
    borderBottomWidth: 1,
    borderBottomColor: "#717171",
    marginBottom: 3,
    paddingBottom: 3,
    width: textInputWidth,
  },
});

export default Profile;
