import { Alert, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Caption, Drawer } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { drawerContentStyles } from './drawercontentstyles';
import { RootState } from '../../redux/store/dev';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import Verification from '../Verification';
import { useFirebase } from '../../hooks/useFirebase';
import HeadProfileCard from '../HeadProfileCard';
import Share from 'react-native-share';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

/**
 * Renders the content component for the drawer.
 *
 * @param {any} props - The props object.
 * @return {void}
 */
const DrawerContentComponent = ({ props }: any) => {


  const { logout, getAllCommunities } = useFirebase();
  const navigation = useNavigation<any>();

  const { user } = useSelector((state: RootState) => state.user);
  const [communities, setCommunities] = useState<any[]>([]);

  useEffect(() => {
    getAllCommunities()
      .then((res) => {
        let communities: any = [];
        res.forEach((item: any) => {
          communities.push({
            label: item.communityName,
            value: item.id
          })
        })
        setCommunities(communities);
      }).catch((err) => {

      })
  })




  const { reuseTheme } = useUserPreferredTheme();
  const styles = drawerContentStyles(reuseTheme);
  const generalstyles = dynamicGeneralStyles(reuseTheme);

  const handleSignOut = async () => {
    try {

      // Handle any additional actions after the user is signed out
      await logout();

    } catch (error) {
    }
  };

  const handleShareApp = async () => {

    try {
      const result = await Share.open({
        title: 'Install Reuse App',
        message: 'Check out Reuse App and install it',
        url: 'https://play.google.com/apps/internaltest/4699919634175995763',
      });
      console.log(result);
    } catch (error) {

    }
  }




  const onSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        {
          text: 'OK',
          onPress: () => handleSignOut(),
        },
      ],
      { cancelable: false },
    );
  };

  const [selectedItem, setSelectedItem] = useState<string>('Home')

  return (<View style={[generalstyles.container]}>
    <DrawerContentScrollView
      {...props}
      //  style={[generalstyles.container]}
      style={{
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
        width: 290,

      }}
      scrollEnabled={true}

    >
      <View style={[styles.userInfoSection, generalstyles.centerContent]}>
        <View style={[generalstyles.centerContent]}>
          <HeadProfileCard />
          <View style={[generalstyles.flexStyles]}>


            <Verification
              isVerified={true}
              style={{
                marginRight: 20,
              }}
              size={18}
            />

            <Caption style={styles.caption}>{user.username}</Caption>
          </View>
        </View>
        {/*some info */}
        {/*some info */}
      </View>

      {/*drawer items */}
      <Drawer.Section style={[styles.drawerSection]}>

        {/* home */}
        <Drawer.Item
          label="Home"
          icon={({ color, size }: any) => (
            <AntDesign
              name="home"
              size={size}
              color={color}
            />
          )}
          active={selectedItem === 'Home'}
          onPress={() => {
            setSelectedItem('Home')
            navigation.navigate('Home')
          }}



        />
        {/* home */}

        {/* payments */}
        <Drawer.Item
          label="Payments"
          active={selectedItem === 'Payments'}
          onPress={() => {

            setSelectedItem('Payments')
            navigation.navigate('PaymentStack')
          }}
          icon={({ color, size }: any) => (
            <AntDesign
              name="creditcard"
              size={size}
              color={color}
            />
          )}
        />
        {/* payments */}

        {/* chats */}
        <Drawer.Item
          label="Chats"
          active={selectedItem === 'Chats'}
          onPress={() => {
            setSelectedItem('Chats')
            navigation.navigate('Home')
          }}
          icon={({ color, size }: any) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              size={size}
              color={color}
            />
          )}

        />
        {/* chats */}

        {/* market place */}
        <Drawer.Item
          label="Market Place"
          active={selectedItem === 'Market Place'}
          onPress={() => {
            setSelectedItem('Market Place')
            navigation.navigate('Home')
          }}
          icon={({ color, size }: any) => (
            <AntDesign
              name="shoppingcart"
              size={size}
              color={color}
            />
          )}

        />
        {/* market place*/}


        <Drawer.Item
          label="Support"
          active={selectedItem === 'Support'}
          onPress={() => {
            setSelectedItem('Support')
            navigation.navigate('Support')
          }}
          icon={({ color, size }: any) => (
            <AntDesign
              name="customerservice"
              size={size}
              color={color}
            />
          )}

        />
        <Drawer.Item
          label="Invite People"

          active={selectedItem === 'Invite People'}
          onPress={() => {
            setSelectedItem('Invite People')
            handleShareApp()
          }}

          icon={({ color, size }: any) => (
            <AntDesign name="sharealt" size={size} color={color} />
          )}

        />
      </Drawer.Section>

      {/* add drawer section with title communities */}
      <Drawer.Section
        style={[styles.drawerSection]}
        title="Communities"

      >

        {
          communities?.slice(0, 5).map((item) => (
            <Drawer.Item
              key={item.value}
              label={item.label}
              icon={({ color, size }: any) => (
                <FontAwesome6
                  name="people-group"
                  size={size}
                  color={color}
                />
              )}
            />
          ))
        }

      </Drawer.Section>

      <Drawer.Section >
        <Drawer.Item
          label="Sign Out"
          onPress={onSignOut}
          icon={({ color, size }: any) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              size={size}
              color={color}
            />
          )}

        />
      </Drawer.Section>

    </DrawerContentScrollView>

  </View>
  )
}

export default DrawerContentComponent

