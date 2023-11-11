import { StyleSheet } from "react-native";
import { ReuseTheme } from "../../types/types";



export const  dynamicBaseStyles = (theme:ReuseTheme)=>{
    return  StyleSheet.create({
        nextStyles: {
          width: 140,
          height: 50,
          borderRadius: 25,
          backgroundColor: theme.colors.preference.primaryForeground,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
          paddingHorizontal: 10,
        },
        textStyles: {
          color: theme.colors.preference.primaryText,
          fontSize: 20,
        },
        backStyles: {
          backgroundColor: theme.colors.preference.transparent,
          borderRadius: 25,
          padding: 10,
          width: 50,
          height: 50,
        },
        maintext: {
          fontSize: 20,
          color: theme.colors.preference.grey6,
          margin: 5
        },
        detailstext: {
          fontSize: 20,
          color: theme.colors.preference.primaryText,
          margin: 5
        },
        viewStyles: {
          marginHorizontal: 0
        }
      });
}