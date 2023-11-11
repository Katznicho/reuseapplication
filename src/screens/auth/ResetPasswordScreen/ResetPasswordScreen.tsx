import React, { useState } from 'react'
import { View, TouchableOpacity, Image, TextInput, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ActivityIndicator } from '../../../components/ActivityIndicator'
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme'
import dynamicStyles from './styles'

const ResetPasswordScreen = (props:any) => {

  const {reuseTheme} =  useUserPreferredTheme();

  const styles = dynamicStyles(reuseTheme)

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSendPasswordResetEmail = () => {
  
}

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image style={styles.backArrowStyle} source={reuseTheme.icons.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>{'Reset Password'}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={'E-mail'}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.sendContainer}
          onPress={() => onSendPasswordResetEmail()}>
          <Text style={styles.sendText}>{'Send'}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      {isLoading && <ActivityIndicator />}
    </View>
  )
}


export default ResetPasswordScreen
