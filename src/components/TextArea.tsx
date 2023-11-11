import { StyleSheet, View, TextInput } from 'react-native';
import React, { useState } from 'react'
import { ReuseTheme } from '../types/types';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TextArea = ({placeholder, text , setText}:any) => {
    const {reuseTheme} =  useUserPreferredTheme();
    const styles = textStyles(reuseTheme);
  return (
    <View style={[styles.textareaContainer]}>
       <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={4}
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};

export default TextArea;

const textStyles =(theme:ReuseTheme)=> StyleSheet.create({
  textareaContainer: {
    height: 200,
    width: '88%',
    padding: 5,
    backgroundColor: theme.colors.preference.primaryBackground,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.preference.grey3,
  },
  textInput: {
    height: 150,
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,

  },
});
