import { SafeAreaView, ScrollView } from 'react-native';
import React from 'react';

import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import TextComponent from '../../components/TextComponent';
import { PRIVACYPOLICY } from '../../utils/constants/constants';

const PrivatePolicy = () => {
  const {reuseTheme} =  useUserPreferredTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextComponent  text={PRIVACYPOLICY}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivatePolicy;
