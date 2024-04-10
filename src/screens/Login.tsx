import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
// import { login } from '../Redux/actions';


const LoginForm = (props: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // Handle form submission here
    // For login functionality, you can call your authentication API here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
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
      {errors.email && <Text style={styles.error}>Email is required.</Text>}
      
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

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.inlineContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Button title='Sign Up' onPress={() => props.navigation.navigate('Signup')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontSize: 30,
    fontWeight:'bold'
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
    padding: 10,
    backgroundColor: '#0080FF',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight:'bold'
  },
  signupText: {
    color: 'black',
    marginRight:5,
    fontSize:18
  }
});

export default LoginForm;
