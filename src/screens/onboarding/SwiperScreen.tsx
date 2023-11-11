import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SwiperText from '../../components/SwiperText/SwiperText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { dynamicGeneralStyles  } from '../../utils/generalstyles/dynamicGeneralStyles';
import { dynamicBaseStyles } from './baseStyles';
import GenderScreen from './GenderScreen';
import AppUserType from './AppUserType';
import Interests from './Interests';
import { useDispatch, useSelector } from 'react-redux';
import { setAppIntro } from '../../redux/store/slices/UserSlice';
import { useFirebase } from '../../hooks/useFirebase';
import { RootState } from '../../redux/store/dev';
import { showMessage } from 'react-native-flash-message';
import UserLocation from './UserLocation';
import { APP_USERS } from '../../utils/constants/constants';




export interface UserProfile {
  gender: string 
  reuserType: string 
  interests: string[] ,
  location?: string

}
export interface SwiperScreenProps {
  setUserProfile: Dispatch<SetStateAction<UserProfile>>;
}




const SwiperScreen = () => {

  const {updateUserProfilePreferences} = useFirebase();
  const {user} =  useSelector((state:RootState) => state.user);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [finish, setFinish] = useState<string>('Finish');
  const dispatch = useDispatch();

  const  {reuseTheme} =  useUserPreferredTheme();
  const generalStyles = dynamicGeneralStyles(reuseTheme);
  const styles = dynamicBaseStyles(reuseTheme)


  const [profileDetails, setProfileDetails] = useState<UserProfile>({
     gender:"",
    reuserType: "",
    interests: [],

  })

  useEffect(() => {
    // console.log(profileDetails)
    if(user.reuseType  !== null && user.reuseType !== undefined){
      setProfileDetails({...profileDetails, reuserType:user.reuseType})
    }
    //if reuseType is a receiver dont show gender
    if(user.reuseType === APP_USERS.RECEIVER){
      setSlides([
        {
          key: 1,
          page: <Interests  setUserProfile={setProfileDetails}/>,
        },
        
      ])
    }
    else{
      setSlides([
        {
          key: 1,
          page: <GenderScreen setUserProfile={setProfileDetails} />,
        },
      
        {
          key: 2,
          page: <Interests  setUserProfile={setProfileDetails}/>,
        },
        
      ])
    }




  }
  , [profileDetails, user])
  



  const [slides, setSlides] = useState<any>([
    
  
    {
      key: 2,
      page: <Interests  setUserProfile={setProfileDetails}/>,
    },
    

  ])



  const renderSlide = ({ item, index }: any) => {




    // if (index === slides.length - 1) {
    //   return (
    //     <ScrollView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }} keyboardShouldPersistTaps="always">
    //       {/* text area */}
    //       <SwiperText
    //         headerText={`Your Now Set`}
    //         smallText={`Please confirm the details below to continue`}

    //       />
    //       <View style={{marginHorizontal:20}}>
            

    //         {/* gender */}
    //         <View style={styles.viewStyles}>
    //           <Text style={styles.maintext}>Gender </Text>
    //           <Text style={styles.detailstext}>{profileDetails.gender}</Text>
    //         </View>
            
    //         {/* gendrer */}




    //       </View>


    //     </ScrollView>
    //   );
    // }
    return <>{item.page}</>;
  };


  const onDone = async () => {
    // User finished the introduction. Show real app through
    try {
      setFinish("loading...")
      setDisabled(true)
      //userId: string, reuser: string, gender:string, preferences: string[]
      // updateUserProfilePreferences()
      const success = await updateUserProfilePreferences(user?.UID, profileDetails?.reuserType, profileDetails.gender, profileDetails.interests);

      dispatch(setAppIntro());
      showMessage({
        message: "Success",
        description: "Everything is set up",
        type: "success",
        autoHide:true,
        duration:3000,
        icon: "success"
      })
    }
    catch (error: any) {
 
      
      setFinish("Finish");
      setDisabled(false)
    }

  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderSlide}
      onDone={onDone}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      dotClickEnabled={false}
      showSkipButton={false}
      showNextButton={true}
      showDoneButton={true}
      showPrevButton={true}
      scrollEnabled={true}
      renderNextButton={() => (
        <View style={[generalStyles.flexStyles, styles.nextStyles]}>
          <Text style={styles.textStyles}>Next</Text>
          <MaterialCommunityIcons
            name="play"
            size={30}
            color={reuseTheme.colors.preference.primaryForeground}
          />
        </View>
      )}
      dotStyle={{
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
      }}
      activeDotStyle={{
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
      }}
      renderPrevButton={() => (
        <View style={[styles.backStyles]}>
          <AntDesign name="arrowleft" size={30} color={reuseTheme.colors.preference.primaryText} />
        </View>
      )}
      renderDoneButton={() => (
        <TouchableOpacity
          style={[generalStyles.flexStyles, styles.nextStyles]}
          onPress={onDone}
          disabled={disabled}
        >
          <Text style={styles.textStyles}>{finish}</Text>
          <MaterialCommunityIcons
            name="play"
            size={30}
            color={reuseTheme.colors.preference.primaryForeground}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default SwiperScreen;


