import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Avatar, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Box from './Box';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';
import { ReuseTheme } from '../types/types';
import { DEFAULT_USER_PROFILE } from '../utils/constants/constants';

const DonaterCard = ({ item, showAvailable }: any) => {

    const navigation = useNavigation<any>();
    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = donatorStyles(reuseTheme);

    return (
        <TouchableOpacity
            style={[generalstyles.flexStyles, styles.containerStyles]}
            onPress={() =>
                navigation.navigate('DonaterDetails', { item })
            }
        >
            <View>
                <Avatar.Image
                    size={60}
                    source={{
                        uri: item?.photoURL || DEFAULT_USER_PROFILE,
                    }}
                    style={styles.avatarStyles}
                />
            </View>
            <View>
                <View
                    style={[
                        generalstyles.centerContent,
                        { marginTop: 10 },
                        generalstyles.flexStyles,
                    ]}
                >
                    <Text style={{ color: reuseTheme.colors.preference.primaryText, fontSize: 15 }}>
                        {`${item.firstName} ${item.lastName}`}
                    </Text>
                    <Box rating={4.5} />
                </View>
                <View>
                    <Text
                        style={{
                            color: reuseTheme.colors.preference.primaryText,
                            fontSize: 12,
                            fontWeight: 'bold',
                        }}
                    >
                        {item?.userType}
                    </Text>
                </View>
                <View>
                    <Text
                        style={{
                            color: reuseTheme.colors.preference.primaryForeground,
                            fontSize: 12,
                            fontWeight: 'bold',
                        }}
                    >
                        {item.experience}
                    </Text>
                </View>
            </View>
            <View>
                <IconButton
                    icon="chevron-right"
                    iconColor={reuseTheme.colors.preference.primaryText}
                    size={28}
                />
            </View>
        </TouchableOpacity>
    );
};

export default DonaterCard;

const donatorStyles = (theme: ReuseTheme) => StyleSheet.create({
    containerStyles: {
        alignItems: 'center',
        backgroundColor: theme.colors.preference.secondaryBackground,
        marginVertical: 10,
        marginHorizontal: 30,
        height: 100,
        borderRadius: 15,
        justifyContent: 'space-between',
        width: '85%',
    },
    avatarStyles: {
        backgroundColor: theme.colors.preference.primaryBackground,
        justifyContent: 'center',
        marginLeft: 10,
    },
});
