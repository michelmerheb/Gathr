import React, {useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import styles from './LogoutStyles';
import {logout} from '../../../redux/Slices/UserSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../redux/store';

export default function LogoutScreen() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(logout());
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="purple" />
      <Text style={styles.logoutText}>Logging out...</Text>
    </View>
  );
}
