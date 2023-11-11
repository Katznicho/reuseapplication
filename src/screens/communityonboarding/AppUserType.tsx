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
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_USERS } from '../../utils/constants/constants';
import Octicons from 'react-native-vector-icons/Octicons';


  
  const AppUserType = ({setUserProfile}:SwiperScreenProps) => {
    

    const[appUserType , setAppUserType] = useState<string>(APP_USERS.DONOR);
    const  {reuseTheme} =  useUserPreferredTheme();
    const generalStyles = dynamicGeneralStyles(reuseTheme);
  
    //set profile details to the default value
    useEffect(() => {
      setUserProfile((prev:any) => {
        return {...prev, reuserType:APP_USERS.DONOR}
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
            headerText = {`How could you like to use this app ?`}
            smallText ={` Dont worry you can change this later`}
            smallerText={`in the settings`}
           />
          {/*  area */}
          <View
            style={[
              generalStyles.centerContent,
              
            ]}
          >
            <TouchableOpacity
              style={[
                styles.genderStyles,
                {
                  backgroundColor:
                    appUserType === APP_USERS.DONOR
                      ? reuseTheme.colors.preference.primaryForeground
                      : reuseTheme.colors.preference.transparent,
                },
              ]}
              onPress={() => {

                  setAppUserType(APP_USERS.DONOR);
                  setUserProfile((prev:any) => {
                    return {...prev, reuserType:APP_USERS.DONOR}
                  }
                  )
                
  
              }
            }
            >
              <FontAwesome5
                name="donate"
                color={
                  reuseTheme.colors.preference.primaryText
                }
                size={60}
                style={[
                  generalStyles.centerContent,
                  {
                    marginLeft: 20,
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
                  {APP_USERS.DONOR}
                </Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[
                styles.genderStyles,
                {
                  backgroundColor:
                  appUserType === APP_USERS.RESELLER
                      ? reuseTheme.colors.preference.primaryForeground
                      : reuseTheme.colors.preference.transparent,
                },
              ]}
              onPress={() => {
                    setAppUserType(APP_USERS.RESELLER);
                    setUserProfile((prev:any) => {
                      return {...prev, reuserType:APP_USERS.RESELLER}
                    }
                    )
              }}
            >
              <MaterialIcons
                name="sell"
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
                  {APP_USERS.RESELLER}
                </Text>
              </View>
            </TouchableOpacity>


            {/* both  */}
            <TouchableOpacity
              style={[
                styles.genderStyles,
                {
                  backgroundColor:
                  appUserType === APP_USERS.ALL
                      ? reuseTheme.colors.preference.primaryForeground
                      : reuseTheme.colors.preference.transparent,
                },
              ]}
              onPress={() => {
                    setAppUserType(APP_USERS.ALL);
                    setUserProfile((prev:any) => {
                      return {...prev, reuserType:APP_USERS.ALL}
                    }
                    )
              }}
            >
              <Octicons
                name="arrow-both"
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
                  {APP_USERS.ALL}
                </Text>
              </View>
            </TouchableOpacity>
              
            {/* both */}
          </View>

          {/*  area */}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  
  export default AppUserType;
  
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
  