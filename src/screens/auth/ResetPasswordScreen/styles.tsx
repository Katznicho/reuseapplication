import { I18nManager, StyleSheet, Platform } from 'react-native';
import { ReuseTheme } from '../../../types/types';

const dynamicStyles = (theme:ReuseTheme) => {
  
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.preference.primaryBackground,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.colors.preference.primaryForeground,
      marginTop: 25,
      marginBottom: 50,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 35,
    },
    sendContainer: {
      width: '70%',
      backgroundColor: theme.colors.preference.primaryForeground,
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
      alignItems: 'center',
    },
    sendText: {
      color: '#ffffff',
    },
    InputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: theme.colors.preference.grey3,
      backgroundColor: theme.colors.preference.primaryBackground,
      paddingLeft: 10,
      color: theme.colors.preference.primaryText,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 25,
    },
    backArrowStyle: {
      resizeMode: 'contain',
      tintColor: theme.colors.preference.primaryForeground,
      width: 25,
      height: 25,
      marginTop: Platform.OS === 'ios' ? 50 : 20,
      marginLeft: 10,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  })
}

export default dynamicStyles
