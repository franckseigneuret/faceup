import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as NatEl from 'react-native-elements'

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { Camera } from 'expo-camera';



function SnapScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back); // caméra du smartphone : front / dos
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off); // caméra du smartphone : front / dos

  useEffect(() => {

    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  let cameraRef = useRef(null);

  if (hasPermission) {
    return (
      <>
        <View style={styles.container}>
          <Camera
            style={{ flex: 1 }}
            type={type}
            flashMode={flashMode}
            ref={ref => (cameraRef = ref)}></Camera>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.touch}
            onPress={() => {
              setType(
                type == Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <MaterialCommunityIcons name="camera-retake" size={20} color="#FFF">
            </MaterialCommunityIcons>
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch}
            onPress={() => {
              setFlashMode(
                flashMode === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off
              );
            }}>
            <FontAwesome name="flash" size={20} color={flashMode === Camera.Constants.FlashMode.off ? '#FFF': '#fcac00'} />
            <Text style={styles.buttonText}>Flash</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.captureBtn}
          onPress={async () => {
            if (cameraRef) {
              let photo = await cameraRef.takePictureAsync({
                quality : 0.1,
                base64: false,
                exif: true
               })
               if(photo) {
                 console.log(photo)
                  setFlashMode(Camera.Constants.FlashMode.off)
               }
            }
          }}
        >
          <FontAwesome name="save" size={24} color="#FFF" />
          <Text style={styles.save}>Snap</Text>
        </TouchableOpacity>
      </>
    )
  }
  else {
    return <View style={{ flex: 1 }} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  touch: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    // borderColor: 'red',
    // borderStyle: 'solid',
    // borderWidth: 2,
    padding: 15,
  },
  button: {
    backgroundColor: '#149588'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
  },
  captureBtn: {
    backgroundColor: '#149588',
    color: '#FFF',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    padding: 5,
    alignItems: 'center',
  },
  save: {
    color: '#FFF',
    marginLeft: 20,
    fontSize: 20,
  },
});



export default SnapScreen;