import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import BaseNavigation from './navigators/BaseNavigation/BaseNavigation';
import AuthStackNavigator from './navigators/AuthStack';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store/dev';
import { useFirebase } from './hooks/useFirebase';

const AppContent = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.user);

    const { getCurrentUser } = useFirebase();

    // useEffect to get the current logged-in user on component mount
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                await getCurrentUser();

            } catch (error) {
                // Handle any errors that might occur during the process
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
    }, [isLoggedIn])


    return (
        <>
            <StatusBar />
            <NavigationContainer>
                {
                    isLoggedIn ? <BaseNavigation /> : <AuthStackNavigator />
                }

            </NavigationContainer>

        </>


    )
}

export default AppContent
