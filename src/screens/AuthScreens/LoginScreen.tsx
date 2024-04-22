import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import FloatingLabelInput from '../../components/FloatingLableIInput';
import SubmitButton from '../../components/SubmitButton';

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
        source={require('../../assets/LoginHeaderImage.png')}
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

        <SubmitButton title="SIGN IN"/>

        <Text style={styles.signupText}>Doesn't have account? <TouchableOpacity onPress={handleSignup}><Text style={[styles.signupText, {color: 'purple', fontWeight:'bold'}]}> Sign Up</Text></TouchableOpacity></Text>

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


  signupText: {
    color: 'black',
    fontSize: 15
  },

});

