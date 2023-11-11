import { StyleSheet } from "react-native";
import { ReuseTheme } from "../../types/types";

export const drawerContentStyles  = (theme:ReuseTheme)=> {
     return StyleSheet.create({
        draweContent: {
            flex: 1,
        },
        userInfoSection: {
            paddingLeft: 0,
            marginLeft: -14,
        },
        title: {
            fontSize: 18,
            marginTop: 3,
            fontWeight: 'bold',
            marginLeft: -20,
            color:theme.colors.preference.primaryText
        },
        caption: {
            fontSize: 14,
            lineHeight: 14,
            marginLeft: -20,
            color:theme.colors.preference.primaryText
        },
    
        section: {
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 15,
        },
        paragraph: {
            fontWeight: 'bold',
        },
        drawerSection: {
            marginTop: 15,
        },
        bottomDrawerSection: {
            marginBottom: 15,
            borderTopColor: '#f4f4f4',
            borderTopWidth: 1,
        },
        preference: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 16,
        },
    });
}