import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import FloatingLabelInput from '../components/FloatingLableIInput';

export default function LoginScreen({navigation} : any) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    navigation.navigate('SignUp');
  }
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/LoginHeaderImage.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.BoxContainer}>

        <Text style={styles.SigninText}>Sign In</Text>

        <FloatingLabelInput 
          label="Email"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false} 
        />
        <FloatingLabelInput 
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>


        <Text style={styles.signupText}>Doesn't have account? <TouchableOpacity onPress={handleSignup}><Text style={styles.signupText}> Sign Up</Text></TouchableOpacity></Text>

      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6420AA',
  },
  backgroundImage: {
    width: windowWidth,
    height: windowHeight / 3,
  },
  BoxContainer: {
    flex: 1,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  SigninText: {
    color:'black',
    fontSize: 35,
    marginTop: 40,
    fontWeight: 'bold',
  },

  buttonContainer: {
    marginTop: 30,
    backgroundColor: 'purple',
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signupText: {
    color: 'black',
    fontSize: 15
  },

});

