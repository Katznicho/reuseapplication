import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { ReuseTheme } from '../../types/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFirebase } from '../../hooks/useFirebase';
import { Avatar, Button, IconButton } from 'react-native-paper';
import { Switch } from 'react-native-ui-lib';
import { DEFAULT_USER_PROFILE, PAYMENT_STATUS, PRODUCT_STATUS } from '../../utils/constants/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MyProductDetails = () => {
    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = productStyles(reuseTheme);
    const { getUserByUid } = useFirebase();

    const [ownerDetails, setOwnerDetails] = useState<any>();


    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();

    useEffect(() => {
        // console.log(params.item?.estimatedPickUp?.details);
        if (params.item) {
            getUserByUid(params.item.userId).then((res) => {
                setOwnerDetails(res);

            })
        }

    }, [])


    return (
        <SafeAreaView style={generalstyles.container}>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {/* header section */}
                <ImageBackground
                    source={{ uri: params.item?.coverImage }}
                    style={{ width: '100%', height: 300 }}
                    resizeMode="cover"
                >
                    <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                        <IconButton
                            icon="chevron-left"
                            iconColor={reuseTheme.colors.preference.primaryText}
                            size={28}
                            onPress={() => navigation.goBack()}
                            containerColor={reuseTheme.colors.preference.primaryBackground}
                        />
                    </View>
                </ImageBackground>

                <View style={[generalstyles.flexStyles, { marginHorizontal: 10, marginVertical: 10, justifyContent: "space-between", alignItems: "center" }]}>
                    <View>
                        <View>
                            <Text
                                style={styles.title}
                            >
                                {params.item.title}
                            </Text>
                        </View>
                        <View style={[generalstyles.flexStyles, { marginHorizontal: 10 }]}>
                            {
                                Array(params.item.rating).fill(params.item.rating).map((item, index) => (
                                    <AntDesign
                                        name="star"
                                        color={reuseTheme.colors.preference.primaryForeground}
                                        size={15}
                                        key={index}
                                    />
                                ))
                            }
                        </View>

                    </View>

                    {/* owner details */}
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('DonaterDetails', { item: ownerDetails })
                        }
                    >
                        <View style={[{ marginHorizontal: 20 }]}>
                            <Avatar.Image
                                size={40}
                                source={{
                                    uri: ownerDetails?.photoURL || DEFAULT_USER_PROFILE,
                                }}
                            />
                        </View>
                        <View >
                            <Text style={styles.nameStyle}>{`${"Owner"}`}</Text>
                        </View>

                    </TouchableOpacity>
                    {/* owner details */}


                </View>
                {/* header section */}


                {/* description card */}
                <View
                    style={[
                        generalstyles.centerContent,
                        { marginHorizontal: 10, marginVertical: 20 },
                    ]}
                >
                    <View
                        style={styles.description}
                    >
                        <Text style={{ color: reuseTheme.colors.preference.primaryText, padding: 5 }}>
                            {params.item.description}

                        </Text>
                    </View>
                </View>
                {/* description card */}

                {/* more pictures */}
                <View>
                    <Text style={styles.title}>More Images</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            params.item.images?.map((item: any) => {

                                return (
                                    <TouchableOpacity
                                        key={item}
                                        style={styles.imageContainer}
                                    >
                                        <Image
                                            source={{ uri: item }}
                                            style={styles.image}
                                        />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                {/* more pictures */}


                {/* more product details */}
                <View
                    style={[
                        // generalstyles.centerContent,

                        styles.description,
                        { elevation: 20, marginHorizontal: 10, borderRadius: 20, marginVertical: 20, padding: 10, backgroundColor: reuseTheme.colors.preference.secondaryBackground },
                    ]}
                >
                    {/* reason */}
                    <View
                        style={[
                            generalstyles.centerContent,
                            { marginHorizontal: 10, marginVertical: 20 },
                        ]}
                    >
                        <View
                            style={styles.description}
                        >
                            <Text style={{ color: reuseTheme.colors.preference.primaryText, padding: 5 }}>
                                {params.item.reason}

                            </Text>
                        </View>
                    </View>
                    {/* reason */}
                    {/* staus */}
                    <View style={styles.cardViewStyles}>
                        <View style={[generalstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                            <Text style={{ color: reuseTheme.colors.preference.primaryText, padding: 2 }}>Status</Text>
                            <Text style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                                {params.item?.status}

                            </Text>

                        </View>

                        <View style={[styles.bottom]} />
                    </View>
                    {/* status */}

                    {/* price attached */}
                    <View style={styles.cardViewStyles}>
                        <View style={[generalstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                            <Text style={{ color: reuseTheme.colors.preference.primaryText, padding: 2 }}>Price Attached</Text>
                            <Text style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                                shs {params.item?.price}

                            </Text>

                        </View>

                        <View style={[styles.bottom]} />
                    </View>
                    {/* price attached */}

                    {/* total price */}
                    <View style={styles.cardViewStyles}>
                        <View style={[generalstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                            <Text style={{ color: reuseTheme.colors.preference.primaryText, padding: 2 }}>Total Amount</Text>
                            <Text style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                                {params.item?.totalAmount}

                            </Text>

                        </View>

                        <View style={[styles.bottom]} />
                    </View>
                    {/* total price */}


                    <View style={styles.cardViewStyles}>
                        <View style={[generalstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                            <Text style={{ color: reuseTheme.colors.preference.primaryText, padding: 2 }}>Location</Text>
                            <Text style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                                {params.item?.estimatedPickUp}

                            </Text>

                        </View>

                        <View style={[styles.bottom]} />
                    </View>

                    {/* estimated weight */}
                    <View style={styles.cardViewStyles}>
                        <View style={[generalstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                            <Text style={{ color: reuseTheme.colors.preference.primaryText, padding: 2 }}>Estimated Weight(Kgs)</Text>
                            <Text style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                                {params.item?.estimatedWeight}

                            </Text>

                        </View>

                        <View style={[styles.bottom]} />
                    </View>
                    {/* estimated weight */}

                    <View style={styles.cardViewStyles}>
                        <View style={[generalstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                            <Text style={{ color: reuseTheme.colors.preference.primaryText, padding: 2 }}>Available For Free</Text>
                            <Switch
                                width={80}
                                height={38}
                                thumbSize={34}
                                thumbColor={reuseTheme.colors.preference.primaryBackground}
                                value={params.item.isFree}
                                onColor={reuseTheme.colors.preference.primaryForeground}
                            />

                        </View>

                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <View style={[generalstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                            <Text style={{ color: reuseTheme.colors.preference.primaryText, padding: 2 }}>Delivery Fee Included</Text>
                            <Switch
                                width={80}
                                height={38}
                                thumbSize={34}
                                thumbColor={reuseTheme.colors.preference.primaryBackground}
                                value={params.item.isDeliveryFeeCovered}
                                onColor={reuseTheme.colors.preference.primaryForeground}
                            />

                        </View>

                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <View style={[generalstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                            <Text style={{ color: reuseTheme.colors.preference.primaryText, padding: 2 }}>Product Is New</Text>
                            <Switch
                                width={80}
                                height={38}
                                thumbSize={34}
                                thumbColor={reuseTheme.colors.preference.primaryBackground}
                                value={params.item.isProductNew}
                                onColor={reuseTheme.colors.preference.primaryForeground}
                            />

                        </View>

                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <View style={[generalstyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                            <Text style={{ color: reuseTheme.colors.preference.primaryText, padding: 2 }}>Product Has Damages</Text>
                            <Switch
                                width={80}
                                height={38}
                                thumbSize={34}
                                thumbColor={reuseTheme.colors.preference.primaryBackground}
                                value={params.item.isProductDamaged}
                                onColor={reuseTheme.colors.preference.primaryForeground}
                            />

                        </View>

                        <View style={[styles.bottom]} />
                    </View>


                </View>
                {/* more product details */}





                {
                    params.item.status == PRODUCT_STATUS.ACCEPTED &&
                    <View style={[generalstyles.absoluteStyles, { bottom: 10, right: 10 }]}>
                        <Button
                            mode="contained"
                            contentStyle={{
                                flexDirection: 'row-reverse',
                            }}
                            style={{
                                marginHorizontal: 40,
                                marginVertical: 20,
                            }}
                            //  loading={true}
                            buttonColor={reuseTheme.colors.preference.primaryForeground}
                            textColor={reuseTheme.colors.preference.primaryBackground}
                            onPress={() => navigation.navigate('PaymentSummary', { 
                                item: params.item ,
                                ownerDetails: ownerDetails
                            })}
                        >
                            Make Payment
                        </Button>
                    </View>



                }



            </ScrollView>
        </SafeAreaView>
    )
}

export default MyProductDetails

const productStyles = (theme: ReuseTheme) => StyleSheet.create({
    nameStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: theme.colors.preference.primaryText,
        marginLeft: 20
    },
    imageContainer: {
        marginHorizontal: 5,
        marginVertical: 5,
        width: theme.dimensions.width * 0.6,
        height: theme.dimensions.width * 0.6,
    },
    image: {
        width: theme.dimensions.width * 0.6,
        height: theme.dimensions.width * 0.6,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: theme.colors.preference.primaryText,
    },
    description: {
        backgroundColor: theme.colors.preference.primaryBackground,
        elevation: 10,
        padding: 5,
        borderRadius: 10,
    },
    bottom: {
        borderBottomColor: theme.colors.preference.primaryText,
        borderBottomWidth: 0.5,
        marginVertical: 5
    },
    cardViewStyles:
    {
        marginVertical: 10, padding: 5
    }
});