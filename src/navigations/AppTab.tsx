import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/AppScreens/HomeScreen'
import ProfileDrawer from './AppDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MyTab = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'ProfileDrawer') {
          iconName = 'person';
        }
        return <Ionicons name={iconName!} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'skyblue',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name='Home' component={HomeScreen}/>
      <Tab.Screen name="ProfileDrawer" component={ProfileDrawer} options={{ title: 'Profile', headerShown: false}}/>
    </Tab.Navigator>
  );
}

export default MyTab;