import {} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import UnitsOfMeasure from './UnitsOfMeasure';
import Notifications from './Notifications';
import Language from './Language';
import Settings from './Settings';

import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';

const Stack = createNativeStackNavigator();

const SettingsStack = () => {

  const {reuseTheme} =  useUserPreferredTheme();


  const navigation = useNavigation<any>();
  return (
    <Stack.Navigator initialRouteName="SettingsScreen">
      <Stack.Screen
        name="SettingsSCreen"
        component={Settings}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: reuseTheme.colors.preference.primaryBackground,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTintColor: reuseTheme.colors.preference.primaryText,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              iconColor={reuseTheme.colors.preference.primaryText}
              size={28}
              onPress={() => navigation.goBack()}
              containerColor={reuseTheme.colors.preference.primaryBackground}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Units"
        component={UnitsOfMeasure}
        options={{
          title: 'Units of Measure',
          headerStyle: {
            backgroundColor: reuseTheme.colors.preference.primaryBackground,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTintColor: reuseTheme.colors.preference.primaryText,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              iconColor={reuseTheme.colors.preference.primaryText}
              size={28}
              onPress={() => navigation.goBack()}
              containerColor={reuseTheme.colors.preference.primaryBackground}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SettingNotifications"
        component={Notifications}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: reuseTheme.colors.preference.primaryBackground,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTintColor: reuseTheme.colors.preference.primaryText,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              iconColor={reuseTheme.colors.preference.primaryText}
              size={28}
              onPress={() => navigation.goBack()}
              containerColor={reuseTheme.colors.preference.primaryBackground}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{
          title: 'Language',
          headerStyle: {
            backgroundColor: reuseTheme.colors.preference.primaryBackground,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTintColor: reuseTheme.colors.preference.primaryText,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              iconColor={reuseTheme.colors.preference.primaryText}
              size={28}
              onPress={() => navigation.goBack()}
              containerColor={reuseTheme.colors.preference.primaryBackground}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
