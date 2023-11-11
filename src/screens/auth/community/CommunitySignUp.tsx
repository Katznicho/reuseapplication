import React, { useState } from 'react'
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import dynamicStyles from './styles'
import TermsOfUseView from '../../../components/TermsOfUse'
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme'
import { config } from '../../../config/config'
import { ActivityIndicator } from '../../../components/ActivityIndicator'
import { dynamicGeneralStyles } from '../../../utils/generalstyles/dynamicGeneralStyles'
// import { SignupField } from '../../../types/types'
import { useFirebase } from '../../../hooks/useFirebase'  
import { showMessage } from 'react-native-flash-message'
import { APP_USERS } from '../../../utils/constants/constants'



const CommunitySignUp = ({ navigation }: any) => {

  const { reuseTheme } = useUserPreferredTheme();
  const {register} = useFirebase();

  const styles = dynamicStyles(reuseTheme)
  const generalStyles = dynamicGeneralStyles(reuseTheme);
  const [errors, setErrors] = useState({ email: '', passwordMatch: '', username: '', password: '', communityName: ''})

  const [inputFields, setInputFields] = useState({})


  const [loading, setLoading] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  

  const trimFields = (fields: { [x: string]: string }) => {
    var trimmedFields = {}
    Object.keys(fields).forEach(key => {
      if (fields[key]) {
        trimmedFields[key] = fields[key].trim()
      }
    })
    return trimmedFields
  }

  const onRegister = async () => {

     const trimmedFields = trimFields(inputFields)
    
     // Validate email format
    if (!validateEmail(trimmedFields.email)) {

      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Invalid email format',
      }));
      return;
      
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: '',
      }));
    }

     // Validate password matching
     if (trimmedFields.password !== trimmedFields.confirmPassword) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordMatch: 'Passwords do not match',
      }));
      return;
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordMatch: '',
      }));
    }

    const usernameRegex = /^@[\w]+$/;
    if (!usernameRegex.test(trimmedFields.username)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        username: 'Username should start with "@" followed by alphanumeric characters',
      }));
      return;
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        username: '',
      }));
    }

    // Check for empty fields
    let emptyFieldError = false;
    for (const key in trimmedFields) {
      if (trimmedFields.hasOwnProperty(key)) {
        if (trimmedFields[key] === '') {
          setErrors(prevErrors => ({
            ...prevErrors,
            [key]: 'This field is required',
          }));
          emptyFieldError = true;
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            [key]: '',
          }));
        }
      }
    }
    if (emptyFieldError) {
      return;
    }
    setLoading(true)
    Keyboard.dismiss()
     try {

      const {email, password, confirmPassword, username, communityName} = trimmedFields;

      
      await register(email, password, username, "", "",  APP_USERS.RECEIVER,communityName);

        setLoading(false);
        showMessage({
          message: "Success",
          description: "Your almost there!",
          type: "success",
          autoHide:true,
          duration:3000,
          icon: "success"
        }) 
     }
      catch (error) {
        console.log(JSON.stringify(error));
        setLoading(false);
        showMessage({
          message: "Error",
          description:"An error occured while creating your account",
          type: "danger",
          autoHide:true,
          duration:3000,
          icon: "danger"
        })
      }

      

  }

  const onChangeInputFields = (text: string, key: any) => {
    setInputFields(prevFields => ({
      ...prevFields,
      [key]: text,
    }))
  }

  const renderInputField = (field: any, index: any) => {
    return (
      <View key={index}>
              <TextInput
        key={index}
        style={styles.InputContainer}
        placeholder={field.placeholder}
        placeholderTextColor="#aaaaaa"
        secureTextEntry={field.secureTextEntry}
        onChangeText={text => onChangeInputFields(text, field.key)}
        value={inputFields[field.key]}
        keyboardType={field.type}
        underlineColorAndroid="transparent"
        autoCapitalize={field.autoCapitalize}
      />
        {/* Display error messages */}
        {field.key === 'email' && errors.email && <View style={generalStyles.centerContent}>
        <Text style={generalStyles.errorText}>{errors.email}</Text>
        </View>  
        }
        {field.key === 'password' && errors.passwordMatch &&  <View  style={generalStyles.centerContent}>
        <Text style={generalStyles.errorText}>{errors.passwordMatch}</Text>
        </View>  }
        {field.key === 'username' && errors.username && <View style={generalStyles.centerContent}>
        <Text style={generalStyles.errorText}>{errors.username}</Text>
        </View>  }
        {errors[field.key] && <View style={generalStyles.centerContent}>
          <Text style={generalStyles.errorText}>{errors[field.key]}</Text>
           </View>}
      </View>

    )
  }

  const renderSignupWithEmail = () => {
    return (
      <>
        {config.communitySignupFields.map(renderInputField)}
        <TouchableOpacity 
        style={styles.signupContainer} 
        onPress={onRegister}
        >
          <Text style={styles.signupText}>{'Sign Up'}</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View style={generalStyles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' , paddingBottom: 50}}
        keyboardShouldPersistTaps="always">
        {/* login and register */}
        <View
          style={[
            generalStyles.flexStyles,
            {
              alignItems: 'center',
            },
          ]}
        >
          <View

          >
            <TouchableOpacity 
              onPress={() => {

                navigation.navigate('Login');
              }}
            >
              <Text style={generalStyles.authTitle}>Login</Text>
            </TouchableOpacity>


          </View>

          <View>
            <TouchableOpacity>
              <Text style={generalStyles.authTitle}>Register</Text>
            </TouchableOpacity>
            <View style={[
              generalStyles.bottomHairline,
              {
                width: 110,
              }
            ]} />
          </View>
        </View>
        {/* login and register */}

        <Text style={generalStyles.authTitle}>{'Create A Community Account'}</Text>
        {/* <ProfilePictureSelector setProfilePictureFile={setProfilePictureFile} /> */}
        {renderSignupWithEmail()}
        {config.isSMSAuthEnabled && (
          <>
            <Text style={styles.orTextStyle}>{'OR'}</Text>
            <TouchableOpacity
              style={styles.PhoneNumberContainer}
              onPress={() => navigation.navigate('Register')}>
              <Text>{'Register As A Donor'}</Text>
            </TouchableOpacity>
          </>
        )}
        <TermsOfUseView
          tosLink={config.tosLink}
          privacyPolicyLink={config.tosLink}
          style={styles.tos}
        />
      </KeyboardAwareScrollView>
      {loading && <ActivityIndicator />}
    </View>
  )
}

export default CommunitySignUp
