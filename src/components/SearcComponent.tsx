import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';

const SearchComponent = ({
  searchStyles,
  icon,
  iconPressed,
  placeholder,
  value,
  onSearchChange,
}: any) => {

  const { reuseTheme } = useUserPreferredTheme();

  return (
    <View>
      <Searchbar
        placeholder={placeholder}
        style={searchStyles}
        onChangeText={onSearchChange}
        inputStyle={{ color: reuseTheme.colors.preference.primaryText }}
        icon={icon}
        onIconPress={iconPressed}
        iconColor={reuseTheme.colors.preference.primaryText}
        autoCorrect={true}
        autoCapitalize="none"
        theme={{ colors: { primary: reuseTheme.colors.preference.primaryBackground } }}
        value={value}
        placeholderTextColor={reuseTheme.colors.preference.primaryText}

      />
    </View>
  );
};

export default SearchComponent;
