
import React, { useState } from 'react';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { API_KEY } from "@env";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;



const UserLocation = ({ onPress , placeholder }: any) => {
    const { reuseTheme } = useUserPreferredTheme();

    return (

        <GooglePlacesAutocomplete
            nearbyPlacesAPI="GooglePlacesSearch"
            //nearbyPlacesAPI={"GoogleReverseGeocoding"}
            renderDescription={(row) => row.description || row.place_id}
            placeholder={placeholder}
            //currentLocation={true}
            enableHighAccuracyLocation={true}
            autoFillOnNotFound={true}

            fetchDetails={true}
            debounce={400}
            onFail={(error) => {

            }}
            enablePoweredByContainer={false}

            minLength={2}

            styles={{
                container: {
                    flex: 1,
                     width: screenWidth-50,
                    
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
                    // width: "100%",
                    maxWidth:"auto",
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

           onPress={onPress}
            query={{
                key: API_KEY,
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


