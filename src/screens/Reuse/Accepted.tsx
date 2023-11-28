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
import { limitDescription } from '../../utils/helpers/helpers';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';

//https://wix.github.io/react-native-ui-lib/docs/components/overlays/FeatureHighlight
//tamagui

const Accepted = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const { getProductsByUserIdAndStatus } = useFirebase();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);



    const navigation = useNavigation<any>();




    useEffect(() => {
        setLoading(true);
        getProductsByUserIdAndStatus(user.UID, "ACCEPTED").then((userproducts) => {
            setProducts(userproducts)
        }).catch((error) => {
        })
        setLoading(false);
    }, [user?.UID]);

    const { reuseTheme } = useUserPreferredTheme();
    const styles = productStyles(reuseTheme);
    const generalstyles = dynamicGeneralStyles(reuseTheme);

    if (loading) return <SafeAreaView style={{ flex: 1, backgroundColor: reuseTheme.colors.preference.primaryBackground }}>
        <ActivityIndicator />
    </SafeAreaView>

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
                            <Pressable
                                style={styles.container} key={index}
                                onPress={() => navigation.navigate('MyProductDetails', {
                                    item
                                })}
                            >
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

                                    <Text style={styles.date}>{item?.title}</Text>
                                    <Text style={styles.status}>{item?.estimatedPickUp}</Text>
                                    <Text style={styles.date}>{limitDescription(item?.description, 15)}</Text>


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
                    <View style={[generalstyles.centerContent]}>
                        <NotAvailable
                            text={"You dont have any products currenlty"}
                            containerStyles={{
                                marginHorizontal: 10,
                                marginVertical: 10,
                            }}
                        />
                        <View>
                            <Button
                                mode="contained"

                                //loading={true}
                                buttonColor={reuseTheme.colors.preference.primaryForeground}
                                textColor={reuseTheme.colors.preference.primaryText}
                                onPress={() => navigation.navigate('Create')}
                            >
                                Create Products
                            </Button>
                        </View>

                    </View>

            }


        </SafeAreaView>
    );
};

export default Accepted;

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
        fontSize: 12,
        color: theme.colors.preference.primaryBackground,
        marginVertical: 2,
    },
    status: {
        fontSize: 12,
        color: 'gray',
        marginVertical: 2,
    },
});
