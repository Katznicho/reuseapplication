import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { ReuseTheme } from '../../types/types';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { useFirebase } from '../../hooks/useFirebase';
import { limitDescription } from '../../utils/helpers/helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import NotAvailable from '../../components/NotAvailable';

const Pending = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const { reuseTheme } = useUserPreferredTheme();
    const styles = productStyles(reuseTheme);
    const { getPaymentsByUserIdAndStatus } = useFirebase();
    const navigation = useNavigation<any>();

    const [loading, setLoading] = useState<boolean>(false);
    const [payments, setPayments] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        getPaymentsByUserIdAndStatus(user.UID, "PENDING").then((userpayments) => {
            setPayments(userpayments)
        }).catch((error) => {
        })
        setLoading(false);
    })


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: reuseTheme.colors.preference.primaryBackground,
            }}
        >
            {
                payments.length > 0 ?
                    <FlatList
                        data={payments}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => (
                            <Pressable style={styles.container} key={index}
                                onPress={() => navigation.navigate('MyPaymentDetails', {
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
                    <View >
                        <NotAvailable
                            text={"You dont have any pending payments currently"}
                        />


                    </View>

            }

        </SafeAreaView>
    )
}

export default Pending

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