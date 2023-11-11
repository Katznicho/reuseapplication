import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
import { SwiperScreenProps } from './SwiperScreen';
import SwiperText from '../../components/SwiperText/SwiperText';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { APP_GENDER } from '../../utils/constants/constants';

  
  
  const GenderScreen = ({setUserProfile}:SwiperScreenProps) => {
    
    const [gender, setGender] = useState<string>(APP_GENDER.MALE);
    const  {reuseTheme} =  useUserPreferredTheme();
    const generalStyles = dynamicGeneralStyles(reuseTheme);
  
    //set profile details to the default value
    useEffect(() => {
      setUserProfile((prev:any) => {
        return {...prev, gender:APP_GENDER.MALE}
      }
      )
  
    }, [])
    
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: reuseTheme.colors.preference.primaryBackground,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
  
           <SwiperText
            headerText = {`Tell us about yourself ?`}
            smallText ={` To give you a better experience we need`}
            smallerText={`to know your gender`}
           />
          {/* gender area */}
          <View
            style={[
              generalStyles.centerContent,
              {
                marginTop: 50,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.genderStyles,
                {
                  backgroundColor:
                    gender === APP_GENDER.MALE
                      ? reuseTheme.colors.preference.primaryForeground
                      : reuseTheme.colors.preference.transparent,
                },
              ]}
              onPress={() => {
                setGender(APP_GENDER.MALE);
                setUserProfile((prev:any) => {
                  return {...prev, gender:APP_GENDER.MALE}
                }
                )
  
              }}
            >
              <MaterialCommunityIcons
                name="gender-male"
                color={
                  reuseTheme.colors.preference.primaryText
                }
                size={70}
                style={[
                  generalStyles.centerContent,
                  {
                    marginLeft: 10,
                  },
                ]}
              />
              <View style={[generalStyles.centerContent]}>
                <Text
                  style={[{
                    color:
                       reuseTheme.colors.preference.primaryText,
                  },styles.genderNameStyles
                ]}
                >
                  {APP_GENDER.MALE}
                </Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[
                styles.genderStyles,
                {
                  backgroundColor:
                    gender === APP_GENDER.FEMALE
                      ? reuseTheme.colors.preference.primaryForeground
                      : reuseTheme.colors.preference.transparent,
                },
              ]}
              onPress={() => {
                setGender(APP_GENDER.FEMALE);
                setUserProfile((prev:any) => {
                  return {...prev, gender:APP_GENDER.FEMALE}
                }
                )
              }}
            >
              <MaterialCommunityIcons
                name="gender-female"
                color={
                   reuseTheme.colors.preference.primaryText
                }
                size={70}
                style={[
                  generalStyles.centerContent,
                  {
                    marginLeft: 10,
                  },
                ]}
              />
              <View style={[generalStyles.centerContent]}>
                <Text
                  style={[{
                    color:reuseTheme.colors.preference.primaryText,
                  },
                  styles.genderNameStyles
                ]}
                >
                  {APP_GENDER.FEMALE}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* gender area */}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  
  export default GenderScreen;
  
  const styles = StyleSheet.create({
    genderStyles: {
      width: 110,
      height: 110,
      padding: 10,
      borderRadius: 100,
      marginVertical: 15,
    },
    genderNameStyles:{
         marginTop: 0,
    }
  });
  