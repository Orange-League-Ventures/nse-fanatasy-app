import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading, setError, logout }  from '../Redux/Slices/AuthSlice';
import { updateUser } from '../services/authService';
import { AuthState } from '../interfaces/autInterfaces';


const Profile = (props: any) => {
  const details = useSelector((state: AuthState) => state?.auth);
  console.log("detaiuls---",details);
   const token=details?.token || '';
  const dispatch = useDispatch();
  const [errorMsg,setErrorMsg]=useState('');
  const [userData, setUserData] = useState({
    name: '',
    phone_number: '',
    email: '',
    password: '',
  });


  useEffect(() => {
    console.log("i am in use loop");

    if (details && details.user) {
      console.log("i am in loop");
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
  const [isLoading, setIsLoading] = useState(true);


  const handleChange = (field: keyof typeof userData, value: string) => {
    setUserData((prevData: any) => ({ ...prevData, [field]: value }));
  };
  const handleEdit = async (field: keyof typeof userData) => {
    dispatch(setLoading(true));
    try {
      // Toggle edit mode for the selected field
      setEditModes((prevModes) => ({
        ...prevModes,
        [field]: !prevModes[field as keyof typeof editModes],
      }));
      if (!editModes[field as keyof typeof editModes]) {
        return;
      }
      const updatedFields: Partial<typeof userData> = { [field]: userData[field] };
  
      const updatedUser = await updateUser(token, updatedFields);
      console.log("updated user---",updateUser);
      dispatch(setUser(updatedUser.user));
    } catch (error:any) {
      console.error('Error updating user:', error);
      dispatch(setError(error.message)); 
      setErrorMsg(error.message || 'Login failed. Please check your credentials.');
    }
    finally{
      dispatch(setLoading(false));
    }
  };
  
 
  return (
    <View>
      <View>
        {!props?.isHome ? <Header title={'PROFILE'} isTab={true} /> : null}
      </View>
      {props?.isHome ? (
        <View style={styles.container}>
          <View style={styles.left}>
            <Image
              source={{
                uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0afdad6062808b75f0c28108ce49a468ccef7d64aa18f95e1d0f05400491f9e5?apiKey=7f48bd1f1f1e45f5914640147dc815d6&',
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
                source={require('../../assets/images/UserImage.png')}
              />
            </View>
            <View style={styles.Referaldetails}>
              <View style={styles.left2}>
                <Text style={styles.refercode}>Referal Code</Text>
                <Text style={styles.code}>JITENDRA3260</Text>
              </View>
              <View style={styles.right2}>
                <Text style={styles.copy}>Copy</Text>
              </View>
            </View>
                <View style={styles.details}>
                  <View style={styles.left2}>
                    {editModes.name ? (
                      <TextInput
                        value={userData?.name}
                        onChangeText={(text) => handleChange('name', text)}
                        placeholder="Update your name"
                      />
                    ) : (
                      <Text style={styles.detailsName}>{userData?.name}</Text>
                    )}
                    <Text style={styles.refercode}>Name</Text>
                  </View>
                  <View style={styles.right2}>
                    <TouchableOpacity onPress={() => handleEdit('name')}>
                      <Image style={styles.editIcon} source={require('../../assets/images/EditIcon.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.details}>
                  <View style={styles.left2}>
                    {editModes.phone_number ? (
                      <TextInput
                        value={userData.phone_number}
                        onChangeText={(text) => handleChange('phone_number', text)}
                        placeholder="Update your MobileNumber"
                      />
                    ) : (
                      <Text style={styles.detailsName}>{userData?.phone_number}</Text>
                    )}
                    <Text style={styles.refercode}>Mobile Number</Text>
                  </View>
                  <View style={styles.right2}>
                    <TouchableOpacity onPress={() => handleEdit('phone_number')}>
                      <Image style={styles.editIcon} source={require('../../assets/images/EditIcon.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.details}>
                  <View style={styles.left2}>
                    {editModes.email ? (
                      <TextInput
                        value={userData.email}
                        onChangeText={(text) => handleChange('email', text)}
                        placeholder="Update your email"
                      />
                    ) : (
                      <Text style={styles.detailsName}>{userData?.email}</Text>
                    )}
                    <Text style={styles.refercode}>Email</Text>
                  </View>
                  <View style={styles.right2}>
                    <TouchableOpacity onPress={() => handleEdit('email')}>
                      <Image style={styles.editIcon} source={require('../../assets/images/EditIcon.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.details}>
                  <View style={styles.left2}>
                    {editModes.password ? (
                      <TextInput
                        value={userData?.password}
                        onChangeText={(text) => handleChange('password', text)}
                        placeholder="Update your password"
                      />
                    ) : (
                      <Text style={styles.detailsName}>********</Text>
                    )}
                    <Text style={styles.refercode}>password</Text>
                  </View>
                  <View style={styles.right2}>
                    <TouchableOpacity onPress={() => handleEdit('password')}>
                      <Image style={styles.editIcon} source={require('../../assets/images/EditIcon.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
          </View>
          {errorMsg && <Text >{errorMsg}</Text>} 
        </View>

      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 8,  
    margin: 16,
    borderRadius : 8,
  },
  left: {
    marginRight: 8,
  },
  right: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: 40,
    height: 40,
    aspectRatio: 1,
  },
  text1: {
    color: '#03050A',
    marginBottom: 4,
    fontSize : 12,
    fontWeight : '400',

  },
  text2: {
    color: '#3A2D7D',
    fontSize : 14,
    fontWeight : '600',

  },
  subcontainer: {
    backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
  },
  section: {
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    paddingBottom: 24,
    borderRadius: 8,
    justifyContent: 'center',
  },
  profileContainer: {
    height: 'auto',
    paddingTop: 8,
  },
  Referaldetails: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 16,
    borderRadius: 8,
  },
  details: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  imagecontainer: {
    alignItems: 'center',
  },
  profileimage: {
    width: 120,
    height: 120,
    borderRadius: 32,
    borderWidth: 3,
  },
  refercode: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15.6,
    color: '#717171',
  },
  code: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    textAlign: 'left',
    color: '#C35516',
  },
  detailsName: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 15.6,
    textAlign: 'left',
    color: '#03050A',
  },
  copy: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    textAlign: 'left',
    color: '#3A2D7D',
  },
  left2: {
    flex: 1,
  },
  right2: {
    marginLeft: 'auto',
    justifyContent: 'center',
  },
  editIcon: {
    width: 15,
    height: 15,
  },
});

export default Profile;
function setUserData(arg0: (prevData: any) => any) {
  throw new Error('Function not implemented.');
}

