
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import SupportScreen from '../../../screens/SupportScreen/SupportScreen';




const Stack = createNativeStackNavigator();

/**
 * Render and return the SupportStack component.
 *
 * @return {ReactNode} The rendered SupportStack component.
 */
function SupportStack() {

    const { reuseTheme } = useUserPreferredTheme();

    const navigation = useNavigation<any>();

    return (

        <Stack.Navigator
            initialRouteName='SupportPage'
        >

            <Stack.Screen
                name="SupportPage"
                component={SupportScreen}
                options={{
                    title: 'Support Page',
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


        </Stack.Navigator>

    );
}

export default SupportStack