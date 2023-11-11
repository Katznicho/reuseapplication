import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomNavigator/BottomTabs';
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/dev';
import DrawerContentComponent from '../../components/DrawerContent/DrawerContentComponent';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import SwiperScreen from '../../screens/onboarding/SwiperScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SupportStack from './StackNavigator/SupportStack';
import PaymentStack from '../../screens/payments/PaymentStack';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function BaseNavigation() {
  const { reuseTheme } = useUserPreferredTheme();
  const { isLoggedIn, guestUser, appIntro } = useSelector((state: RootState) => state.user);
  useEffect(() => { }, [guestUser, isLoggedIn])

  return appIntro ? (<Drawer.Navigator
    initialRouteName="HomeDrawer"
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
        width: 300,

      },
      drawerLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: reuseTheme.colors.preference.primaryText,

      },
      drawerItemStyle: {
        marginVertical: 0,
      },
      drawerActiveBackgroundColor: reuseTheme.colors.preference.primaryForeground,
      drawerActiveTintColor: reuseTheme.colors.preference.primaryText,


    }}

    drawerContent={props => <DrawerContentComponent {...props} />}>

    <Drawer.Screen
      name="HomeDrawer"
      component={BottomTabs}
    />

    <Drawer.Screen name="Home"
      component={BottomTabs}
    />

    <Drawer.Screen name="Support"
      component={SupportStack}
    />
    <Drawer.Screen name="PaymentStack"
      component={PaymentStack}
    />



    {/* add a section */}

  </Drawer.Navigator>)
    : (
      <Stack.Navigator
        initialRouteName="SwiperScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SwiperScreen" component={SwiperScreen} />
      </Stack.Navigator>
    )

}