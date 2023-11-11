import { SafeAreaView, ScrollView } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import HeadProfileCard from '../../components/HeadProfileCard';
import ProfileDetailsCard from '../../components/ProfileCardDetails';
import AuthModal from '../../components/AuthModal';


const Profile = () => {

  const {reuseTheme} =  useUserPreferredTheme();
  

  const { isLoggedIn,  guestUser, user } = useSelector((state: RootState) => state.user);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [profile_details, setProfileDetails] = useState([
    {
      name: 'Edit Profile',
      screen: 'Edit',
    },
    {
      name: 'Verification',
      screen: 'Verification',
    },
    {
      name: 'Private Policy',
      screen: 'PrivatePolicy',
    },
    {
      name: 'Settings',
      screen: 'Settings',
    },
  
    {
      name: 'About Us',
      screen: 'AboutUs',
    },
    {
      name: 'Sign Out',
      screen: 'Sign Out',
    },
    {
      name:"Sign In",
      screen:"Sign In"
    }
  ]);

  const profileDetails = useMemo(() => {
    if (guestUser) {
      // Filter out any items with a `screen` value of "Edit", "Settings",
      return profile_details.filter(item => !["Edit", "Settings",  "Sign Out"].includes(item.screen));
    } else {
      return profile_details.filter(item => !["Sign In"].includes(item.screen));
    }
  }, [guestUser, isLoggedIn]);


  useEffect(()=>{
    setProfileDetails(profileDetails);
  },[guestUser, isLoggedIn])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* header profile card */}
        <HeadProfileCard />
        {/* header profile card */}



        {/* profile details */}
        <ProfileDetailsCard details={profile_details} showSwitch={false}    setShowModal={setShowModal} />
        {/* profile details */}

        {/* show modal */}
        {
         showModal &&(
           <AuthModal
            showModal={showModal}
            setShowModal={setShowModal}

           />
         ) 
        }
        {/* show modal */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
