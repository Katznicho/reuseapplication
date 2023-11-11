import { SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import ProfileDetailsCard from '../../../components/ProfileCardDetails';


const UnitsOfMeasure = () => {

  const {reuseTheme} =  useUserPreferredTheme();


  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: 'Metric',
      value: false,
    },
    {
      name: 'Imperial',
      id: 2,
      value: true,
    },
  ]);

  const onSetNotification = (id: number) => {
    const newNotifications = notifications.map(item => {
      if (item.id === id) {
        return {
          ...item,
          value: !item.value,
        };
      }
      return item;
    });
    setNotifications(newNotifications);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* profile details */}
        <ProfileDetailsCard
          details={notifications}
          showSwitch={true}
          onSetNotification={onSetNotification}
        />
        {/* profile details */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UnitsOfMeasure;
