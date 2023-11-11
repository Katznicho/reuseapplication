import { SafeAreaView, ScrollView, View } from 'react-native';
import React from 'react';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import TextComponent from '../../components/TextComponent';
import { SUPPORT_US } from '../../utils/constants/constants';
import { Button } from 'react-native-paper';
import call from 'react-native-phone-call'




const SupportScreen = () => {
    const { reuseTheme } = useUserPreferredTheme();

    const onMakeCall = () => {

        const args = {
            number: '2569983853', // String value with the number to call
            prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
            skipCanOpen: true // Skip the canOpenURL check
        }
        call(args).catch(console.error);


    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TextComponent text={SUPPORT_US} />

                {/* call immediately */}
                <View style={{ margin: 20 }}>
                    <Button
                        mode="contained"
                        buttonColor={reuseTheme.colors.preference.primaryForeground}
                        textColor={reuseTheme.colors.preference.primaryText}
                        onPress={onMakeCall}
                    >
                        Call immediately
                    </Button>
                </View>
                {/* call immediately */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SupportScreen;
