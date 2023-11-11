import { Text, View } from 'react-native';
import React from 'react';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';


interface boxInterface {
  rating: number;
}
const Box = ({ rating }: boxInterface) => {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);

  return (
    <View
      style={[
        {
          backgroundColor: reuseTheme.colors.preference.primaryForeground,
          marginHorizontal: 10,
          width: 40,
          height: 20,
          borderRadius: 4,
        },
        generalstyles.centerContent,
      ]}
    >
      <Text style={{ color:reuseTheme.colors.preference.primaryText, fontWeight: 'bold' }}>
        {rating}
      </Text>
    </View>
  );
};

export default Box;
