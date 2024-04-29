import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, Text, View, Alert, ScrollView } from 'react-native';
import styles from './SignupStyles';
import FloatingLabelInput from '../../../components/FloatingLableIInput';
import GenderPicker from '../../../components/GenderPicker';
import DatePickerr from '../../../components/DatePicker';
import SubmitButton from '../../../components/SubmitButton';
import { createUser, clearError } from '../../../redux/Slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';

export default function LoginScreen({navigation} : any) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.user.error);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      Alert.alert('Signup Success', 'You are now signed up!');
    }
  }, [user, navigation]);
  

const handleSignup = () => {
  if (!email || !password) {
    Alert.alert('Validation Error', 'Email and password are required.');
    return;
  } else {
    dispatch(createUser({ email, password, token_expires_in: '15m' }));
  }
  
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Image 
        source={require('../../assets/LoginHeaderImage.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.BoxContainer}>

        <Text style={styles.SigninText}>Sign Up Now</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}
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

