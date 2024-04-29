import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/AppScreens/Home/HomeScreen'
import NewsScreen from '../screens/AppScreens/News/NewsScreen';
import ProfileDrawer from './AppDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MyTab = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        let iconName;
        size = focused ? 35 : 20;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if(route.name === 'News') {
          iconName = 'newspaper';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        }
        return <Ionicons name={iconName!} size={size} color={color} />;
      },
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 70,
      },
      tabBarActiveTintColor: 'purple',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name='Home' component={HomeScreen}/>
      <Tab.Screen name='News' component={NewsScreen}/>
      <Tab.Screen name="Profile" component={ProfileDrawer} options={{ title: 'Profile', headerShown: false}}/>
    </Tab.Navigator>
  );
}

export default MyTab;