import React from "react"
import { View } from "react-native";
import Octicons from "react-native-vector-icons/Octicons"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useUserPreferredTheme } from "../hooks/useUserPreferredTheme";




interface VerificationInterface{
    isVerified:null|boolean|undefined,
    size:number,
    style:any
}
const Verification = ({ isVerified, style, size }: VerificationInterface) => {
    const {reuseTheme} =  useUserPreferredTheme();
    

    return isVerified ?
        <View style={style}>
            <MaterialIcons name={'verified'}
                size={size}
                color={reuseTheme.colors.preference.primaryText}
            />
        </View>

        :
        <View style={style}>
            <Octicons name={'unverified'}
                size={size}
                color={reuseTheme.colors.preference.primaryText}
            />

        </View>

}

export default Verification


