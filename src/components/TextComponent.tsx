import { Text, View } from 'react-native';
import React from 'react';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';


const TextComponent = ({text}:any) => {

    const {reuseTheme} =  useUserPreferredTheme();

  return (
    <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
      <Text style={{ color: reuseTheme.colors.preference.primaryText, fontSize: 16 }}>
        {text}
      </Text>
    </View>
  );
};

export default TextComponent;
