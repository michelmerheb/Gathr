import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './LoginStyles';
import FloatingLabelInput from '../../../components/FloatingLableIInput';
import SubmitButton from '../../../components/SubmitButton';
import HeaderImage from '../../../assets/LoginHeaderImage.png';
import {loginUser, clearError} from '../../../redux/Slices/UserSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store';

export default function LoginScreen({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
    } else {
      dispatch(loginUser({email, password, token_expires_in: '15m'}));
    }
  };

  const handleSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image source={HeaderImage} style={styles.backgroundImage} />

      <View style={styles.BoxContainer}>
        <Text style={styles.SigninText}>Sign In</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}
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

        <SubmitButton title="SIGN IN" destination={handleLogin} />

        <Text style={styles.signupText}>
          Doesn't have account?{' '}
          <TouchableOpacity onPress={handleSignup}>
            <Text
              style={[
                styles.signupText,
                {color: 'purple', fontWeight: 'bold'},
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
