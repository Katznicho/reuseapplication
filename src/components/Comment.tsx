import { Text, View } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import Box from './Box';
import { commentInterface } from '../types/types';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';


const Comment = ({ imageURL, time, rating, comment }: commentInterface) => {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    

  return (
    <View
      style={[{ backgroundColor: reuseTheme.colors.preference.primaryBackground, borderRadius: 20 }]}
    >
      <View
        style={[
          generalstyles.flexStyles,
          {
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 10,
          },
        ]}
      >
        <View
          style={[
            generalstyles.flexStyles,
            { alignItems: 'center', justifyContent: 'space-between' },
          ]}
        >
          <Avatar.Image source={{ uri: imageURL }} size={40} />
          <Text
            style={{ color:reuseTheme.colors.preference.primaryText, fontSize: 20, marginLeft: 10 }}
          >
            John Doe
          </Text>
        </View>
        <View>
          <Box rating={rating} />
        </View>
        <View>
          <Text>{time}</Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text
          style={{
            width: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginVertical: 10,
            color: reuseTheme.colors.preference.primaryText,
          }}
        >
          {comment}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
