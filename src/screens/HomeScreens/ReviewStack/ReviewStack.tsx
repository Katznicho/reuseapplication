import {} from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Critical from './Critical';
import Recent from './Recent';
import Favourable from './Favourable';

const Stack = createNativeStackNavigator();

const ReviewStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='="Recent'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Recent" component={Recent} />
      <Stack.Screen name="Critical" component={Critical} />
      <Stack.Screen name="Favourable" component={Favourable} />
    </Stack.Navigator>
  );
};

export default ReviewStack;
