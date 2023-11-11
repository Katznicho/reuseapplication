
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { View, Text } from 'react-native';
import Recent from './Recent';


const Stack = createNativeStackNavigator();

/**
 * Generates the function comment for the given function body.
 *
 * @return {JSX.Element} The JSX element representing the NotificationStack component.
 */


const MyNotificationStack = (): JSX.Element => {
  const { reuseTheme } = useUserPreferredTheme();


  return (
    <Stack.Navigator
      initialRouteName="Recent"
    >

      <Stack.Screen
        name="Recent"
        component={Recent}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: reuseTheme.colors.preference.primaryBackground,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: 'center',
          headerTintColor: reuseTheme.colors.preference.primaryText,
        }}

      />

      <Stack.Screen
        name="Events"
        component={Recent}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: reuseTheme.colors.preference.primaryBackground,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: 'center',
          headerTintColor: reuseTheme.colors.preference.primaryText,
        }}

      />

      <Stack.Screen
        name="All"
        component={Recent}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: reuseTheme.colors.preference.primaryBackground,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: 'center',
          headerTintColor: reuseTheme.colors.preference.primaryText,
        }}

      />
    </Stack.Navigator>
  );
};

export default MyNotificationStack;
