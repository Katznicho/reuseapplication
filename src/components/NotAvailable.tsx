import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { ReuseTheme } from '../types/types';

const NotAvailable = ({text}:any) => {
    const {reuseTheme} =  useUserPreferredTheme();
    const styles = notAvailableStyles(reuseTheme);
  return (
    <View style={[styles.descriptionStyles]}>
    <Text style={{ color:reuseTheme.colors.preference.primaryText }}>
       {text}
    </Text>
  </View>
  )
}

export default NotAvailable

const notAvailableStyles =(theme:ReuseTheme)=> StyleSheet.create({
    descriptionStyles: {
        marginHorizontal: 10,
      },
})