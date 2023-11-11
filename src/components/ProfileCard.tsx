import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ReuseTheme } from '../types/types';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';


const ProfileCard = () => {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = profileCardStyles(reuseTheme);
    
  return (
    <View style={[generalstyles.flexStyles, styles.container]}>
      <View style={[styles.experience, generalstyles.centerContent]}>
        <Text style={[styles.numberStyles]}>200</Text>
        <Text style={styles.textStyles}>Donations</Text>
      </View>
      <View style={[styles.completed, generalstyles.centerContent]}>
        <Text style={[styles.numberStyles]}>1k</Text>
        <Text style={styles.textStyles}>Followers</Text>
      </View>
      <View style={[styles.activeClients, generalstyles.centerContent]}>
        <Text style={[styles.numberStyles]}>800</Text>
        <Text style={[styles.textStyles]}> Following</Text>
      </View>
    </View>
  );
};

export default ProfileCard;

const profileCardStyles = (theme:ReuseTheme)=> StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 20,
     backgroundColor: theme.colors.preference.primaryBackground,
     height: 100,
     alignItems: 'center',
      // justifyContent: "center",
    borderRadius: 10,
    elevation:5,
    width:"50%"
  },
  experience: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRightWidth: 1,
    borderRightColor: theme.colors.preference.grey3,
    paddingRight: 20,
  },
  completed: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRightWidth: 1,
    borderRightColor: theme.colors.preference.grey3,
    paddingRight: 30,
  },
  activeClients: {
    marginRight: 10,
    marginVertical: 10,
  },
  numberStyles: {
    color: theme.colors.preference.primaryText,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textStyles: {
    color: theme.colors.preference.primaryText,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
