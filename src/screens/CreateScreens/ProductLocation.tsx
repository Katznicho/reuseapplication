import { KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import { ReuseTheme } from '../../types/types';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { Button } from 'react-native-paper';
import { TextField } from 'react-native-ui-lib';

const ProductLocation = ({ setProductDetails, goBack, loading, createProduct }: any) => {

    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = productStyles(reuseTheme);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                marginVertical: 10,
                marginHorizontal: 5
            }}
            keyboardShouldPersistTaps="always"
        >

            <View >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={generalstyles.container}
                >
                    <View>
                        {/* user location */}
                        <TextField
                            style={styles.fieldStyles}
                            placeholder={'enter product location'}
                            hint={"enter product location"}
                            labelStyle={{
                                marginHorizontal: 10
                            }}
                            label='Product Location'
                            labelColor={reuseTheme.colors.preference.primaryText}
                            placeholderTextColor={reuseTheme.colors.preference.grey3}
                            color={reuseTheme.colors.preference.primaryText}

                            onChangeText={text =>
                                setProductDetails((prev: any) => {
                                    return { ...prev, estimatedPickUp: text }
                                })

                            }
                            enableErrors
                            validate={['required']}
                            validationMessage={['Product location is required']}
                            showCharCounter
                            maxLength={30}
                        />


                        <View style={styles.buttonStyles}>

                            <Button
                                icon={{ source: 'play', direction: 'rtl' }}
                                mode="contained"
                                style={styles.buttonSpaceStyles}
                                buttonColor={reuseTheme.colors.preference.primaryForeground}
                                textColor={reuseTheme.colors.preference.primaryText}
                                onPress={goBack}
                            >

                                Prev
                            </Button>

                            {/* button */}
                            <Button
                                icon={{ source: 'play', direction: 'ltr' }}
                                mode="contained"
                                contentStyle={{
                                    flexDirection: 'row-reverse',
                                }}
                                buttonColor={reuseTheme.colors.preference.primaryForeground}
                                textColor={reuseTheme.colors.preference.primaryText}
                                onPress={createProduct}
                                disabled={loading}


                            >

                                {loading ? "Creating ..." : "Create Product"}
                            </Button>
                            {/* button */}

                        </View>



                    </View>

                </KeyboardAvoidingView>
            </View>

        </ScrollView>
    )
}

export default ProductLocation

const productStyles = (theme: ReuseTheme) => StyleSheet.create({

    buttonStyles: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 20
    },
    buttonSpaceStyles: {
        marginHorizontal: 10
    },

    fieldStyles: {
        borderBottomColor: theme.colors.preference.primaryText,
        borderBottomWidth: 2,
        // height: 45
    },

})