import { SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../../utils/generalstyles/dynamicGeneralStyles';
import ProfileDetailsCard from '../../../components/ProfileCardDetails';


const Notifications = () => {

  const {reuseTheme} =  useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: 'Donation Notifications',
      value: false,
    },
    {
      name: 'Donation Updates',
      id: 2,
      value: true,
    },

    {
      id: 3,
      name: 'General Notifications',
      value: false,
    },
    {
      id: 4,
      name: 'Vibrate',
      value: true,
    },

    {
      id: 5,
      name: 'App Updates',
      value: true,
    },
    {
      id: 6,
      name: 'Bill Reminders',
      value: true,
    },
    {
      id: 7,
      name: 'Promotion',
      value: false,
    },
    {
      id: 8,
      name: 'Payment Request',
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
      {/* profile details */}
      <ProfileDetailsCard
        details={notifications}
        showSwitch={true}
        onSetNotification={onSetNotification}
      />
      {/* profile details */}
    </SafeAreaView>
  );
};

export default Notifications;
