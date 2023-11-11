import React, { useCallback } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Modal,
  Text,
  Alert,
  View,
  TouchableOpacity,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import documentPicker from 'react-native-document-picker';
import { useUserPreferredTheme } from '../hooks/useUserPreferredTheme';
import { ReuseTheme } from '../types/types';


const UploadComponent = ({
  showModal,
  setModal,
  setImage,
  selectDocument,
}: any) => {

    const {reuseTheme} =  useUserPreferredTheme();

    const styles = uploadStyles(reuseTheme);

  const pickImageHandler = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
    //   console.log(image);
      setImage({
        rnImagePatch: RNFetchBlob.wrap(image.path),
        imagePath: image.path,
      });
    });
    setModal(false);
  };
  const takeImage = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
    //   console.log(image);
      setImage({
        rnImagePath: RNFetchBlob.wrap(image.path),
        imagePath: image.path,
      });
    });
    setModal(false);
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const res = await documentPicker.pick({
        type: [documentPicker.types.pdf],
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      let path: any = res[0]?.fileCopyUri?.replace('file://', '');
      setImage({
        name: res[0].name,
        type: res[0].type,
        size: res[0].size,
        uri: res[0].uri,
        rnPdfPath: RNFetchBlob.wrap(path),
        pdfPath: path,
      });

      console.log('res', RNFetchBlob.wrap(path));
      setModal(false);
    } catch (err) {
      setImage(null);
      setModal(false);

      Alert.alert(
        documentPicker.isCancel(err)
          ? 'Canceled'
          : 'Unknown Error: ' + JSON.stringify(err),
      );
    }
  }, [setImage, setModal]);

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
        <Text
          style={{
            color: reuseTheme.colors.preference.primaryText,
            marginTop: 10,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {selectDocument ? 'choose document' : 'choose option'}
        </Text>
        <View style={styles.modalView}>
          {selectDocument ? (
            <View>
              <TouchableOpacity
                activeOpacity={0.2}
                onPress={handleDocumentSelection}
              >
                <View style={{ marginLeft: 20 }}>
                  <AntDesign name={'addfile'} size={30} color={'#FFF'} />
                  <Text style={{ color: reuseTheme.colors.preference.primaryText }}>
                    Choose File
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.modalContent}>
              <TouchableOpacity activeOpacity={0.2} onPress={pickImageHandler}>
                <View style={{ marginRight: 20 }}>
                  <MaterialIcons
                    name="photo-library"
                    color={reuseTheme.colors.preference.primaryText}
                    size={30}
                  />
                  <Text style={{ color: reuseTheme.colors.preference.primaryText }}>Gallery</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.2} onPress={takeImage}>
                <View style={{ marginLeft: 20 }}>
                  <Entypo
                    name={'camera'}
                    size={30}
                    color={reuseTheme.colors.preference.primaryText}
                  />
                  <Text style={{ color: reuseTheme.colors.preference.primaryText }}>Camera</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <TouchableHighlight
            underlayColor="#fff"
            style={{
              ...styles.openButton,
              backgroundColor: 'white',
              width: '100%',
              marginTop: 10,
            }}
            onPress={() => {
              setModal(false);
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};
export default UploadComponent;

const uploadStyles = (theme:ReuseTheme)=> StyleSheet.create({
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
  modalContent: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    color:theme.colors.preference.primaryText,
  },
});
