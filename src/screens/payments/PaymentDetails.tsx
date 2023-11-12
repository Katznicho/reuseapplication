import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
    Image,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { ReuseTheme } from '../../types/types';
import { convertFirebaseTimestampToReadableDate } from '../../utils/helpers/helpers';

const PaymentDetails = () => {
    const { item } = useRoute<any>().params;

    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = paymentStyles(reuseTheme);


    return (
        <SafeAreaView style={generalstyles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
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
                        {item?.productName}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: reuseTheme.colors.preference.primaryText,
                            padding: 2,
                        }}>
                        Payment Status
                    </Text>
                    <Text
                        style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                        {item?.status}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: reuseTheme.colors.preference.primaryText,
                            padding: 2,
                        }}>
                        Total Amount
                    </Text>
                    <Text
                        style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                        {item?.totalAmount}
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
                        {`${item?.owner?.firstName} ${item?.owner?.lastName}`}
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

                {/* paid on */}
                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: reuseTheme.colors.preference.primaryText,
                            padding: 2,
                        }}>
                        Paid On
                    </Text>
                    <Text
                        style={{ color: reuseTheme.colors.preference.grey6, padding: 5 }}>
                        {convertFirebaseTimestampToReadableDate(item.createdAt)}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>
                {/* paid on */}
                {/* card */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default PaymentDetails;

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
            // backgroundColor: theme.colors.preference.primaryBackground,
            // elevation: 10,
            // padding: 5,
            // borderRadius: 10,
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

        textStyle: {
            color: theme.colors.preference.primaryText
        }
    });
