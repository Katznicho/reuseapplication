import { Text, View } from 'react-native';
import React from 'react';
import { ProgressBar } from 'react-native-paper';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';

const RatingDetails = () => {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    
  return (
    <View
      style={[
        generalstyles.flexStyles,
        { alignItems: 'center', justifyContent: 'space-evenly' },
      ]}
    >
      <View style={{ marginHorizontal: 20, marginTop: -35 }}>
        <Text
          style={{
            fontSize: 90,
            fontWeight: 'bold',
            color: reuseTheme.colors.preference.primaryText,
          }}
        >
          4.6
        </Text>
      </View>
      <View>
        <View>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <View
                style={[generalstyles.flexStyles, generalstyles.centerContent]}
              >
                <Text style={{ color: reuseTheme.colors.preference.primaryText, marginRight: 10 }}>
                  {index + 1}
                </Text>
                <ProgressBar
                  progress={Math.random()}
                  color={reuseTheme.colors.preference.primaryText}
                  style={{
                    width: 120,
                    borderRadius: 10,
                    backgroundColor: reuseTheme.colors.preference.grey6,
                  }}
                />
              </View>
            ))}
        </View>
        {/* total number of ratins */}
        <View style={[generalstyles.centerContent, { marginRight: -30 }]}>
          <Text style={{ color: reuseTheme.colors.preference.primaryText, fontSize: 20 }}>
            174 ratings
          </Text>
        </View>
        {/* total number of ratings */}
      </View>
    </View>
  );
};

export default RatingDetails;
