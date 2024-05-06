import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './ProfileStyles';
import {useTheme, Theme} from '../../../context/ThemeContext';
import UserPhoto from '../../../assets/UserPhoto.jpg';

export default function ProfileScreen() {
  const {theme} = useTheme();

  const themeStyles = StyleSheet.create({
    container: {
      backgroundColor: theme === Theme.Dark ? '#3D1557' : 'white',
    },
    profileName: {
      color: theme === Theme.Dark ? 'white' : 'black',
      fontSize: 30,
      textAlign: 'center',
    },
    PoststitleText: {
      textAlign: 'center',
      color: theme === Theme.Dark ? 'white' : 'black',
      fontSize: 20,
      margin: 10,
      borderBottomWidth: 1,
      borderColor: 'purple',
    },
    textDesc: {
      fontSize: 15,
      color: theme == Theme.Dark ? 'white' : 'black',
      textAlign: 'center',
      borderTopWidth: 1,
      borderTopColor: '#5B2C6F',
    },
    eventsText: {
      color: theme == Theme.Dark ? 'white' : '#5B2C6F',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 40,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={themeStyles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.imageView}>
          <Image source={UserPhoto} style={styles.userImage} />
        </View>

        <Text style={themeStyles.profileName}>Philip Rolodex</Text>

        <Text style={themeStyles.textDesc}>
          🎉 Philip Rolodex | Event Architect 🌟 🌙 Nightlife Visionary &
          Entrepreneur 🚀 Founder @TheNightSkyLounge | @EventureVibes 📍NYC |
          Spinning magic into every event 📩 DM for collaborations & bookings
        </Text>

        <View style={styles.numbersView}>
          <View>
            <Text style={styles.textBold}>298</Text>
            <Text style={styles.textNumber}>Followers</Text>
          </View>
          <View>
            <Text style={styles.textBold}>794</Text>
            <Text style={styles.textNumber}>Following</Text>
          </View>
        </View>
        <Text style={themeStyles.PoststitleText}>Events</Text>
        <Text style={themeStyles.eventsText}>No Events right now</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
