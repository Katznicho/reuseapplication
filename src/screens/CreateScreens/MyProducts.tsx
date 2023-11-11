import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { ReuseTheme } from '../../types/types';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { useFirebase } from '../../hooks/useFirebase';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import NotAvailable from '../../components/NotAvailable';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

//https://wix.github.io/react-native-ui-lib/docs/components/overlays/FeatureHighlight
//tamagui

const MyProducts = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { getProductsByUserId } = useFirebase();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<any>();




  useEffect(() => {
    setLoading(true);
    getProductsByUserId(user.UID).then((userproducts) => {
      setProducts(userproducts)

    }).catch((error) => {
      console.log("An error occured")
    })
    setLoading(false);
  }, [user?.UID]);

  const { reuseTheme } = useUserPreferredTheme();
  const styles = productStyles(reuseTheme);


  if (loading) return <ActivityIndicator />

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: reuseTheme.colors.preference.primaryBackground,
      }}
    >


      {
        products.length ?
          <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
              <Pressable style={styles.container} key={index}>
                <View>
                  {/* icon */}
                  <Image
                    source={{
                      uri: item?.coverImage,
                    }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 10,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}
                >
                  {/* team name */}
                  <Text style={styles.date}>{item?.title}</Text>
                  <Text style={styles.status}>{item?.category}</Text>
                  <Text style={styles.date}>{item?.description}</Text>

                  {/* team name */}
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                  }}
                >
                  {/* amount details */}
                  <View>
                    <Text style={styles.status}>{item?.status}</Text>
                  </View>
                  {/* amoun details */}
                </View>
                <Pressable>
                  {/* add chevron icon */}
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={reuseTheme.colors.preference.primaryBackground}
                  />
                  {/* icon */}
                </Pressable>
              </Pressable>
            )}
          />

          :
          <View >
            <NotAvailable
              text={"You dont have any products currenlty"}
            />
            <View>
              <Button
                mode="contained"

                //loading={true}
                buttonColor={reuseTheme.colors.preference.primaryForeground}
                textColor={reuseTheme.colors.preference.primaryText}
                onPress={() => navigation.navigate('CreateProducts')}
              >
                Create Products
              </Button>
            </View>

          </View>

      }


    </SafeAreaView>
  );
};

export default MyProducts;

const productStyles = (theme: ReuseTheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.preference.primaryText,
    borderRadius: 8,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },

  date: {
    fontSize: 16,
    color: theme.colors.preference.primaryBackground,
    marginVertical: 2,
  },
  status: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 2,
  },
});
