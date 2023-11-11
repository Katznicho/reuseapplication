
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import CreateDonationProduct from '../../../screens/CreateScreens/CreateDonationProduct';





const Stack = createNativeStackNavigator();

function CreateStack() {

    const {reuseTheme} =  useUserPreferredTheme();

    const navigation = useNavigation<any>();

    return (

        <Stack.Navigator
          initialRouteName='CreateNew'
        >

            <Stack.Screen
                name="CreateNewDonation"
                component={CreateDonationProduct}
                options={{
                    title: 'Create New',
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

export default CreateStack