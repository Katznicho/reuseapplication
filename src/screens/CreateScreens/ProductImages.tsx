import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UploadComponent from '../../components/UploadComponent';
import { Button } from 'react-native-paper';
import { ReuseTheme } from '../../types/types';

/**
 * Renders a component for displaying and uploading product images.
 *
 * @param {Object} props - The component props.
 * @param {string} props.imagePath - The path of the image.
 * @param {function} props.setImagePath - The function to set the image path.
 * @param {any[]} props.count - The array of count items.
 * @param {function} props.setShowModal - The function to set the show modal state.
 * @param {function} props.setCount - The function to set the count state.
 * @param {boolean} props.showModal - The flag to show or hide the modal.
 * @param {function} props.uploadImagesAutomatically - The function to upload images automatically.
 * @param {boolean} props.uploadingImages - The flag to indicate if images are currently being uploaded.
 * @param {function} props.goToNextStep - The function to go to the next step.
 * @return {JSX.Element} The rendered component.
 */
const ProductImages = ({
    imagePath,
    setImagePath,
    count,
    setShowModal,
    setCount,
    showModal,
    uploadImagesAutomatically,
    uploadingImages,
    goToNextStep


}: any) => {

    const { reuseTheme } = useUserPreferredTheme();
    const generalstyles = dynamicGeneralStyles(reuseTheme);
    const styles = productStyles(reuseTheme);

    return (
        <View>

            {
                imagePath ? (<View>
                    <TouchableOpacity
                        onPress={() => {

                            setShowModal(!showModal);

                        }}
                        style={[generalstyles.centerContent]}>
                        <Image
                            source={{ uri: imagePath.imagePath }}
                            style={[styles.coverStyles, generalstyles.centerContent]}
                        />

                    </TouchableOpacity>



                </View>) : (<TouchableOpacity
                    onPress={() => {

                        setShowModal(!showModal);


                    }}
                    style={[styles.coverStyles, generalstyles.centerContent]}>

                    <AntDesign
                        name={'plus'}
                        color={reuseTheme.colors.preference.primaryText}
                        size={20}
                        style={{
                            borderRadius: 10,
                            padding: 10,
                            borderStyle: "dotted",
                        }}
                    />
                    <View>
                        <Text>Add cover photos</Text>
                    </View>

                </TouchableOpacity>)
            }

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                {
                    count.map((item: any, index: number) => (
                        <View key={item.id}>
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.imageStyles, generalstyles.centerContent]}
                                onPress={() => {
                                    // Create a copy of the count array to modify the specific item
                                    const updatedCount = [...count];
                                    updatedCount[index] = {
                                        ...updatedCount[index],
                                        showModal: true, // Set showModal to true for the clicked item
                                    };
                                    setCount(updatedCount);
                                }}
                            >
                                {
                                    item.imagePath ? (<Image
                                        source={{ uri: item?.imagePath?.imagePath }}
                                        style={[styles.imageStyles, generalstyles.centerContent]}
                                    />) : (<AntDesign
                                        name={'plus'}
                                        color={reuseTheme.colors.preference.primaryText}
                                        size={20}
                                        style={{
                                            borderRadius: 10,
                                            padding: 10,
                                            borderStyle: "dotted",
                                        }}
                                    />)
                                }


                            </TouchableOpacity>


                            {item.showModal && (
                                <UploadComponent
                                    image={item.imagePath}
                                    setImage={(newImage: any) => {
                                        // Update the image path for the specific item
                                        const updatedCount = [...count];
                                        updatedCount[index] = {
                                            ...updatedCount[index],
                                            imagePath: newImage,
                                            showModal: !updatedCount[index].showModal,
                                        };
                                        setCount(updatedCount);
                                    }}
                                    setModal={(newModalState: any) => {
                                        // Update the showModal property for the specific item
                                        const updatedCount = [...count];
                                        updatedCount[index] = {
                                            ...updatedCount[index],
                                            showModal: newModalState,
                                        };
                                        setCount(updatedCount);
                                    }}
                                    showModal={item.showModal}
                                    selectDocument={false}
                                />
                            )}

                        </View>



                    ))
                }

            </ScrollView>

            {/* upload all */}
            <View style={styles.buttonStyles}>
                <Button

                    mode="contained"
                    contentStyle={{
                        flexDirection: 'row-reverse',
                    }}
                    buttonColor={reuseTheme.colors.preference.primaryForeground}
                    textColor={reuseTheme.colors.preference.primaryText}
                    onPress={uploadImagesAutomatically}
                    disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
                    loading={uploadingImages}


                >
                    {/* Create Product */}
                    Upload Images
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
                    disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
                >

                    Next
                </Button>

            </View>
            {/* upload all */}


            {/* modal section */}
            {showModal && (
                <UploadComponent
                    image={imagePath}
                    setImage={setImagePath}
                    setModal={setShowModal}
                    showModal={showModal}
                    selectDocument={false}
                />
            )}

            {/* modal section */}

        </View>
    );
}

export default ProductImages

const productStyles = (theme: ReuseTheme) => StyleSheet.create({
    coverStyles: {
        borderWidth: 1,
        borderColor: theme.colors.preference.grey3,
        width: "95%",
        marginHorizontal: 10,
        marginVertical: 10,
        height: 150,
        // borderStyle: "dotted",
        borderRadius: 10
    },
    imageStyles: {
        borderWidth: 1,
        borderColor: theme.colors.preference.grey3,
        width: 80,
        marginHorizontal: 5,
        marginVertical: 10,
        height: 80,
        borderRadius: 10
    },

    buttonStyles: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 20
    },
    buttonSpaceStyles: {
        marginHorizontal: 10
    },

})