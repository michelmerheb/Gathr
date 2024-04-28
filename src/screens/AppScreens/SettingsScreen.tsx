import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function SettingsScreen() {
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>

      <View style={styles.setting}>
        <View>
            <Text style={styles.settingTitle}>Push Notifications</Text>
            <Text style={styles.settingSubTitle}>Receive Push Notifications from Gathr</Text>
        </View>

        <Switch
          value={pushNotificationsEnabled}
          onValueChange={setPushNotificationsEnabled}
        />
      </View>
      <View style={styles.setting}>
        <View>
            <Text style={styles.settingTitle}>Email Notifications</Text>
            <Text style={styles.settingSubTitle}>Receive Email Notifications from Gathr regarding Events and more.</Text>
        </View>
        
        <Switch
          value={emailNotificationsEnabled}
          onValueChange={setEmailNotificationsEnabled}
        />
      </View>
      <View style={styles.setting}>
        <View>
            <Text style={styles.settingTitle}>Location Services</Text>
            <Text style={styles.settingSubTitle}>Allow us to rach your location, this helps to find events easier.</Text>
        </View>
        <Switch
          value={locationServicesEnabled}
          onValueChange={setLocationServicesEnabled}
        />
      </View>
      <View style={styles.setting}>
        <View>
            <Text style={styles.settingTitle}>Dark Theme</Text>
            <Text style={styles.settingSubTitle}>Turn on or off the Dark Theme</Text>
        </View>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
        />
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete My Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B2C6F',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 20,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  settingSubTitle: {
    color: 'gray',
    fontSize: 12
  },
  deleteButton: {
    backgroundColor: '#9B111E',
    padding: 20,
    margin: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

