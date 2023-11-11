import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

import { showMessage } from 'react-native-flash-message';
import { DEFAULT_USER_PROFILE, PROFILE_STORAGE } from '../utils/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/dev';
import { UploadImage } from '../hooks/UploadImage';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../utils/generalstyles/dynamicGeneralStyles';
import { ReuseTheme } from '../types/types';
import UploadComponent from './UploadComponent';
import { Avatar, IconButton } from 'react-native-paper';
import { updateProfilePicture } from '../redux/store/slices/UserSlice';
import { useFirebase } from '../hooks/useFirebase';

const HeadProfileCard = () => {

    const {reuseTheme} =  useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    


  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<any>(null);
  const {getUserByUid} = useFirebase();
  const [photoURL, setPhotoURL] = useState<string>(""); 

  useEffect(() => {
    // Fetch user data including photoURL if it hasn't been fetched yet
    
      getUserByUid(user?.UID)
        .then((userData) => {
          // Assuming 'photoURL' is a property in 'userData'
          // const { photoURL } = userData;
          if(userData !=null){
            if(userData?.photoURL){
              setPhotoURL(userData?.photoURL); 

  
            }

          }
          


        })
        .catch((error) => {
          // Handle any errors from the API call

        });
    
  }, [getUserByUid, user]);

  const dispatch = useDispatch<AppDispatch>();

  const handleUpload = async () => {
    try {
      const { error, image } = await UploadImage(
        user?.UID,
        imagePath.imagePath,
        PROFILE_STORAGE,
      );
      if (error) {
        Alert.alert('Something went wrong please try aagin');
      }
      if (image) {
        dispatch(updateProfilePicture(image));
        setImagePath(null);
      }
    } catch (error: any) {
      showMessage({
        message: error.response.data.message,
        description: error.response.data.error,
        type: 'danger',
        icon: 'danger',
        duration: 3000,
        floating: true,
      });
    }
  };

  useEffect(() => {

  }, [imagePath]);

  return (
    <View style={[generalstyles.flexStyles]}>
      <TouchableOpacity
        style={[{ marginHorizontal: 20 }]}
        onPress={() => {
          if (isLoggedIn) {
            setShowModal(!showModal);
          }
        }}
      >
        {imagePath ? (
          <View>
            <Avatar.Image
              size={80}
              source={{
                uri: `${imagePath.imagePath}`,
              }}
            />
            <View
              style={[generalstyles.absoluteStyles, { bottom: -6, right: -15 }]}
            >
              <IconButton
                icon="upload"
                iconColor={reuseTheme.colors.preference.primaryText}
                size={30}
                onPress={handleUpload}
                containerColor={reuseTheme.colors.preference.primaryForeground}
              />
            </View>
          </View>
        ) : (
          <Avatar.Image
            size={80}
            source={{
              uri: `${
                photoURL || DEFAULT_USER_PROFILE
              }
            `,
            }}
          />
        )}
      </TouchableOpacity>



      {/* modal section */}
      {showModal && (
        <UploadComponent
          image={imagePath}
          setImage={setImagePath}
          setModal={setShowModal}
          showModal={showModal}
          selectDocument={false}
        />
      )}

      {/* modal section */}
    </View>
  );
};

export default HeadProfileCard;


