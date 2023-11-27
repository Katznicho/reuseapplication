import React, { useState } from 'react'
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'

import dynamicStyles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { ActivityIndicator } from '../../../components/ActivityIndicator';
import IMGoogleSignInButton from '../../../components/IMGoogleSignInButton/IMGoogleSignInButton';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../../utils/generalstyles/dynamicGeneralStyles';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/store/slices/UserSlice';
import { useFirebase } from '../../../hooks/useFirebase';
import { showMessage } from 'react-native-flash-message';
import { Alert } from 'react-native';

//AIzaSyDnpNDu2bgT553XvYMntx5B0HD3fKzyD0A


const Login = () => {

  const navigation = useNavigation<any>()

  const { login, signUpWithGoogle } = useFirebase()

  const { reuseTheme } = useUserPreferredTheme();
  const generalStyles = dynamicGeneralStyles(reuseTheme);

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: "", password: "" });
  const styles = dynamicStyles(reuseTheme)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onPressLogin = async () => {
    if (email == "") {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: "Email is required"
      }));
      return;
    }
    else {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: ""
      }));
    }
    if (!validateEmail(email)) {

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

    if (password == "") {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: "Passsword is required"
      }));
      return;
    }
    else {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: ""
      }));
    }

    try {
      setLoading(true)
      let res = await login(email, password);
      setLoading(false)
      if (res?.user) {
        showMessage({
          message: "Success",
          type: "success",
          autoHide: true,
          duration: 3000,
          description: "Logged in successfully"
        })
      }
      else {
        showMessage({
          message: "Error",
          description: "Invalid email or password",
          type: "danger",
          autoHide: true,
          duration: 3000,
          icon: "danger"
        })
        return;
      }



    } catch (error) {
      setLoading(false)
      showMessage({
        message: "Error",
        description: "Invalid email or password",
        type: "danger",
        autoHide: true,
        duration: 3000,
        icon: "danger"
      })
    }




  }

  const onFBButtonPress = () => {
    //dispatch(loginUser());
  }

  const onGoogleButtonPress = () => {

    signUpWithGoogle()
  }

  const onAppleButtonPress = async () => {

  }

  const onForgotPassword = async () => {
    navigation.push('ResetPassword', {
      isResetPassword: true,
    })
  }



  return (
    <View style={generalStyles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        {/* login and register */}
        {/* <Text style={styles.title}>{'Login'}</Text> */}

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
            <TouchableOpacity>
              <Text style={generalStyles.authTitle}>Login</Text>
            </TouchableOpacity>
            <View style={generalStyles.bottomHairline} />

          </View>

          <View>
            <TouchableOpacity
              onPress={() => {

                navigation.navigate('Register');
              }}
            >
              <Text style={generalStyles.authTitle}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* login and register */}

        <TextInput
          style={styles.InputContainer}
          placeholder={'E-mail'}
          keyboardType="email-address"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={generalStyles.centerContent}>
          {errors.email && <Text style={generalStyles.errorText}>{errors.email}</Text>}
        </View>

        <TextInput
          style={styles.InputContainer}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder={'Password'}
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={generalStyles.centerContent}>
          {errors.password && <Text style={generalStyles.errorText}>{errors.password}</Text>}
        </View>

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={() => onForgotPassword()}>
            <Text style={styles.forgotPasswordText}>
              {'Forgot password?'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => onPressLogin()}>
          <Text style={styles.loginText}>{'Log In'}</Text>
        </TouchableOpacity>
        <>
          <Text style={styles.orTextStyle}> {'OR'}</Text>
          <Text style={styles.facebookText}>
            {'Login With Google'}
          </Text>
        </>


        <IMGoogleSignInButton
          containerStyle={styles.googleButtonStyle}
          onPress={onGoogleButtonPress}
        />

        {/* <TouchableOpacity
          style={styles.phoneNumberContainer}
          onPress={() => navigation.navigate('Sms', { isSigningUp: false })}>
          <Text style={styles.phoneNumber}>
            Login with phone number
          </Text>
        </TouchableOpacity> */}

        {loading && <ActivityIndicator />}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Login
