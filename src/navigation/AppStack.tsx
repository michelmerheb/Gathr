import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import SignUpScreen from "../screens/AuthScreens/SignupScreen";
import SettingsScreen from "../screens/AppScreens/SettingsScreen";
import MyTab from "./AppTab";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Stack = createNativeStackNavigator();

export default function AppStack() {

    const isAuth = useSelector((state: RootState) => state.user.isAuth)

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {isAuth ? (
            <>
                <Stack.Screen name="HomeScreen" component={MyTab}/>
                <Stack.Screen name="Settings" component={SettingsScreen} />
            </>
            ): (
            <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
        )}
        </Stack.Navigator>
    )
}