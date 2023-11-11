import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';
import { ReuseTheme } from '../types/types';

const ScrollCardDetails = ({
    item,
    scrollCardStyles
}: any) => {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = cardStyles(reuseTheme);

    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity style={[scrollCardStyles]}
            onPress={() =>
                navigation.navigate('ProductDetails', {
                    item,
                    screen: item.screen,
                })
            }
        >
            {/* image */}
            <Image
                style={{
                    height: 150,
                    width: 150,
                    resizeMode: "cover",
                    borderRadius: 20
                }}
                source={{ uri: item?.coverImage }}
            />
            {/* image */}
            {/* names */}
            <View style={styles.packageViewStyles}>
                <View style={[generalstyles.flexStyles, generalstyles.centerContent]}>

                    <Text style={styles.nameStyles}>{item?.title}</Text>
                </View>
            </View>
            {/* names */}

            {/* rating */}
            <View style={[generalstyles.centerContent, generalstyles.flexStyles]}>
                {
                    Array(4).fill(4)?.map((item, index) => (
                        <AntDesign
                           key={index}
                            name="star"
                            color={reuseTheme.colors.preference.primaryText}
                            size={15}
                            
                        />
                    ))
                }
            </View>
            {/* rating */}
        </TouchableOpacity>
    );
};

export default ScrollCardDetails;

const cardStyles  =  (theme:ReuseTheme) => StyleSheet.create({
    packageViewStyles: {
        marginHorizontal: 10,
    },
    nameStyles: {
        color: theme.colors.preference.primaryText,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 4,
    },

    sessionStyles: {
        color:theme.colors.preference.primaryText ,
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    description: {
        color: theme.colors.preference.primaryText,
        fontSize: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});


