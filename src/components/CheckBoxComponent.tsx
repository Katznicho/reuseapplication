import { Text, View } from 'react-native';
import React from 'react';
import { Checkbox } from 'react-native-paper';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';


const CheckBoxComponent = ({ checked, setChecked, text }: any) => {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);

  return (
    <View
      style={[
        generalstyles.flexStyles,
        { alignItems: 'center', marginHorizontal: 20 },
      ]}
    >
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
        color={reuseTheme.colors.preference.primaryForeground}
        uncheckedColor={reuseTheme.colors.preference.primaryText}
      />
      <View>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default CheckBoxComponent;
