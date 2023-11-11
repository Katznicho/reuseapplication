import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ImageBackground,
} from 'react-native';
import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import ProfileCard from '../../components/ProfileCard';
import ProfileReview from '../../components/ProfileReview';



const DonaterDetails = () => {

    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);

    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();

    return (
        <SafeAreaView style={generalstyles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {/* header section */}
                <ImageBackground
                    source={{ uri: params.item.photoURL }}
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

                <View style={[generalstyles.flexStyles , { alignItems:"center"}]}>
                    <View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    marginHorizontal: 10,
                                    color: reuseTheme.colors.preference.primaryText,
                                }}
                            >
                                { `${params.item.firstName} ${params.item.lastName}` }

                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    marginHorizontal: 10,
                                    color: reuseTheme.colors.preference.primaryForeground,
                                    width:250
                                }}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, doloremque.
                            </Text>
                        </View>
                    </View>


                    <View>
                        <Button
                            mode="contained"
                            
                             //loading={true}
                            buttonColor={reuseTheme.colors.preference.primaryForeground}
                            textColor={reuseTheme.colors.preference.primaryText}
                            // onPress={() => navigation.navigate('Packages')}
                        >
                            Follow
                        </Button>
                    </View>

                </View>
                {/* header section */}

                {/* card section */}

                <ProfileCard />
                

                {/* card section */}

                {/* Reviews */}
                <ProfileReview />
                {/* Reviews */}
            </ScrollView>
            {/* book appountment */}
            <View style={[generalstyles.absoluteStyles, { bottom: 10, right: 10 }]}>
                <Button
                    mode="contained"
                    contentStyle={{
                        flexDirection: 'row-reverse',
                    }}
                    //  loading={true}
                    buttonColor={reuseTheme.colors.preference.primaryForeground}
                    textColor={reuseTheme.colors.preference.primaryText}
                    onPress={() => navigation.navigate('Packages')}
                >
                    View Available Products
                </Button>
            </View>

            {/* book appointment */}
        </SafeAreaView>
    );
};

export default DonaterDetails;
