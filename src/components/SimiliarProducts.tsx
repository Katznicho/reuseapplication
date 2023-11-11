import { Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';

const SimiliarProducts = () => {

  const navigation = useNavigation<any>();

  const {reuseTheme} =  useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);

  return (
    <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
      <TouchableOpacity
        style={[
          generalstyles.flexStyles,
          {
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: reuseTheme.colors.preference.primaryBackground,

            borderRadius: 10,
          },
        ]}
        onPress={() => navigation.navigate('PartnerGyms')}
      >
        <View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZnVybml0dXJlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
            }}
            style={{
              width: 100,
              height: 80,
              borderRadius: 10,
            }}
          />
        </View>

        {/* details */}
        <View style={{ marginTop: -30 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: reuseTheme.colors.preference.primaryText,
            }}
          >
            Related Products
          </Text>
        </View>
        {/* details */}

        {/* arraow down */}
        <View>
          <IconButton
            icon="chevron-down"
            iconColor={reuseTheme.colors.preference.primaryText}
            size={28}
          />
        </View>

        {/* arrow down */}
      </TouchableOpacity>
    </View>
  );
};

export default SimiliarProducts;
