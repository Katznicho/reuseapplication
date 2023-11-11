import {  View, ScrollView } from 'react-native';
import React from 'react';
import ScrollCardDetails from './ScrollCardDetails';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';




const ScrollCard = ({cardProducts}:any) => {
    const {reuseTheme} =  useUserPreferredTheme();

  return (
    <View >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        {cardProducts?.map((item: any, index: any) => {
          return (
            <ScrollCardDetails
              key={index}
              item={item}
              scrollCardStyles={{
                backgroundColor: reuseTheme.colors.preference.primaryBackground,
                marginHorizontal: 5,
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ScrollCard;


