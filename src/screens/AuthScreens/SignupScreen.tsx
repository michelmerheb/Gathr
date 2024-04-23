import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image, Text, View, Dimensions, Alert, ScrollView } from 'react-native';
import FloatingLabelInput from '../../components/FloatingLableIInput';
import GenderPicker from '../../components/GenderPicker';
import DatePickerr from '../../components/DatePicker';
import SubmitButton from '../../components/SubmitButton';
import { createUser } from '../../redux/Slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

export default function LoginScreen({navigation} : any) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tokenExpiresIn, setTokenExpiresIn] = useState('15m');
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.user.error);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      Alert.alert('Signup Success', 'You are now signed up!');
      navigation.navigate('Login');
    }
  }, [user, navigation]);
  

const handleSignup = () => {
  if (!email || !password) {
    Alert.alert('Validation Error', 'Email and password are required.');
    return;
  }
  dispatch(createUser({ email, password, token_expires_in: tokenExpiresIn }));
  navigation.navigate('Login');
};



  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView style={styles.container}>
      <Image 
        source={require('../../assets/LoginHeaderImage.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.BoxContainer}>

        <Text style={styles.SigninText}>Sign Up Now</Text>

        <FloatingLabelInput 
          label="Username"
          value={username}
          onChangeText={setUsername}

          secureTextEntry={false} 
        />
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

        <GenderPicker/>

        <DatePickerr/>

        <SubmitButton title="SIGN UP" destination={handleSignup}/>


      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6420AA',
  },
  backgroundImage: {
    width: DeviceWidth,
    height: DeviceHeight / 3,
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

});