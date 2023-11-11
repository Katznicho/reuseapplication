import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { IconButton, Switch } from 'react-native-paper';
import { ReuseTheme } from '../types/types';
import { useDispatch } from 'react-redux';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';
import CheckBoxComponent from './CheckBoxComponent';

const ProfileDetailsCard = ({
    details,
    showSwitch,
    onSetNotification,
    showCheckBox,
    setShowModal
}: any) => {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = profileCardStyles(reuseTheme);

    const navigation = useNavigation<any>();
    const dispatch = useDispatch<any>();

    const handleSignOut = async () => {
        try {


            // Handle any additional actions after the user is signed out

        } catch (error) {
            // Handle any errors that may occur during the signout process
        }
    };









    const onSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },

                {
                    text: 'OK',
                    onPress: () => handleSignOut(),
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {showSwitch ? (
                <View>
                    {details.map((item: any, index: any) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate(item.screen)}
                            style={[generalstyles.flexStyles, styles.containerStyle]}
                        >
                            <View style={{ paddingVertical: 20 }}>
                                <Text style={styles.textStyle}>{item.name}</Text>
                            </View>
                            <View>
                                {showCheckBox ? (
                                    <CheckBoxComponent
                                        status={item.value ? 'checked' : 'unchecked'}
                                        onPress={() => onSetNotification(item.id)}
                                        color={reuseTheme.colors.preference.primaryForeground}
                                        uncheckedColor={reuseTheme.colors.preference.primaryText}
                                    />
                                ) : (
                                    <Switch
                                        value={item.value}
                                        onValueChange={() => onSetNotification(item.id)}
                                        color={reuseTheme.colors.preference.primaryForeground}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <View>
                    {details.map((item: any, index: any) => {
                        return item.name === 'Sign Out' ?
                            (
                                <TouchableOpacity
                                    style={[generalstyles.flexStyles, styles.containerStyle]}
                                    key={index}
                                    onPress={onSignOut}
                                >
                                    <View style={{ paddingVertical: 20 }}>
                                        <Text style={[styles.textStyle, { color: reuseTheme.colors.preference.red }]}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (item.name == "Sign In" ? (<TouchableOpacity
                                style={[generalstyles.flexStyles, styles.containerStyle]}
                                key={index}
                                onPress={() => setShowModal(true)}
                            >
                                <View style={{ paddingVertical: 20 }}>
                                    <Text style={[styles.textStyle, { color: reuseTheme.colors.preference.primaryForeground }]}>
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>) :
                                (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => navigation.navigate(item.screen)}
                                        style={[generalstyles.flexStyles, styles.containerStyle]}
                                    >
                                        <View style={{ paddingVertical: 20 }}>
                                            <Text style={styles.textStyle}>{item.name}</Text>
                                        </View>
                                        <View>
                                            <IconButton
                                                icon="chevron-right"
                                                iconColor={reuseTheme.colors.preference.primaryText}
                                                size={25}
                                                onPress={() => navigation.goBack()}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ));
                    })}
                </View>
            )}
        </ScrollView>
    );
};

export default ProfileDetailsCard;

const profileCardStyles = (theme: ReuseTheme) => StyleSheet.create({
    containerStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        borderBottomColor: theme.colors.preference.grey3,
        borderWidth: 0.5,
    },
    textStyle: {
        fontWeight: 'bold',
        color: theme.colors.preference.primaryText,
        fontSize: 18,
    },
});
