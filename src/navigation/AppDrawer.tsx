import React from 'react';
import { View, Text, SafeAreaView, Image, Switch } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ProfileScreen from '../screens/AppScreens/ProfileScreen';
import SettingsScreen from '../screens/AppScreens/SettingsScreen';
import LogoutComponent from '../screens/AppScreens/LogoutScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props : any) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={{ backgroundColor: '#5B2C6F' }}>
        <View style={{ padding: 20, backgroundColor: '#5B2C6F', alignItems: 'center' }}>
          <Image source={require('../assets/UserPhoto.jpg')} style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }} />
          <Text style={{ color: 'white', fontSize: 18 }}>John Doe</Text>
          <Text style={{ color: 'white', fontSize: 12, opacity: 0.8 }}>john.doe@example.com</Text>
        </View>
        <View style={{ backgroundColor: 'white' }}>
          <DrawerItemList {...props} />
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

export default function MyDrawer() {
  return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ route }) => ({
          drawerIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'ProfileDrawer') iconName = 'person';
            else if (route.name === 'Settings') iconName = 'settings';
            else if (route.name === 'Logout') iconName = 'log-out';
            return <Ionicons name={iconName!} size={size} color={color} />;
          },
        })}
      >
        <Drawer.Screen name="ProfileDrawer" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Logout" component={LogoutComponent} options={{ unmountOnBlur: true }} />
      </Drawer.Navigator>
  );
}
