import { View, SafeAreaView, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import SearchComponent from '../../components/SearcComponent';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import TextTypes from '../../components/TextType/TextTypes';
import ScrollCard from '../../components/ScrollCard';
import Donaters from '../../components/Donators';
import Categories from '../../components/Categoris';
import Geolocation from '@react-native-community/geolocation';
import { useFirebase } from '../../hooks/useFirebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import messaging from '@react-native-firebase/messaging';



const HomeScreeen = () => {

  const { reuseTheme } = useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);
  const { user } = useSelector((state: RootState) => state.user);


  const { updateUserLocation, updateUserDeviceId } = useFirebase();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { getAllProducts } = useFirebase();



  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {

        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true, }
    );
  };



  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {

      const fcmToken = await messaging().getToken();

      updateUserDeviceId(user?.UID, fcmToken)

    }
    else {

    }
  }


  useEffect(() => {
    setLoading(true);
    getAllProducts().then((products) => {
      setProducts(products);
    })
    setLoading(false);
    getCurrentPosition();
    if (position) {
      updateUserLocation(user?.UID, position.latitude, position.longitude);
    }

    requestUserPermission();




  }, []);

  const [position, setPosition] = useState<any>(null);






  const [searchQuery, setSearchQuery] = useState('');
  return (
    <SafeAreaView style={generalstyles.container}>

      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: 100 }}>
        {/* search component */}
        <View style={[generalstyles.centerContent]}>
          <SearchComponent
            placeholder="search for properties"
            value={searchQuery}
            searchStyles={{
              elevation: 4,
              borderRadius: 25,
              marginTop: 15,
              marginBottom: 5,
              height: 55,
              backgroundColor: reuseTheme.colors.preference.primaryBackground,
              color: `${reuseTheme.colors.preference.primaryText}}`,
              width: '90%',
            }}
            onSearchChange={(query: any) => {

              setSearchQuery(query);
            }}
          />
        </View>
        {/* search component */}
        {/* categories */}
        <TextTypes text="Your Favourites" screen="AllProducts" />
        <Categories />
        {/* categories */}

        {/* most receommended */}
        <TextTypes text="Our Recommendations" screen="AllProducts" />
        {

          products.length ? <ScrollCard cardProducts={products} /> :
            <ActivityIndicator />
        }

        {/* most recommended */}

        {/* popular */}
        <TextTypes text="Most Popular" screen="AllProducts" />
        {

          products.length ? <ScrollCard cardProducts={products} /> :
            <ActivityIndicator />
        }
        {/* popular */}

        {/* nearby */}
        <TextTypes text="Near by You" screen="AllProducts" />
        {

          products.length ? <ScrollCard cardProducts={products} /> :
            <ActivityIndicator />
        }
        {/* nearby */}

        {/* nearby */}

        {/* nearby */}

        {/* top donaters */}
        <TextTypes text="Top Donaters" screen="AllDonaters" />
        <Donaters />
        {/* top donaters */}

      </ScrollView>


    </SafeAreaView>
  )
}

export default HomeScreeen

