import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';
import { ReuseTheme } from '../types/types';




const NotificationCard = ({
  // id,
  type,
  time,
  description,
}: any) => {

  const { reuseTheme } = useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);

  const styles = notificationStyles(reuseTheme);

  return (
    <View style={[generalstyles.flexStyles, styles.containerStyles]}>
      <View>
        <View>
          <Text style={[styles.textColor, { fontWeight: 'bold' }]}>{type}</Text>
        </View>
        <View style={[generalstyles.resideViews, styles.textStyles]}>
          <Text>{description}</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.textColor]}> {time}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;

const notificationStyles = (theme: ReuseTheme) => StyleSheet.create({
  containerStyles: {
    justifyContent: 'space-between',
    // alignItems:"center" ,
    marginHorizontal: 10,
    borderBottomColor: theme.colors.preference.grey3,
    borderWidth: 1,
    borderTopColor: theme.colors.preference.grey3,
    paddingVertical: 10,
  },
  textColor: {
    color: theme.colors.preference.primaryText,
  },
  textStyles: {
    width: '80%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
