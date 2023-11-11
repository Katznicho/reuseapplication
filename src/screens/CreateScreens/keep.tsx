<View>

    <View
        style={styles.viewStyles}
    >
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={generalstyles.container}
        >
            <View style={{
                height: 400,
                marginVertical: 20
            }}>
                <UserLocation
                    placeholder={"Enter estimated pick up location"}
                    // setPickUpAddress={setProductDetails}
                    onPress={(data: any, details = null) => {
                        // 'details' is provided when fetchDetails = true



                        fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${data?.place_id}&key=${API_KEY}`)
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.results && data.results.length > 0) {
                                    const address = {
                                        data,
                                        details,
                                        location: data.results[0].geometry.location
                                    }

                                    setProductDetails((prev: any) => {
                                        return { ...prev, estimatedPickUp: address }
                                    })
                                }
                                else {

                                    const address = {
                                        data,
                                        details,

                                    }

                                    setProductDetails((prev: any) => {
                                        return { ...prev, estimatedPickUp: address }
                                    })

                                }


                            })
                            .catch((error) => {
                                console.error("Error fetching coordinates:", error);
                            });


                    }
                    }
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

</View>;
