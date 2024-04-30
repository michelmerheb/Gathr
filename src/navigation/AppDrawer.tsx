import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import ProfileScreen from '../screens/AppScreens/Profile/ProfileScreen';
import SettingsScreen from '../screens/AppScreens/Settings/SettingsScreen';
import LogoutComponent from '../screens/AppScreens/Logout/LogoutScreen';
import MenuImage from '../assets/menu.png';
import UserPhoto from '../assets/UserPhoto.jpg';
import SettingsImage from '../assets/SettingsIcon.png';
import ProfileImage from '../assets/ProfileIcon.png';
import LogoutImage from '../assets/LogoutIcon.jpg';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={{backgroundColor: '#5B2C6F'}}>
        <View
          style={{
            padding: 20,
            backgroundColor: '#5B2C6F',
            alignItems: 'center',
          }}>
          <Image
            source={UserPhoto}
            style={{width: 80, height: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text style={{color: 'white', fontSize: 18}}>John Doe</Text>
          <Text style={{color: 'white', fontSize: 12, opacity: 0.8}}>
            john.doe@example.com
          </Text>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <DrawerItemList {...props} />
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

const DrawerIcon = () => {
  return <Image source={MenuImage} style={styles.drawerImage} />;
};

const ProfileIcon = () => {
  return <Image source={ProfileImage} style={styles.images} />;
};

const SettingsIcon = () => {
  return <Image source={SettingsImage} style={styles.images} />;
};

const LogoutIcon = () => {
  return <Image source={LogoutImage} style={styles.images} />;
};

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={() => ({
        headerTitleAlign: 'center',
        drawerActiveBackgroundColor: '#5B2C6F',
        drawerActiveTintColor: 'white',
        drawerLabelStyle: {fontSize: 25, marginVertical: 10},
      })}>
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{drawerIcon: ProfileIcon}}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{drawerIcon: SettingsIcon}}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutComponent}
        options={{drawerIcon: LogoutIcon}}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerImage: {
    width: 40,
    height: 40,
  },
  images: {
    width: 30,
    height: 30,
  },
});
