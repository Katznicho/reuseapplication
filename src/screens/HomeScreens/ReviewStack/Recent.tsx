import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TabInterface, commentInterface } from '../../../types/types';
import ReviewTypes from '../../../components/ReviewTypes';
import RatingDetails from '../../../components/RatingDetails';
import Comment from '../../../components/Comment';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../../utils/generalstyles/dynamicGeneralStyles';

const Recent = () => {
  const navigation = useNavigation<any>();
  const {reuseTheme} =  useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [details, setDetails] = useState<commentInterface[]>([
    {
      comment:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi sequi nihil cupiditate praesentium temporibus, porro odit pariatur? Id provident doloremque maxime ea sit quos ex, quisquam ',
      rating: 4.7,
      time: '5 days ago',
      imageURL:
        'https://media.istockphoto.com/id/1141568835/photo/adult-woman-training-legs-doing-inverted-lunges-exercise.jpg?b=1&s=170667a&w=0&k=20&c=dlcDnCKz73i_QgEUtgaZCpJyZUiHdKOOzlqYPPCSsyg=',
    },
    {
      comment:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi sequi nihil cupiditate praesentium temporibus, porro odit pariatur? Id provident doloremque maxime ea sit quos ex, quisquam ',
      rating: 4.4,
      time: '4 days ago',
      imageURL:
        'https://media.istockphoto.com/id/1141568835/photo/adult-woman-training-legs-doing-inverted-lunges-exercise.jpg?b=1&s=170667a&w=0&k=20&c=dlcDnCKz73i_QgEUtgaZCpJyZUiHdKOOzlqYPPCSsyg=',
    },
    {
      comment:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi sequi nihil cupiditate praesentium temporibus, porro odit pariatur? Id provident doloremque maxime ea sit quos ex, quisquam ',
      rating: 4.3,
      time: '3 days ago',
      imageURL:
        'https://media.istockphoto.com/id/1141568835/photo/adult-woman-training-legs-doing-inverted-lunges-exercise.jpg?b=1&s=170667a&w=0&k=20&c=dlcDnCKz73i_QgEUtgaZCpJyZUiHdKOOzlqYPPCSsyg=',
    },
    {
      comment:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi sequi nihil cupiditate praesentium temporibus, porro odit pariatur? Id provident doloremque maxime ea sit quos ex, quisquam ',
      rating: 4.1,
      time: '4 days ago',
      imageURL:
        'https://media.istockphoto.com/id/1141568835/photo/adult-woman-training-legs-doing-inverted-lunges-exercise.jpg?b=1&s=170667a&w=0&k=20&c=dlcDnCKz73i_QgEUtgaZCpJyZUiHdKOOzlqYPPCSsyg=',
    },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tabs, setTabs] = useState<TabInterface[]>([
    {
      name: 'Recent',
      screen: 'Recent',
    },
    {
      name: 'Critical',
      screen: 'Critical',
    },
    {
      name: 'Favourable',
      screen: 'Favourable',
    },
  ]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:reuseTheme.colors.preference.primaryBackground }}>
      {/* scrollview */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* review types */}
        <ReviewTypes data={tabs} name="Recent" />
        {/* review types */}
        {/* rating details */}
        <RatingDetails />
        {/* rating details */}

        {/* write review */}
        <TouchableOpacity
          style={[generalstyles.centerContent, { marginHorizontal: 10 }]}
          onPress={() => navigation.navigate('WriteReview')}
        >
          <Text style={{ color:reuseTheme.colors.preference.primaryForeground }}>
            Write a review
          </Text>
        </TouchableOpacity>
        {/* write review */}

        {/*  comments section*/}
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
          {details.map((comment, index) => (
            <View key={index} style={{ marginVertical: 10 }}>
              <Comment
                imageURL={comment.imageURL}
                time={comment.time}
                comment={comment.comment}
                rating={comment.rating}
              />
            </View>
          ))}
        </View>

        {/* comments section */}
      </ScrollView>
      {/* scrollview */}
    </SafeAreaView>
  );
};

export default Recent;
