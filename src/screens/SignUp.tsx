import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ISignup } from '../interfaces/autInterfaces';
import { signup } from '../services/authService';

const SignupForm = (props: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm<ISignup>();

  const onSubmit = async(data: ISignup) => {
    console.log(data);
    try {
      const response = await signup(data);
      console.log({response});
      
    } catch (error) {
        console.log("err",error);
        
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create  account</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Name"
            placeholderTextColor="gray"
          />
        )}
        name="name"
        rules={{ required: true }}
      />
      {errors.name && <Text style={styles.error}>Name  is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            placeholderTextColor="gray"
          />
        )}
        name="email"
        rules={{ required: true }}
      />
      {errors.email && <Text style={styles.error}>Email  is required.</Text>}
      {/* <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            placeholderTextColor="gray"
          />
        )}
        name="phone"
        rules={{ required: true }}
      />
      {errors.phone && <Text style={styles.error}>Phone number is required.</Text>} */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      {errors.password && <Text style={styles.error}>Password is required.</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inlineContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Button title='Login' onPress={() => props.navigation.navigate('Login')} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 100,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: 'black'
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonContainer: {
    width: '80%',
    padding: 5, // Adjust padding as needed
    backgroundColor: '#0080FF', // Example background color
    borderRadius: 5, // Example border radius
    marginTop: 10, // Adjust margin as needed
  },
  buttonText: {
    color: 'white', // Example text color
    textAlign: 'center', // Center text within the button
    fontWeight: 'bold'
  },
  loginText: {
    color: 'black',
    marginRight: 5,
    fontSize: 18
  }
});

export default SignupForm;
