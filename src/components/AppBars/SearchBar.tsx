import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Appbar, Badge } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import SearchComponent from '../SearcComponent';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';



const SearchAppBar = ({ navigation, previous, placeholder, onSearchChange, searchValue , searchStyles }: any) => {
  const dispatch = useDispatch()

  const { reuseTheme } = useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);


  return (
    <Appbar.Header
      style={{
        backgroundColor: `${reuseTheme.colors.preference.primaryBackground}`,
        width: '100%',
        elevation: 0,
      }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={reuseTheme.colors.preference.primaryText}
        />
      ) : null}
      <View style={[{ flex: 1 }]}>
        <SearchComponent
          onChangeSearch={onSearchChange}
          searchStyles={searchStyles}
          placeholder={`${placeholder}`}
          value={searchValue}
        
        />
      </View>
    </Appbar.Header>
  );
};

export default SearchAppBar;
