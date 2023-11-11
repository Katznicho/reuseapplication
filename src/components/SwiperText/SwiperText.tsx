import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';



const SwiperText = ({ headerText, smallText , smallerText  , heaserTextStyles={}}: any) => {
    const  {reuseTheme} =  useUserPreferredTheme();
    const generalStyles = dynamicGeneralStyles(reuseTheme);
    return (
        <><View
            style={[
                { marginHorizontal: 10, marginTop: 40 },
                generalStyles.centerContent,
            ]}
        >
            <Text
                style={[{
                    color: reuseTheme.colors.preference.primaryText,
                    fontSize: 30,
                    fontWeight: 'bold',
                },
                heaserTextStyles
            ]}
            >
                 {headerText}
            </Text>
        </View><View
            style={[
                { marginHorizontal: 10, marginVertical: 10 },
                generalStyles.centerContent,
            ]}
        >
                <Text
                    style={{
                        color: reuseTheme.colors.preference.secondaryText,
                        fontSize: 15,
                        width: 300,
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                    }}
                >
                     {smallText}
                </Text>
                <Text
                    style={[
                        {
                            color: reuseTheme.colors.preference.secondaryText,
                            fontSize: 15,
                            width: 180,
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        },
                        generalStyles.centerContent,
                    ]}
                > {smallerText}
                </Text>
            </View></>
    )
}

export default SwiperText

