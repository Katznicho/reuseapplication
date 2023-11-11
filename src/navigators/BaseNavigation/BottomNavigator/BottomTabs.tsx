
import HomeStack from '../StackNavigator/HomeStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar } from 'react-native-paper';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import { View } from 'react-native';
import ProfileStack from '../../../screens/ProfileScreens/ProfileStack';
import { useFirebase } from '../../../hooks/useFirebase';
import { RootState } from '../../../redux/store/dev';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DEFAULT_USER_PROFILE } from '../../../utils/constants/constants';
import MyNotificationStack from '../../../screens/Notifcations/MyNotificationStack';
import CreateDonationProduct from '../../../screens/CreateScreens/CreateDonationProduct';
import ReuseStack from '../../../screens/Reuse/ReuseStack';




const Tab = createBottomTabNavigator();


export default function BottomTabs() {

  const { user } = useSelector((state: RootState) => state.user);
  const { reuseTheme } = useUserPreferredTheme();
  const { getUserByUid } = useFirebase();
  const [photoURL, setPhotoURL] = useState<string>("");


  useEffect(() => {
    // Fetch user data including photoURL if it hasn't been fetched yet

    getUserByUid(user?.UID)
      .then((userData) => {
        // Assuming 'photoURL' is a property in 'userData'
        // const { photoURL } = userData;
        if (userData != null) {
          if (userData?.photoURL) {
            setPhotoURL(userData?.photoURL);

          }

        }

      })
      .catch((error) => {
        // Handle any errors from the API call

      });

  }, [getUserByUid, user]);

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"

      sceneContainerStyle={{
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
        flex: 1,
      }}
      screenOptions={
        {
          tabBarStyle: {
            backgroundColor: reuseTheme.colors.preference.primaryBackground,
            borderWidth: 0,
            borderTopWidth: 0,
            borderColor: reuseTheme.colors.preference.primaryBackground,
            height: 60,
            // elevation: 0,
          },
          headerShown: false,
          tabBarActiveTintColor: reuseTheme.colors.preference.grey6,
          tabBarInactiveTintColor: reuseTheme.colors.preference.primaryText,



        }
      }

    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }: any) => (
            <MaterialCommunityIcons
              name="home-variant"
              color={color}
              size={26}
            />

          ),
        }}
      />
      <Tab.Screen name="Create"
        component={CreateDonationProduct}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="pluscircleo"
              color={color}
              size={26}
            />
          ),
        }}
      />
      {/* mine */}
      <Tab.Screen name="Reuse"
        component={ReuseStack}
        options={{
          tabBarLabel: 'Reuse',
          tabBarAccessibilityLabel: 'Reuse',
          tabBarIcon: ({ color }: any) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: reuseTheme.colors.preference.primaryBackground,
                borderRadius: 50,
                width: 80,
                position: 'absolute',
              }}
            >
              <Avatar.Image
                size={35}
                source={require("../../../assets/images/logo_white.png")}
                style={{
                  backgroundColor: reuseTheme.colors.preference.primaryBackground,
                  borderRadius: 50,
                  // marginVertical: 10,
                  // height: 80,
                  borderColor: reuseTheme.colors.preference.primaryText,
                }}

              />

            </View>
          ),
        }}
      />

      <Tab.Screen name="Notifications"
        component={MyNotificationStack}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="notifications-sharp"
              color={color}
              size={26}
            />
          ),
        }}
      />


      <Tab.Screen name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',

          tabBarIcon: ({ color }: any) => (
            <Avatar.Image
              size={30}
              source={{
                uri: photoURL || DEFAULT_USER_PROFILE
              }}
            />
          ),
        }}

      />
    </Tab.Navigator>
  );
}
