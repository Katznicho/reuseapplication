import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import Completed from './Completed';
import Pending from './Pending';
import Failed from './Failed';



const Tab = createMaterialTopTabNavigator();
const PaymentTabs = () => {

    const { reuseTheme } = useUserPreferredTheme();

    return (
        <Tab.Navigator
            initialRouteName="My Payments"
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
                    // paddingHorizontal: 20,
                },
                tabBarAndroidRipple: { borderless: true },
                tabBarActiveTintColor: reuseTheme.colors.preference.primaryText,
                tabBarInactiveTintColor: reuseTheme.colors.preference.primaryText,

                tabBarIndicatorStyle: {
                    backgroundColor: reuseTheme.colors.preference.primaryForeground,
                    height: 4,
                    marginHorizontal: 25,
                },
                tabBarPressColor: reuseTheme.colors.preference.primaryBackground,
                tabBarScrollEnabled: true,
                tabBarShowIcon: true,
                tabBarShowLabel: true,
            }}
        >

            <Tab.Screen
                name="Completed"
                component={Completed}
                options={{
                    tabBarLabel: 'Completed',
                    tabBarAccessibilityLabel: 'Completed',
                    //add some styling here
                }}
            />

            <Tab.Screen
                name="Pending"
                component={Pending}
                options={{
                    tabBarLabel: 'Pending',
                    tabBarAccessibilityLabel: 'Pending',
                    //add some styling here
                }}
            />
            <Tab.Screen
                name="Failed"
                component={Failed}
                options={{
                    tabBarLabel: 'Failed',
                    tabBarAccessibilityLabel: 'Failed',
                    //add some styling here
                }}
            />

        </Tab.Navigator>
    );
};

export default PaymentTabs;
