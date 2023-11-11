import { View, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../../utils/generalstyles/dynamicGeneralStyles';
import ProfileDetailsCard from '../../../components/ProfileCardDetails';


const Settings = () => {

  const {reuseTheme} =  useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);

  const [settings, setSettings] = useState([
    {
      name: 'Units of Measure',
      screen: 'Units',
    },

    {
      name: 'Notifications',
      screen: 'SettingNotifications',
    },
    {
      name: 'Languauge',
      screen: 'Language',
    },

    {
      name: 'Contact Us',
      screen: 'ContactUs',
    },
  ]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:reuseTheme.colors.preference.primaryBackground }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 50,
        }}
      >
        {/* profile details */}
        <View
          style={{
            borderTopColor: reuseTheme.colors.preference.primaryText,
            borderTopWidth: 0.5,
            marginHorizontal: 10,
          }}
        />
        <ProfileDetailsCard details={settings} showSwitch={false} />
        {/* profile details */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
