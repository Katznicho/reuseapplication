import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Box from './Box';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { ReuseTheme } from '../types/types';
import { useFirebase } from '../hooks/useFirebase';
import NotAvailable from './NotAvailable';

import { DEFAULT_USER_PROFILE } from '../utils/constants/constants';


// Define the Donator interface
interface Donator {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    totalfollowers: number;
}


const Donaters = () => {

    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = donatorStyles(reuseTheme);


    const [donaters, setDonaters] = useState<any[]>([]);

    const { getAllDonors } = useFirebase();
    useEffect(() => {

        getAllDonors()
            .then((usersData) => {
                // Update the state with the retrieved users data
                setDonaters(usersData);
            })
            .catch((error) => {
                console.error('Error retrieving users:', error);
            });
    }, []);


    const navigation = useNavigation<any>();


    return (
        <View >

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {donaters.length ? donaters.map(donator => (
                    <TouchableOpacity
                        style={[generalstyles.centerContent, styles.containerStyle]}
                        key={donator.id}
                        onPress={() =>
                            navigation.navigate('DonaterDetails', { item: donator })
                        }
                    >
                        <View>
                            <Avatar.Image
                                size={120}
                                source={{
                                    uri: donator?.photoURL || DEFAULT_USER_PROFILE,
                                }}
                            />
                            {/* details */}
                            <View
                                style={[
                                    generalstyles.centerContent,
                                    { marginTop: 10 },
                                    generalstyles.flexStyles,
                                ]}
                            >
                                <Text
                                    style={{
                                        color: reuseTheme.colors.preference.primaryText,
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {`${donator?.firstName} ${donator?.lastName}`}
                                </Text>

                            </View>
                            <View style={[generalstyles.centerContent]}>
                                <Box rating={donator?.totalfollowers} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )) :
                    <NotAvailable text={"No Donaters Currently Available"} />
                }
            </ScrollView>
        </View>
    );
};

export default Donaters;

export const donatorStyles = (theme: ReuseTheme) => StyleSheet.create({
    trainerTitle: {
        color: theme.colors.preference.primaryText,
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerStyle: {
        marginHorizontal: 5,
    },
});
