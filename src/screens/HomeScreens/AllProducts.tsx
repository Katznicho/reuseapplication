import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Pressable,
    Image,
} from 'react-native';
import React, { useState, useEffect } from 'react'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { useFirebase } from '../../hooks/useFirebase';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { ReuseTheme } from '../../types/types';
import { Button } from 'react-native-paper';
import NotAvailable from '../../components/NotAvailable';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AllProducts = () => {

    const { reuseTheme } = useUserPreferredTheme();

    const styles = productStyles(reuseTheme);
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const { getAllProducts } = useFirebase();
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {

        // setLoading(true);
        getAllProducts().then((res) => {
            setProducts(res);
        }).catch((err) => {
            // setLoading(false);
        })
    })

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
                            <Pressable style={styles.container} key={index}
                                onPress={() => navigation.navigate('ProductDetails', { item: item })}
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
                                        color={reuseTheme.colors.preference.primaryText}
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


                    </View>

            }


        </SafeAreaView>
    )
}

export default AllProducts

const productStyles = (theme: ReuseTheme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.preference.secondaryBackground,
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
        color: theme.colors.preference.primaryText,
        marginVertical: 2,
    },
    status: {
        fontSize: 12,
        color: 'gray',
        marginVertical: 2,
    },
});