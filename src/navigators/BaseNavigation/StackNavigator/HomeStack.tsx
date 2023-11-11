
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import HomeScreeen from '../../../screens/HomeScreens/HomeScreeen';
import { useUserPreferredTheme } from '../../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../../utils/generalstyles/dynamicGeneralStyles';
import AppBar from '../../../components/AppBars/AppBar';
import { APP_NAME } from '../../../utils/constants/constants';
import AllDonaters from '../../../screens/HomeScreens/AllDonaters';
import SearchAppBar from '../../../components/AppBars/SearchBar';
import DonaterDetails from '../../../screens/HomeScreens/DonaterDetails';
import ReviewStack from '../../../screens/HomeScreens/ReviewStack/ReviewStack';
import WriteReview from '../../../screens/HomeScreens/ReviewStack/WriteReview';
import ProductDetails from '../../../screens/HomeScreens/ProductDetails';
import AllProducts from '../../../screens/HomeScreens/AllProducts';




const Stack = createNativeStackNavigator();

function HomeStack() {

  const { reuseTheme } = useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);

  const navigation = useNavigation<any>();

  return (

    <Stack.Navigator
      initialRouteName="HomeSCreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: reuseTheme.colors.preference.primaryBackground,
        },
        headerTitleStyle: {
          fontSize: 30,
        },
        headerTintColor: reuseTheme.colors.preference.primaryText,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <IconButton
            icon="menu"
            iconColor={reuseTheme.colors.preference.primaryText}
            size={28}
            onPress={() => navigation.openDrawer()}
            containerColor={reuseTheme.colors.preference.primaryForeground}
          />
        ),
      }}

    >

      <Stack.Screen
        name="HomeSCreen"
        component={HomeScreeen}
        options={({ route }) => ({
          header: props => (
            <AppBar
              showSearch
              {...props}
              title={APP_NAME}
              barStyle={{
                width: '100%',
                elevation: 0,
              }}
              titleStyle={{
                alignSelf: 'center',
                color: `${reuseTheme.colors.preference.primaryText}`,
              }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="AllDonaters"
        component={AllDonaters}
        options={({ route }) => ({
          header: props => (
            <SearchAppBar
              {...props}
              placeholder={'search for donaters'}
              previous={true}
              searchStyles={{
                elevation: 4,
                borderRadius: 25,
                marginTop: 5,
                marginBottom: 10,
                marginLeft: -8,
                marginRight: 25,
                backgroundColor: reuseTheme.colors.preference.secondaryBackground,
                height: 50,
                color: `${reuseTheme.colors.preference.primaryText}`,
                width: "90%",
              }}
            />
          ),
        })}
      />

      {/* all products */}
      <Stack.Screen
        name="AllProducts"
        component={AllProducts}
        options={({ route }) => ({
          header: props => (
            <SearchAppBar
              {...props}
              placeholder={'search for products'}

              previous={true}
              searchStyles={{
                elevation: 4,
                borderRadius: 25,
                marginTop: 5,
                marginBottom: 10,
                marginLeft: -8,
                marginRight: 25,
                backgroundColor: reuseTheme.colors.preference.secondaryBackground,
                height: 50,
                color: `${reuseTheme.colors.preference.primaryText}`,
                width: "90%",
              }}
            />
          ),
        })}
      />
      {/* all products */}

      <Stack.Screen
        name="DonaterDetails"
        component={DonaterDetails}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Reviews"
        component={ReviewStack}
        options={{
          title: 'Reviews',
          headerStyle: {
            backgroundColor: reuseTheme.colors.preference.primaryBackground,
          },
          headerTitleStyle: {
            fontSize: 30,
          },
          headerTintColor: reuseTheme.colors.preference.primaryText,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              iconColor={reuseTheme.colors.preference.primaryText}
              size={28}
              onPress={() => navigation.goBack()}
              containerColor={reuseTheme.colors.preference.primaryForeground}
            />
          ),
        }}
      />

      {/* write a review */}
      <Stack.Screen
        name="WriteReview"
        component={WriteReview}
        options={{
          title: 'Write a Review',
          headerStyle: {
            backgroundColor: reuseTheme.colors.preference.primaryBackground,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTintColor: reuseTheme.colors.preference.primaryText,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <IconButton
              icon="chevron-left"
              iconColor={reuseTheme.colors.preference.primaryText}
              size={28}
              onPress={() => navigation.goBack()}
              containerColor={reuseTheme.colors.preference.primaryForeground}
            />
          ),
        }}
      />

      {/* write a review */}

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false
        }}
      />




    </Stack.Navigator>

  );
}

export default HomeStack