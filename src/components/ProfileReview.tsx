import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Box from './Box';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';
import People from './People';
import Comment from './Comment';
import { ReuseTheme } from '../types/types';



const ProfileReview = () => {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = profileStyles(reuseTheme);

  return (
    <View style={{ marginHorizontal: 15, marginVertical: 20 }}>
      <View
        style={[
          generalstyles.flexStyles,
          { justifyContent: 'space-between', alignItems: 'center' },
        ]}
      >
        <View>
          <Text style={[styles.reviewText]}>Reviews</Text>
        </View>
        <Box rating={4.6} />
      </View>
      {/* review comments */}
      <People />
      {/* review comments */}

      {/* card section */}
      <Comment
        imageURL={
          'https://media.istockphoto.com/id/1141568835/photo/adult-woman-training-legs-doing-inverted-lunges-exercise.jpg?b=1&s=170667a&w=0&k=20&c=dlcDnCKz73i_QgEUtgaZCpJyZUiHdKOOzlqYPPCSsyg='
        }
        time={'2 days ago'}
        comment={
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi sequi nihil cupiditate praesentium temporibus, porro odit pariatur? Id provident doloremque maxime ea sit quos ex, quisquam '
        }
        rating={4.6}
      />
      {/* card section */}
    </View>
  );
};

export default ProfileReview;

const profileStyles = (theme:ReuseTheme)=> StyleSheet.create({
  reviewText: {
    color: theme.colors.preference.primaryText,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
