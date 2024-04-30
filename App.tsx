import React, { useEffect, useState } from "react";
import NavContainer from "./src/navigation/NavigationContainer";
import SplashScreen from "react-native-splash-screen";
import * as Keychain from 'react-native-keychain';
import onDisplayNotifications from './src/services/Notifications'
import { useDispatch } from 'react-redux';
import { setAuthStatus } from './src/redux/Slices/UserSlice';
import { Theme, ThemeContext } from "./src/context/ThemeContext";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(Theme.Light);
  const dispatch = useDispatch();

  const checkAuthentication = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const tokens = JSON.parse(credentials.password);
        if (tokens.accessToken && tokens.refreshToken) {
          dispatch(setAuthStatus(true));
        }
      }
    } catch (error) {
      console.log("Error retrieving tokens", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuthentication().then(() => {
      SplashScreen.hide();
    });
  }, []);

  useEffect(() => {
    onDisplayNotifications();
  }, [])

  if (loading) {
    return null;
  }



  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
        <NavContainer />
    </ThemeContext.Provider>
);
}
