import React, { useState, useRef, useMemo } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  
  Image,
} from 'react-native'
// import ImageView from 'react-native-image-view'
// import ImageView from "react-native-image-viewing";
// import * as ImagePicker from 'expo-image-picker'
import ImagePicker from 'react-native-image-crop-picker';
// import { useActionSheet } from '../../..'
import dynamicStyles from './styles'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';

export const ProfilePictureSelector = (props:any) => {

  const [profilePictureURL, setProfilePictureURL] = useState(
    props.profilePictureURL || '',
  )
  const originalProfilePictureURL = useRef(props.profilePictureURL || '')
  if (originalProfilePictureURL.current !== (props.profilePictureURL || '')) {
    originalProfilePictureURL.current = props.profilePictureURL || ''
    setProfilePictureURL(props.profilePictureURL || '')
  }

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<any>(null)

  const [isImageViewerVisible, setIsImageViewerVisible] = useState<boolean>(false)
  const [tappedImage, setTappedImage] = useState<any[]>([])

  const {reuseTheme} =  useUserPreferredTheme();

  const styles = dynamicStyles(reuseTheme)

  // const { showActionSheetWithOptions } = useActionSheet()

  const actionSheetOptions = useMemo(() => {
    return {
      title: 'Confirm action',
      options: [
        'Change Profile Photo',
        'Cancel',
        'Remove Profile Photo',
      ],
      cancelButtonIndex: 1,
      destructiveButtonIndex: 2,
    }
  }, [])

  const handleProfilePictureClick = (url:any) => {
    if (url) {
      const isAvatar = url.search('avatar')
      const image = [
        {
          source: {
            uri: url,
          },
        },
      ]
      if (isAvatar === -1) {
        setTappedImage(image)
        setIsImageViewerVisible(true)
      } else {
        // showActionSheet()
      }
    } else {
      // showActionSheet()
    }
  }

  const onImageError = () => {
    console.log('Error loading profile photo at url ' + profilePictureURL)
    const defaultProfilePhotoURL =
      'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'
    setProfilePictureURL(defaultProfilePhotoURL)
  }

  

  const onPressAddPhotoBtn = async () => {
    const options = {
      title: 'Select photo',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Choose from Library',
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

 

  }

  const closeButton = () => (
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setIsImageViewerVisible(false)}>
      <Image style={styles.closeIcon} source={reuseTheme.icons.close} />
    </TouchableOpacity>
  )

  const showActionSheet = (index:any) => {
    setSelectedPhotoIndex(index)
    // showActionSheetWithOptions(
    //   {
    //     title: actionSheetOptions.title,
    //     options: actionSheetOptions.options,
    //     cancelButtonIndex: actionSheetOptions.cancelButtonIndex,
    //     destructiveButtonIndex: actionSheetOptions.destructiveButtonIndex,
    //   },
    //   onActionDone,
    // )
  }

  const onActionDone = (index: number) => {
    if (index == 0) {
      onPressAddPhotoBtn()
    }
    if (index == 2) {
      // Remove button
      if (profilePictureURL) {
        setProfilePictureURL(null)
        props.setProfilePictureFile(null)
      }
    }
  }

  return (
    <>
      <View style={styles.imageBlock}>
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => handleProfilePictureClick(profilePictureURL)}>
          <Image
            style={[styles.image, { opacity: profilePictureURL ? 1 : 0.3 }]}
            source={
              profilePictureURL
                ? { uri: profilePictureURL }
                : reuseTheme.icons.userAvatar
            }
            resizeMode="cover"
            onError={onImageError}
          />
        </TouchableHighlight>

        <TouchableOpacity onPress={showActionSheet} style={styles.addButton}>
          <Image style={styles.cameraIcon} source={reuseTheme.icons.cameraFilled} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        
      </ScrollView>
    </>
  )
}
