import { StyleSheet } from 'react-native';
import { ReuseTheme } from '../../types/types';


const styles = (theme:ReuseTheme)=> StyleSheet.create({
    outerContainer: {
      backgroundColor: theme.colors.preference.primaryBackground,
      // borderColor: theme.colors.preference.primaryForeground,
      borderWidth: 2,
      padding: 4,
    },
    innerContainerSelected: {
      backgroundColor: theme.colors.preference.primaryForeground,
      borderRadius: 12,
    },
    innerContainerUnselected: {
      backgroundColor: theme.colors.preference.grey3,
      borderRadius: 12,
    },
  })


export default styles
