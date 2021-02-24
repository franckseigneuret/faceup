import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements'

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { Camera } from 'expo-camera';

import { connect } from 'react-redux'

function SnapScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back); // caméra du smartphone : front / dos
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off); // caméra du smartphone : front / dos
  const [visible, setVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {

    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  let cameraRef = useRef(null);

  const takePicture = async () => {

    setVisible(true)

    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync({
        quality: 0.1,
        base64: false,
        exif: true,
      })

      if (photo) {
        // console.log(photo)

        const data = new FormData();
        data.append('avatar', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'user_avatar.jpg',
        })
        const postPhoto = await fetch('http://172.17.1.161:3000/upload', {
          method: 'post',
          body: data,
        })

        const upload = await postPhoto.json()
        if (upload.result) {
          setVisible(false)
        }
        if (upload.resultCloudinary && upload.resultCloudinary.url.length > 0) {
          console.log('ok')
          props.savePhoto(upload.resultCloudinary.url)
        }
        setFlashMode(Camera.Constants.FlashMode.off)
      }
    }
  }

  const takeVideo = async () => {

    setIsRecording(!isRecording)

    if (cameraRef) {
      let video = await cameraRef.recordAsync({
        quality: '480p',
        maxDuration: 3,
      })

      if (video) {
        console.log(video)

        setIsRecording(false)

        const data = new FormData();
        data.append('movie', {
          uri: video.uri,
          type: 'video/mp4',
          name: 'movie.mp4',
        })
        const postMovie = await fetch('http://172.17.1.161:3000/upload_video', {
          method: 'post',
          body: data,
        })

      }
    }
  }
  if (hasPermission) {
    return (
      <>
        <View style={styles.container}>
          <Camera
            style={{ flex: 1 }}
            type={type}
            flashMode={flashMode}
            ref={ref => (cameraRef = ref)}
          ></Camera>
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
            <FontAwesome name="flash" size={20} color={flashMode === Camera.Constants.FlashMode.off ? '#FFF' : '#fcac00'} />
            <Text style={styles.buttonText}>Flash</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cameraVideo}>
          <TouchableOpacity
            style={styles.captureBtn}
            onPress={() => takePicture()}>
            <FontAwesome name="save" size={24} color="#FFF" />
            <Text style={styles.save}>Snap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.captureBtn}
            onPress={() => takeVideo()}>
            {
              isRecording ?
              <FontAwesome name="square" size={15} color="#F00" style={styles.square} />
              :
              <FontAwesome name="circle" size={24} color="#F00" />
            }
            <Text style={styles.save}>Video</Text>
          </TouchableOpacity>
        </View>
        <Overlay isVisible={visible}>
          <Text>Loading...</Text>
        </Overlay>
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
    padding: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
  },
  cameraVideo: {
    backgroundColor: '#149588',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  square: {
    borderColor: '#F00',
    borderWidth: 3,
    borderRadius: 14,
    padding: 5,
  }
});



function mapDispatchToProps(dispatch) {
  return {
    savePhoto: function (photoUrl) {
      dispatch({ type: 'savePhoto', photoUrl: photoUrl })
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SnapScreen)
