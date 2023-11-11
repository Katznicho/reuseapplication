import { Dimensions, I18nManager, StyleSheet, Platform } from 'react-native'
import { ReuseTheme } from '../../../types/types'

const { height } = Dimensions.get('window')
const imageSize = height * 0.232
const photoIconSize = imageSize * 0.27

const dynamicStyles = (theme:ReuseTheme) => {
  
  return StyleSheet.create({
    


    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: 'center',
      fontSize: 20,
      color: theme.colors.preference.primaryForeground,
    },
    loginContainer: {
      width: '65%',
      backgroundColor: theme.colors.preference.primaryForeground,
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
    },
    loginText: {
      color: theme.colors.preference.primaryBackground,
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

    signupContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      width: '65%',
      backgroundColor: theme.colors.preference.primaryForeground,
      borderRadius: 25,
      padding: 10,
      marginTop: 50,
    },
    signupText: {
      color: theme.colors.preference.primaryBackground,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageBlock: {
      flex: 2,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      borderRadius: imageSize,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      overflow: 'hidden',
    },
    formContainer: {
      width: '100%',
      flex: 4,
      alignItems: 'center',
    },
    photo: {
      marginTop: imageSize * 0.77,
      marginLeft: -imageSize * 0.29,
      width: photoIconSize,
      height: photoIconSize,
      borderRadius: photoIconSize,
    },

    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d9d9d9',
      opacity: 0.8,
      zIndex: 2,
    },
    orTextStyle: {
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'center',
      color: theme.colors.preference.primaryText,
    },
    PhoneNumberContainer: {
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
    },
    smsText: {
      color: '#4267b2',
    },
    tos: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
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
