import React, { useEffect } from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { logout } from '../../redux/Slices/UserSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'


export default function LogoutScreen() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect (() => {
      dispatch(logout());
  })
  
  return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.logoutText}>Logging out...</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logoutText: {
    color: 'black',
    fontSize: 20
  }
})

