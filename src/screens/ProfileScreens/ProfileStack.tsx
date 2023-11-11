import { } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import PrivatePolicy from './PrivatePolicy';
import AboutUs from './AboutUs';
import SettingsStack from './SettingsStack/SettingsStack';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  const navigation = useNavigation<any>();
  const { reuseTheme } = useUserPreferredTheme();

  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivatePolicy"
        component={PrivatePolicy}
        options={{
          title: 'Private Policy',
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
              onPress={() => navigation.navigate('ProfileScreen')}
              containerColor={reuseTheme.colors.preference.primaryForeground}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'About Us',
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
              onPress={() => navigation.navigate('ProfileScreen')}
              containerColor={reuseTheme.colors.preference.primaryForeground}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
