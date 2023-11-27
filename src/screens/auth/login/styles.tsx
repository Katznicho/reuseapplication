import { I18nManager, StyleSheet, Platform } from 'react-native';
import { ReuseTheme } from '../../../types/types';





const dynamicStyles = (theme: ReuseTheme) => {

  return StyleSheet.create({

    orTextStyle: {
      color: theme.colors.preference.primaryText,
      marginTop: 40,
      marginBottom: 10,
      alignSelf: 'center',
    },

    loginContainer: {
      width: '70%',
      backgroundColor: theme.colors.preference.primaryForeground,
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
      alignItems: 'center',
    },
    loginText: {
      color: '#ffffff',
    },
    placeholder: {
      color: 'red',
    },
    InputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: theme.colors.preference.grey3,
      backgroundColor: theme.colors.preference.primaryBackground,
      paddingLeft: 20,
      color: theme.colors.preference.primaryText,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 25,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    facebookContainer: {
      width: '70%',
      backgroundColor: '#4267B2',
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
      alignItems: 'center',
    },
    googleButtonStyle: {
      alignSelf: 'center',
      marginTop: 15,
      padding: 5,
      elevation: 0,
      backgroundColor: "white",
      borderRadius: 25,
    },
    appleButtonContainer: {
      width: '70%',
      height: 40,
      marginTop: 16,
      alignSelf: 'center',
    },
    facebookText: {
      color: '#ffffff',
      fontSize: 14,
      alignSelf: 'center',
    },
    phoneNumberContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    phoneNumber: {
      color: theme.colors.preference.primaryText,
    },
    forgotPasswordContainer: {
      width: '80%',
      alignSelf: 'center',
      alignItems: 'flex-end',
      marginTop: 8,
    },
    forgotPasswordText: {
      fontSize: 14,
      padding: 4,
      color: theme.colors.preference.primaryText,
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
