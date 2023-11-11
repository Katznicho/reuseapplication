import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { TextField, Picker, Switch, DateTimePicker, NumberInput, NumberInputData } from 'react-native-ui-lib';
import { ReuseTheme } from '../../types/types';
import TextArea from '../../components/TextArea';
import { Button } from 'react-native-paper';

const ProductDetails = ({ productDetials, setProductDetails, categories, communities, goBack, goToNextStep }: any) => {

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

            <View
                style={styles.viewStyles}
            >
                <TextField
                    style={styles.fieldStyles}
                    placeholder={'enter product name'}
                    hint={"enter product name"}
                    labelStyle={{
                        marginHorizontal: 10
                    }}
                    label='Product Name'
                    labelColor={reuseTheme.colors.preference.primaryText}
                    placeholderTextColor={reuseTheme.colors.preference.grey3}
                    color={reuseTheme.colors.preference.primaryText}

                    onChangeText={text =>
                        setProductDetails((prev: any) => {
                            return { ...prev, title: text }
                        })

                    }
                    enableErrors
                    validate={['required']}
                    validationMessage={['Product name is required']}
                    showCharCounter
                    maxLength={30}
                />

            </View>


            {/* category */}
            <View
                style={styles.viewStyles}
            >
                <Picker
                    style={styles.fieldStyles}
                    placeholder=" enter product category"
                    // floatingPlaceholder
                    label='Product Category'
                    labelColor={reuseTheme.colors.preference.primaryText}
                    placeholderTextColor={reuseTheme.colors.preference.grey3}
                    value={productDetials.category}
                    enableModalBlur={false}
                    onChange={item => {
                        setProductDetails((prev: any) => {
                            return { ...prev, category: item }
                        })

                    }}
                    color={reuseTheme.colors.preference.primaryText}
                    topBarProps={{ title: 'Product Categories' }}

                    showSearch
                    searchPlaceholder={'Search a product category'}
                    searchStyle={{ color: reuseTheme.colors.preference.primaryForeground, placeholderTextColor: reuseTheme.colors.preference.grey3 }}
                // onSearchChange={value => console.warn('value', value)}
                >
                    {categories.map((item: any) => (
                        <Picker.Item key={item.value}
                            value={item.value}
                            label={item.label}
                        />
                    ))}
                </Picker>
            </View>
            {/* category */}

            {/* switches  */}

            {/* free product */}
            <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>

                <Switch
                    width={80}
                    height={45}
                    thumbSize={30}
                    thumbColor={reuseTheme.colors.preference.primaryBackground}
                    value={productDetials.isFree}
                    onValueChange={
                        () => {
                            setProductDetails((prev: { isFree: any; }) => {
                                return { ...prev, isFree: !prev.isFree }
                            })
                        }
                    }
                    onColor={reuseTheme.colors.preference.primaryForeground}

                />
                <Text style={{ marginHorizontal: 10 }}>Is Product free of Charge  ?</Text>
            </View>

            {/* free product */}

            {
                !productDetials.isFree && (<View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>

                    <Switch
                        width={80}
                        height={45}
                        thumbSize={30}
                        thumbColor={reuseTheme.colors.preference.primaryBackground}
                        value={productDetials.isDeliveryFeeCovered}
                        onValueChange={
                            () => {
                                setProductDetails((prev: { isDeliveryFeeCovered: any; }) => {
                                    return { ...prev, isDeliveryFeeCovered: !prev.isDeliveryFeeCovered }
                                })
                            }
                        }
                        onColor={reuseTheme.colors.preference.primaryForeground}
                    />
                    <Text style={{ marginHorizontal: 10 }}>Is  Delivery Fee  Covered    ?</Text>
                </View>)
            }


            {/* for all */}
            <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
                <Switch
                    width={80}
                    height={45}
                    thumbSize={30}
                    thumbColor={reuseTheme.colors.preference.primaryBackground}
                    value={productDetials.isProductAvailableForAll}
                    onValueChange={
                        () => {
                            setProductDetails((prev: { isProductAvailableForAll: any; }) => {
                                return { ...prev, isProductAvailableForAll: !prev.isProductAvailableForAll }
                            })
                        }
                    }
                    onColor={reuseTheme.colors.preference.primaryForeground}
                />
                <Text style={{ marginHorizontal: 10 }}>Is Product Available For All ?</Text>
            </View>
            {/* for all */}

            {/* product new */}
            <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
                <Switch
                    width={80}
                    height={45}
                    thumbSize={30}
                    thumbColor={reuseTheme.colors.preference.primaryBackground}
                    value={productDetials.isProductNew}
                    onValueChange={
                        () => {
                            setProductDetails((prev: { isProductNew: any; }) => {
                                return { ...prev, isProductNew: !prev.isProductNew }
                            })
                        }
                    }
                    onColor={reuseTheme.colors.preference.primaryForeground}
                />
                <Text style={{ marginHorizontal: 10 }}>Is the Created Product New ?</Text>
            </View>
            {/* product new */}

            {/* damages */}
            <View style={[generalstyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
                <Switch
                    width={80}
                    height={45}
                    thumbSize={30}
                    thumbColor={reuseTheme.colors.preference.primaryBackground}
                    value={productDetials.isProductDamaged}
                    onValueChange={
                        () => {
                            setProductDetails((prev: { isProductDamaged: any; }) => {
                                return { ...prev, isProductDamaged: !prev.isProductDamaged }
                            })
                        }
                    }
                    onColor={reuseTheme.colors.preference.primaryForeground}
                />
                <Text style={{ marginHorizontal: 10 }}> Product has any damages ?</Text>
            </View>
            {/* damages */}

            {/* switches */}

            <View>
                {
                    productDetials.isProductDamaged && (
                        <TextArea
                            placeholder="Tell us about the damage"
                            text={productDetials.damageDescription}
                            setText={(text: any) => {
                                setProductDetails((prev: any) => {
                                    return { ...prev, damageDescription: text }
                                })
                            }
                            }
                        />
                    )

                }
            </View>

            {/* product price  */}
            {
                !productDetials.isFree && (
                    <View style={styles.viewStyles}>
                        <NumberInput

                            leadingText={"shs"}
                            leadingTextStyle={{
                                fontSize: 30,
                                color: reuseTheme.colors.preference.primaryText,
                                marginRight: 10

                            }}
                            textFieldProps={{
                                label: "Price",
                                labelColor: reuseTheme.colors.preference.primaryText,
                                //style: styles.fieldStyles,
                                color: reuseTheme.colors.preference.primaryText


                            }}
                            // fractionDigits={2}
                            // initialNumber={productDetials.price}
                            onChangeNumber={(data: NumberInputData) => {
                                setProductDetails((prev: any) => {
                                    return { ...prev, price: data }
                                })

                            }}
                            containerStyle={styles.fieldStyles}

                        />

                    </View>
                )
            }
            {/* product price */}

            {/* community */}
            {
                !productDetials.isProductAvailableForAll && (<View
                    style={styles.viewStyles}
                >
                    <Picker
                        style={styles.fieldStyles}
                        placeholder="enter community "
                        // floatingPlaceholder
                        label='Community'
                        labelColor={reuseTheme.colors.preference.primaryText}

                        placeholderTextColor={reuseTheme.colors.preference.grey3}
                        value={productDetials.receiverCommunity}
                        enableModalBlur={false}
                        onChange={item => {
                            setProductDetails((prev: any) => {
                                return { ...prev, receiverCommunity: item }
                            })
                        }}
                        color={reuseTheme.colors.preference.primaryText}
                        topBarProps={{ title: 'Available Communities' }}

                        showSearch
                        searchPlaceholder={'Search for a community'}
                        searchStyle={{ color: reuseTheme.colors.preference.primaryForeground, placeholderTextColor: reuseTheme.colors.preference.grey3 }}

                    >
                        {communities.map((item: any) => (
                            <Picker.Item key={item.value}
                                value={item.value}
                                label={item.label}
                            //   disabled={option.disabled}
                            />
                        ))}
                    </Picker>
                </View>)

            }


            {/* community */}

            {/* estimated weight */}
            <View
                style={styles.viewStyles}
            >
                <TextField
                    style={styles.fieldStyles}
                    placeholder={'enter estimated weight in(kgs)'}
                    hint={"enter estimated  weight"}
                    labelStyle={{
                        marginHorizontal: 10
                    }}
                    label='Estimated Weight(kgs)'
                    labelColor={reuseTheme.colors.preference.primaryText}
                    placeholderTextColor={reuseTheme.colors.preference.grey3}
                    color={reuseTheme.colors.preference.primaryText}

                    onChangeText={text =>
                        setProductDetails((prev: any) => {
                            return { ...prev, estimatedWeight: text }
                        })

                    }
                    enableErrors
                    validate={['required']}
                    validationMessage={['Estimated  weight name is required']}
                    showCharCounter
                    maxLength={30}
                />

            </View>

            {/* estimated weight */}

            {/* estimated pick up date */}
            <View style={styles.viewStyles}>

                <TextField
                    style={styles.fieldStyles}
                    placeholder={'Estimated Pick Up Date'}
                    hint={"enter estimated  weight"}
                    labelStyle={{
                        marginHorizontal: 10
                    }}
                    label='Estimated Pick Up Date'
                    labelColor={reuseTheme.colors.preference.primaryText}
                    placeholderTextColor={reuseTheme.colors.preference.grey3}
                    color={reuseTheme.colors.preference.primaryText}

                    onChangeText={text =>
                        setProductDetails((prev: any) => {
                            return { ...prev, estimatedPickUpDate: text }
                        })

                    }
                    enableErrors
                    validate={['required']}
                    validationMessage={['Estimated  weight name is required']}
                    showCharCounter
                    maxLength={30}
                />
            </View>

            {/* estimated pick up  date*/}

            <View>
                <TextArea
                    placeholder="Tell us about your product"
                    text={productDetials.description}
                    setText={(text: any) => {
                        setProductDetails((prev: any) => {
                            return { ...prev, description: text }
                        })
                    }
                    }
                />
            </View>

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

                <Button
                    icon={{ source: 'play', direction: 'ltr' }}
                    mode="contained"
                    contentStyle={{
                        flexDirection: 'row-reverse',
                    }}
                    style={styles.buttonSpaceStyles}
                    buttonColor={reuseTheme.colors.preference.primaryForeground}
                    textColor={reuseTheme.colors.preference.primaryText}
                    onPress={goToNextStep}
                //disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
                >

                    Next
                </Button>

            </View>
        </ScrollView>

    )
}

export default ProductDetails

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
    viewStyles: {
        marginHorizontal: 20,
        marginVertical: 20,
        height: 80
    }
})