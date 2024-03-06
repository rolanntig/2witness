import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null || hasAudioPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>Ingen åtkomst till kameran eller mikrofonen</Text>;
  }

  const saveMedia = async (media) => {
    try {
      // Spara media till appens dokumentmapp
      const fileName = media.uri.split('/').pop();
      const newPath = FileSystem.documentDirectory + fileName;
      await FileSystem.moveAsync({
        from: media.uri,
        to: newPath,
      });

      // Begär tillstånd och spara media till enhetens galleri
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(newPath);
        await MediaLibrary.createAlbumAsync('Video', asset, false);
      } else {
        Alert.alert('Tillstånd krävs', 'Tillstånd att spara filer krävs.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      await saveMedia(photo);
    }
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        const video = await cameraRef.current.recordAsync();
        await saveMedia(video);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              Vänd
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onLongPress={startRecording}
            onPressOut={stopRecording}
            onPress={takePicture}
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: 'white' }}> Ta Bild/Film </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraScreen;