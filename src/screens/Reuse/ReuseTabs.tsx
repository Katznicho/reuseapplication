import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import MyProducts from './MyProducts';
import Accepted from './Accepted';
import Pending from './Pending';
import Rejected from './Reject';


const Tab = createMaterialTopTabNavigator();
const ReuseTabs = () => {

    const { reuseTheme } = useUserPreferredTheme();

    return (
        <Tab.Navigator
            initialRouteName="MyProducts"
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
                name="MyProducts"
                component={MyProducts}
                options={{
                    tabBarLabel: 'All',
                    tabBarAccessibilityLabel: 'MY PRODUCTS',
                    //add some styling here
                }}
            />

            <Tab.Screen
                name="Accepted"
                component={Accepted}
                options={{
                    tabBarLabel: 'Accepted',
                    tabBarAccessibilityLabel: 'Accepted',
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
                name="Rejected"
                component={Rejected}
                options={{
                    tabBarLabel: "Rejected",
                    tabBarAccessibilityLabel: 'Rejected',
                    //add some styling here
                }}
            />
        </Tab.Navigator>
    );
};

export default ReuseTabs;
