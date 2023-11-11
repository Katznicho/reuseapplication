import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { IconButton } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { ReuseTheme } from '../../types/types';

const textStyles = (theme:ReuseTheme)=>{
    return StyleSheet.create({
        textStyles: {
            color: theme.colors.preference.primaryText,
            fontWeight:"bold",
            fontSize:18
        },
        containerStyles:{
           marginHorizontal:10,
           marginVertical:10
        }
    })
}

const TextTypes = ({ text , screen}: any) => {
    const navigation =  useNavigation<any>();
    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = textStyles(reuseTheme);

    return (
        <View style={styles.containerStyles}>
            <View style={[generalstyles.flexStyles, {justifyContent:"space-between", alignItems:"center"}]}>
                <View>
                    <Text style={styles.textStyles}>{text}</Text>
                </View>
                <IconButton
                    icon="arrow-right"
                    iconColor={reuseTheme.colors.preference.primaryText}
                    size={30}
                    onPress={() => navigation.navigate(screen)}
                />
            </View>

        </View>
    )
}

export default TextTypes

