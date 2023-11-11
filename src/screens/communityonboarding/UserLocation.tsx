import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SwiperScreenProps } from './SwiperScreen';
import SwiperText from '../../components/SwiperText/SwiperText';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { APP_USERS } from '../../utils/constants/constants';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';



const UserLocation = ({ setUserProfile }: SwiperScreenProps) => {

    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            (pos) => {
                setPosition(JSON.stringify(pos));
            },
            (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
            { enableHighAccuracy: true, }
        );
    };

    const [, setPosition] = useState<string | null>(null);


    const { reuseTheme } = useUserPreferredTheme();


    //set profile details to the default value
    useEffect(() => {
        setUserProfile((prev: any) => {
            return { ...prev, reuserType: APP_USERS.DONOR }
        }
        )
        getCurrentPosition()

    }, [])



    return (

            <GooglePlacesAutocomplete
                nearbyPlacesAPI="GooglePlacesSearch"
                placeholder='Enter your location'
                //currentLocation={true}
                enableHighAccuracyLocation={true}
                autoFillOnNotFound={true}

                fetchDetails={true}
                debounce={400}
                onFail={(error) => {
                    console.log("================Error==================");
                    console.log(JSON.stringify(error))
                    console.log("================Error==================");
                }}
                enablePoweredByContainer={false}

                minLength={2}

                styles={{
                    container: {
                        flex: 1,
                        width: "90%",
                        backgroundColor: reuseTheme.colors.preference.primaryBackground,
                    },
                    textInputContainer: {
                        backgroundColor: reuseTheme.colors.preference.primaryBackground,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        marginHorizontal: 20,
                        borderRadius: 20,
                    },
                    textInput: {
                        color: reuseTheme.colors.preference.primaryText,
                        backgroundColor: reuseTheme.colors.preference.primaryBackground,
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: reuseTheme.colors.preference.grey3,
                        width: "100%",
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                    listView: {
                        backgroundColor: reuseTheme.colors.preference.primaryBackground,
                        borderRadius: 10,
                        marginHorizontal: 10,
                        marginTop: 10,
                        elevation: 5,
                        zIndex: 5,
                    },
                    row: {
                        backgroundColor: reuseTheme.colors.preference.primaryBackground,
                        padding: 13,
                        height: 50,
                        flexDirection: 'row',
                    },
                    separator: {
                        height: 0.5,
                        backgroundColor: reuseTheme.colors.preference.grey3,
                    },
                    description: {
                        color: reuseTheme.colors.preference.primaryText,
                    },
                    poweredContainer: {
                        backgroundColor: reuseTheme.colors.preference.primaryBackground,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderColor: reuseTheme.colors.preference.grey3,
                        borderTopWidth: 0.5,
                    },
                    powered: {
                        color: reuseTheme.colors.preference.primaryText,
                    },
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log("==================================");
                    console.log(data, details);
                    console.log("==================================");
                }}
                query={{
                    key: 'AIzaSyATT-OoxvppDdCRfNypfjLY5VWbZEqs_GA',
                    language: 'en',
                    components: 'country:ug'
                }}
                GooglePlacesDetailsQuery={{
                    fields: 'formatted_address',
                    language: 'en',
                    components: 'country:ug'
                }}
            />



    );
};

export default UserLocation;

const styles = StyleSheet.create({
    genderStyles: {
        width: 110,
        height: 110,
        padding: 10,
        borderRadius: 100,
        marginVertical: 15,
    },
    genderNameStyles: {
        marginTop: 0,
    }
});
