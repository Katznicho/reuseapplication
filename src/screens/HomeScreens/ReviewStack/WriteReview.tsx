import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { Slider } from '@miblanchard/react-native-slider';
import TextArea from '../../../components/TextArea';
import { ReuseTheme } from '../../../types/types';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../../utils/generalstyles/dynamicGeneralStyles';


const WriteReview = () => {
  const [rater, setRater] = useState<any>(1.0);

  const {reuseTheme} =  useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);
  const styles = writeReviewStyles(reuseTheme);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:reuseTheme.colors.preference.primaryBackground }}>
      <ScrollView>
        {/* bar */}
        <View style={[generalstyles.centerContent, { marginHorizontal: 10 }]}>
          <View style={{ marginLeft: 150 }}>
            <Text
              style={{
                color:reuseTheme.colors.preference.primaryText,
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              {/*  */}
            </Text>
          </View>
          {/* rater */}
          <View style={styles.sliderStyles}>
            <Slider
              value={rater}
              onValueChange={value => setRater(value)}
              minimumValue={0}
              maximumValue={5}
              step={0.2}
              thumbTintColor={reuseTheme.colors.preference.primaryForeground}
              containerStyle={{
                marginHorizontal: 10,
                borderRadius: 10,
              }}
              trackStyle={{
                height: 25,
                borderRadius: 20,
                backgroundColor:reuseTheme.colors.preference.transparent,
              }}
              minimumTrackTintColor={reuseTheme.colors.preference.primaryForeground}
              maximumTrackTintColor={reuseTheme.colors.preference.primaryForeground}
              thumbStyle={{
                width: 30,
                height: 25,
              }}
              renderAboveThumbComponent={() => (
                <View style={{ width: 30, height: 25, borderRadius: 20 }}>
                  <Text
                    style={{
                      color:reuseTheme.colors.preference.primaryText,
                      fontSize: 15,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {Math.round(rater * 10) / 10}
                  </Text>
                </View>
              )}
            />
          </View>
          {/* rater */}
        </View>
        {/* bar */}
        {/* text area */}
        <TextArea />
        {/* text area */}
        {/* button */}
        <View>
          <Button
            mode="contained"
            contentStyle={{
              flexDirection: 'row-reverse',
            }}
            style={{
              marginHorizontal: 40,
              marginVertical: 20,
            }}
            //  loading={true}
            buttonColor={reuseTheme.colors.preference.primaryForeground}
            textColor={reuseTheme.colors.preference.primaryBackground}
            onPress={() => console.log('Pressed')}
          >
            Send
          </Button>
        </View>
        {/* button */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WriteReview;

const writeReviewStyles = (theme:ReuseTheme)=> StyleSheet.create({
  sliderStyles: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: theme.colors.preference.primaryBackground,
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginHorizontal: 40,
  },
});
