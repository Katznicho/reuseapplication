import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CreateDonationProduct from './CreateDonationProduct';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import MyProducts from './MyProducts';

const Tab = createMaterialTopTabNavigator();
const ProductTabs = () => {

    const { reuseTheme } = useUserPreferredTheme();

  return (
    <Tab.Navigator
      initialRouteName="CreateProducts"
      backBehavior="order"
      sceneContainerStyle={{
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
        flex: 1,
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: reuseTheme.colors.preference.primaryBackground,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
          borderBottomWidth: 0, // Remove the bottom border
          borderTopWidth: 0,
          borderColor: reuseTheme.colors.preference.primaryBackground,
          paddingHorizontal: 40,
        },
        tabBarAndroidRipple: { borderless: true },
        tabBarActiveTintColor: reuseTheme.colors.preference.primaryText,
        tabBarInactiveTintColor: reuseTheme.colors.preference.primaryText,

        tabBarIndicatorStyle: {
          backgroundColor: reuseTheme.colors.preference.primaryForeground,
          height: 4,
          marginHorizontal: 35,
        },
        tabBarPressColor: reuseTheme.colors.preference.primaryBackground,
        tabBarScrollEnabled: true,
        tabBarShowIcon: true,
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="CreateProducts"
        component={CreateDonationProduct}
        options={{
          tabBarLabel: 'Create',
        }}
      />
      <Tab.Screen
        name="MyProducts"
        component={MyProducts}
        options={{
          tabBarLabel: 'MY PRODUCTS',
          tabBarAccessibilityLabel: 'MY PRODUCTS',
          //add some styling here
        }}
      />
    </Tab.Navigator>
  );
};

export default ProductTabs;
