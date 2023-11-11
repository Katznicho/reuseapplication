
import React from 'react'
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/login/Login';
import SignupScreen from '../screens/auth/SignupScreen/SignupScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen/ResetPasswordScreen';
import CommunitySignUp from '../screens/auth/community/CommunitySignUp';

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator 
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,  
      }}
      initialRouteName="Login">
      
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        options={{ headerShown: false }}
        component={SignupScreen}
      />
      <AuthStack.Screen
        name="CommunityRegister"
        component={CommunitySignUp}
      />
      <AuthStack.Screen
                options={{ headerShown: false }}
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
    </AuthStack.Navigator>
  )
}



export default AuthStackNavigator
