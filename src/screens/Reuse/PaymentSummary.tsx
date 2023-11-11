/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { useFirebase } from '../../hooks/useFirebase';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RedirectParams, ReuseTheme } from '../../types/types';
import { Button } from 'react-native-paper';
import { Dialog, PanningProvider } from 'react-native-ui-lib';
import { PAYMENT_STATUS } from '../../utils/constants/constants';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { FLUTTER_WAVE_MERCHANT_KEY } from '@env';
import { generateTransactionRef } from '../../utils/helpers/helpers';
import { showMessage } from 'react-native-flash-message';



const PaymentSummary = () => {

    const { updateProductPaymentStatus, storePaymentDetails,updatePaymentStatus } = useFirebase();
    const navigation = useNavigation<any>();

    const handleOnRedirect = async (data: RedirectParams) => {
        console.log("=======================")
        console.log(data);
        console.log("=======================")

        if(data.status === 'successful'){
            //console.log("Payment Successful");

             await updatePaymentStatus(data.tx_ref, PAYMENT_STATUS.COMPLETED);
        }
        else{
            //console.log("Payment Cancelled");
            await updatePaymentStatus(data.tx_ref, PAYMENT_STATUS.COMPLETED);
        }
        await updateProductPaymentStatus(params.item.id, PAYMENT_STATUS.COMPLETED);

        showMessage({
            message: "Payment Successful",
            type: "success"

        })
        navigation.navigate("PaymentStack");
    };


    //flutter wave code
    //flutter wave code

    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = paymentStyles(reuseTheme);
    // const [ownerDetails, setOwnerDetails] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<string>('card');

     const [transactionRef, setTransactionRef] = useState<string>(""); 

    const handlePaymentMethodSelection = (method: React.SetStateAction<string>) => {
        setSelectedPaymentMethod(method);
    };

    const [isVisible, setIsVisible] = useState<boolean>(false);




    const { params } = useRoute<any>();

    useEffect(() => {
        setTransactionRef(generateTransactionRef(10));
    },[])




    const handlePayment = async () => {
      
        try {
            if(!transactionRef) return;
            else{
                setLoading(true);
                        //update product payment status
           await updateProductPaymentStatus(params.item.id, PAYMENT_STATUS.PENDING);
   
           const paymentDeails = {
               productName: params.item?.title,
               totalAmount: params.item?.totalAmount,
               status: PAYMENT_STATUS.PENDING,
               paymentMethod: selectedPaymentMethod,
               userId: params.item?.userId,
               paidTo: "Reuse Team",
               owner:params?.ownerDetails,
               transactionRef: transactionRef
           }
   
           await storePaymentDetails(paymentDeails, transactionRef);
   
           setIsVisible(true);
            }
            
        } catch (error) {
            console.log(error);
        }
         
    };

    return (
        <SafeAreaView style={generalstyles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {/* payment methods */}
                <Dialog
                    visible={isVisible}
                    onDismiss={() => setIsVisible(false)}
                    panDirection={PanningProvider.Directions.DOWN}
                    containerStyle={{
                        backgroundColor: reuseTheme.colors.preference.secondaryBackground,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10
                    }}
                    height={500}>
                    <View>
                        <Text>Select Payment Method</Text>
                    </View>
                    <View style={[styles.paymenthMethod]}>
                        <TouchableOpacity
                            onPress={() => {
                                handlePaymentMethodSelection('mobilemoneyuganda');
                            }}
                            style={[
                                styles.choosePayment,
                                {
                                    backgroundColor:
                                        selectedPaymentMethod === 'mobilemoneyuganda'
                                            ? reuseTheme.colors.preference.primaryForeground
                                            : reuseTheme.colors.preference.grey3,
                                },
                            ]}>
                            <Text style={[styles.textStyle]}>Mobile Money</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                handlePaymentMethodSelection('card');
                            }}
                            style={[
                                styles.choosePayment,
                                {
                                    backgroundColor:
                                        selectedPaymentMethod === 'card'
                                            ? reuseTheme.colors.preference.primaryForeground
                                            : reuseTheme.colors.preference.grey3,
                                },
                            ]}
                        >
                            <Text style={[styles.textStyle]}>Card Payment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                handlePaymentMethodSelection('ussd');
                            }}
                            style={[
                                styles.choosePayment,
                                {
                                    backgroundColor:
                                        selectedPaymentMethod === 'ussd'
                                            ? reuseTheme.colors.preference.primaryForeground
                                            : reuseTheme.colors.preference.grey3,
                                },
                            ]}
                        >
                            <Text style={[styles.textStyle]}>Card Payment</Text>
                        </TouchableOpacity>
                    </View>

                    {/* payment buttons */}
                    <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center" }]}>
                        <View>
                            <Button
                                mode="contained"
                                contentStyle={{
                                    flexDirection: 'row-reverse',
                                }}
                                style={{
                                    marginHorizontal: 40,
                                    marginVertical: 20,
                                }}
                                //loading={true}
                                buttonColor={reuseTheme.colors.preference.red}
                                textColor={reuseTheme.colors.preference.primaryText}
                                // onPress={() => navigation.navigate('PaymentSummary', { item: params.item })}
                                onPress={() => setIsVisible(false)}>
                                Cancel
                            </Button>
                        </View>
                        <View>


                            <PayWithFlutterwave
                                currency="UGX"
                                onRedirect={handleOnRedirect}
                                options={{
                                    tx_ref:transactionRef?? generateTransactionRef(10),
                                    authorization:FLUTTER_WAVE_MERCHANT_KEY,
                                    customer: {
                                        email:params?.ownerDetails?.email,
                                        name:`${params?.ownerDetails?.firstName} ${params?.ownerDetails?.lastName}`,
                                        phonenumber:params?.ownerDetails?.phoneNumber
                                        
                                    },
                                    amount:parseInt(params.item?.totalAmount),
                                    payment_options:selectedPaymentMethod,
                                    customizations: {
                                        title: 'Reuse App Payments',
                                        description: `Payment for ${params.item?.title}  `,
                                        logo: 'https://reuse-f0081.web.app/static/media/reuse.b7e1ca16.png',
                                    }
                                }}
                            
                                customButton={(props) => (
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
                                    disabled={selectedPaymentMethod === '' || props.disabled}
                                    buttonColor={reuseTheme.colors.preference.primaryForeground}
                                    textColor={reuseTheme.colors.preference.primaryBackground}
                                    // onPress={() => navigation.navigate('PaymentSummary', { item: params.item })}
                                    onPress={props.onPress}>
                                      pay
                                </Button>
                                )}
                            />
                        </View>
                    </View>
                    {/* payment buttons */}
                </Dialog>
                {/* payment methods */}
                <View
                    style={[
                        // generalstyles.centerContent,

                        styles.description,
                        {
                            elevation: 20,
                            marginHorizontal: 10,
                            borderRadius: 20,
                            marginVertical: 20,
                            padding: 10,
                            backgroundColor: reuseTheme.colors.preference.secondaryBackground,
                        },
                    ]}>
                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: reuseTheme.colors.preference.primaryText,
                                padding: 2,
                            }}>
                            Product Name
                        </Text>
                        <Text
                            style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                            {params.item?.title}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: reuseTheme.colors.preference.primaryText,
                                padding: 2,
                            }}>
                            Product Status
                        </Text>
                        <Text
                            style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                            {params.item?.status}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: reuseTheme.colors.preference.primaryText,
                                padding: 2,
                            }}>
                            Total Price
                        </Text>
                        <Text
                            style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                            {params.item?.totalAmount}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: reuseTheme.colors.preference.primaryText,
                                padding: 2,
                            }}>
                            Paid By
                        </Text>
                        <Text
                            style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                            {`${params?.ownerDetails?.firstName} ${params?.ownerDetails?.lastName}`}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    {/* paid to */}
                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: reuseTheme.colors.preference.primaryText,
                                padding: 2,
                            }}>
                            Paid To
                        </Text>
                        <Text
                            style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                            Reuse Team
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>
                    {/* paid to */}

                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: reuseTheme.colors.preference.primaryText,
                                padding: 2,
                            }}>
                            Description
                        </Text>
                        <Text
                            style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                            {params.item?.description}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: reuseTheme.colors.preference.primaryText,
                                padding: 2,
                            }}>
                            Reason
                        </Text>
                        <Text
                            style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                            {params.item?.reason}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <Button
                            mode="contained"
                            contentStyle={{
                                flexDirection: 'row-reverse',
                            }}
                            style={{
                                marginHorizontal: 40,
                                marginVertical: 20,
                            }}
                             loading={loading}
                             disabled={loading}
                            buttonColor={reuseTheme.colors.preference.primaryForeground}
                            textColor={reuseTheme.colors.preference.primaryBackground}
                            // onPress={() => navigation.navigate('PaymentSummary', { item: params.item })}
                            onPress={handlePayment}>
                            Confirm Payment
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PaymentSummary;

const paymentStyles = (theme: ReuseTheme) =>
    StyleSheet.create({
        nameStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: theme.colors.preference.primaryText,
            marginLeft: 20,
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
            marginVertical: 5,
        },
        cardViewStyles: {
            marginVertical: 10,
            padding: 5,
        },
        paymenthMethod: {
            // backgroundColor: theme.colors.preference.primaryBackground,
            elevation: 10,
            borderRadius: 10,
        },
        choosePayment: {
            // backgroundColor: theme.colors.preference.secondaryBackground,
            // elevation: 10,
            borderRadius: 10,
            padding: 25,
            marginHorizontal: 20,
            marginVertical: 10,
        },
        textStyle: {
            color: theme.colors.preference.primaryText
        }
    });
