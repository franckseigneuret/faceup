import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as NatEl from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';
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

  if (hasPermission) {
    return (
      <>
        <View style={styles.container}>
          <Camera style={{ flex: 1 }} type={type} flashMode={flashMode}></Camera>
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
            <FontAwesome name="flash" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Flash</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
  else {
    return <View style={{ flex: 1 }} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
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
  }
});



export default SnapScreen;