import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';
import { ReuseTheme } from '../types/types';


const ReviewTypes = ({ data, name }: any) => {
  const navigation = useNavigation<any>();
  const { reuseTheme } = useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);
  const styles = reviewStyles(reuseTheme);

  return (
    <View style={[styles.containerStyle, generalstyles.flexStyles]}>
      {data.map(
        (
          detail: {
            name: string,
            screen: any;
          },
          index: number,
          array: string | any[],
        ) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabStyle,
              generalstyles.centerContent,
              {
                backgroundColor:
                  name === detail.name
                    ? reuseTheme.colors.preference.primaryForeground
                    : reuseTheme.colors.preference.primaryBackground,
                marginLeft: index === 0 ? -5 : 10,
                marginRight: index === array.length - 1 ? -5 : 0,
                paddingHorizontal: index === array.length - 1 ? 5 : 0,
              },
            ]}
            onPress={() => navigation.navigate(detail.screen)}
          >
            <Text
              style={{
                color:
                  name === detail.name
                    ? reuseTheme.colors.preference.primaryBackground
                    : reuseTheme.colors.preference.primaryText,
                fontSize: 15,
                fontWeight: 'bold',
                paddingHorizontal: index === array.length - 1 ? 5 : 0,
              }}
            >
              {detail.name}
            </Text>
          </TouchableOpacity>
        ),
      )}
    </View>
  );
};

export default ReviewTypes;

const reviewStyles = (theme: ReuseTheme) => StyleSheet.create({
  containerStyle: {
    backgroundColor: theme.colors.preference.primaryBackground,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
    justifyContent: 'space-evenly',
  },
  tabStyle: {
    height: 40,
    width: 100,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
