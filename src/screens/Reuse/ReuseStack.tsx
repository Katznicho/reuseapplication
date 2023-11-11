
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ReuseTabs from './ReuseTabs';
import MyProductDetails from './MyProductDetails';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import PaymentSummary from './PaymentSummary';




const Stack = createNativeStackNavigator();

/**
 * Render and return the SupportStack component.
 *
 * @return {ReactNode} The rendered SupportStack component.
 */
function ReuseStack() {

    const { reuseTheme } = useUserPreferredTheme();

    const navigation = useNavigation<any>();

    return (

        <Stack.Navigator
            initialRouteName='ReuseTabs'
        >

            <Stack.Screen
                name="ReuseTabs"
                component={ReuseTabs}
                options={{
                    title: 'My Products',
                    headerStyle: {
                        backgroundColor: reuseTheme.colors.preference.primaryBackground,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                    },
                    headerTintColor: reuseTheme.colors.preference.primaryText,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <IconButton
                            icon="chevron-left"
                            iconColor={reuseTheme.colors.preference.primaryText}
                            size={28}
                            onPress={() => navigation.goBack()}
                            containerColor={reuseTheme.colors.preference.primaryForeground}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="MyProductDetails"
                component={MyProductDetails}
                options={{
                    title: 'Product Details',
                    headerStyle: {
                        backgroundColor: reuseTheme.colors.preference.primaryBackground,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                    },
                    headerTintColor: reuseTheme.colors.preference.primaryText,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <IconButton
                            icon="chevron-left"
                            iconColor={reuseTheme.colors.preference.primaryText}
                            size={28}
                            onPress={() => navigation.navigate('ReuseTabs')}
                            containerColor={reuseTheme.colors.preference.primaryForeground}
                        />
                    ),
                }}
            />

            <Stack.Screen
                name="PaymentSummary"
                component={PaymentSummary}
                options={{
                    title: 'Payment Summary',
                    headerStyle: {
                        backgroundColor: reuseTheme.colors.preference.primaryBackground,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                    },
                    headerTintColor: reuseTheme.colors.preference.primaryText,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <IconButton
                            icon="chevron-left"
                            iconColor={reuseTheme.colors.preference.primaryText}
                            size={28}
                            onPress={() => navigation.navigate('ReuseTabs')}
                            containerColor={reuseTheme.colors.preference.primaryForeground}
                        />
                    ),
                }}
            />


        </Stack.Navigator>

    );
}

export default ReuseStack