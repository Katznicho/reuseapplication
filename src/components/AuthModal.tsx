import { StyleSheet, Text, View, Modal, Alert } from 'react-native'
import React from 'react'

import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { ReuseTheme } from '../types/types';
import { AppDispatch } from '../redux/store/dev';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';



type AuthModalProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({ showModal, setShowModal }: AuthModalProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const {reuseTheme} =  useUserPreferredTheme();
    const styles = authStyles(reuseTheme);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            presentationStyle="overFullScreen"
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >

            <View style={styles.centeredView}>

                <View style={styles.modalView}>
                    <View >
                        {/* button */}
                        <Button
                            buttonColor={reuseTheme.colors.preference.primaryForeground}
                            textColor={reuseTheme.colors.preference.primaryText}
                            //onPress={() => dispatch(createAccount())}
                        >
                            Sign up with email and password
                        </Button>
                        {/* button */}
                    </View>

                    {/* already have an account */}
                    <View >
                        <Text
                            style={[styles.textStyle, { color: reuseTheme.colors.preference.primaryText, marginVertical: 10 }]}
                        >
                            Already have an account?
                        </Text>
                    </View>
                    {/* already have an account */}

                    {/* Regiser */}
                    <View style={{ backgroundColor:reuseTheme.colors.preference.primaryText, borderRadius: 20 }}>
                        {/* button */}
                        <Button
                            buttonColor={reuseTheme.colors.preference.primaryForeground}
                            textColor={reuseTheme.colors.preference.primaryText}
                            //onPress={() => dispatch(createAccount())}
                        >
                            Sign in with email and password
                        </Button>
                        {/* button */}
                    </View>
                    {/* Register */}
                     <View style={{ backgroundColor:reuseTheme.colors.preference.primaryText, borderRadius: 20 , marginVertical:20}}>

                     <Button
                            buttonColor={reuseTheme.colors.preference.red}
                            textColor={reuseTheme.colors.preference.primaryText}
                            onPress={() => {
                                setShowModal(false);
                            }}
                            style={{
                                width:220
                            }}
                        >
                            Cancel
                        </Button>
                     </View>


                </View>
            </View>
        </Modal>
    )
}

export default AuthModal

const authStyles =  (theme:ReuseTheme)=> StyleSheet.create({
    centeredView: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: theme.colors.preference.primaryBackground,
        borderTopLeftRadius: theme.roundness,
        borderTopRightRadius: theme.roundness,
    },
    modalView: {
        margin: 15,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color:theme.colors.preference.primaryBackground,
        fontWeight: 'bold',
        textAlign: 'center',
    },

})