import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/AppScreens/ProfileScreen';
import LogoutComponent from '../screens/AppScreens/LogoutScreen';
import SettingsScreen from '../screens/AppScreens/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
    screenOptions={({ route }) => ({
      drawerIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        } else if (route.name === 'Logout') {
          iconName = focused ? 'log-out' : 'log-out-outline';
        }

        return <Ionicons name={iconName!} size={size} color={color} />;
      },
    })}
  >
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name='Settings' component={SettingsScreen} />
      <Drawer.Screen name="Logout" component={LogoutComponent} options={{unmountOnBlur: true}} />
    </Drawer.Navigator>
  );
}