import { View, TouchableOpacity, Text, Alert } from "react-native";
import {
	MaterialCommunityIcons,
	AntDesign,
	MaterialIcons,
} from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

function CameraScreen() {
	const [hasCameraPermission, setHasCameraPermission] = useState(null);
	const [hasAudioPermission, setHasAudioPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const cameraRef = useRef(null);
	const [isRecording, setIsRecording] = useState(false);
	const recordingRef = useRef(new Audio.Recording());
	const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
	const [zoom, setZoom] = useState(0);

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraStatus.status === "granted");

			const audioStatus = await Camera.requestMicrophonePermissionsAsync();
			setHasAudioPermission(audioStatus.status === "granted");
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
			const fileName = media.uri.split("/").pop();
			const newPath = FileSystem.documentDirectory + fileName;
			await FileSystem.moveAsync({
				from: media.uri,
				to: newPath,
			});

			const { status } = await MediaLibrary.requestPermissionsAsync();
			if (status === "granted") {
				const asset = await MediaLibrary.createAssetAsync(newPath);
				await MediaLibrary.createAlbumAsync("Video", asset, false);
			} else {
				Alert.alert("Tillstånd krävs", "Tillstånd att spara filer krävs.");
			}
		} catch (e) {
			console.error(e);
		}
	};

	const toggleFlash = () => {
		setFlashMode(
			flashMode === Camera.Constants.FlashMode.off
				? Camera.Constants.FlashMode.on
				: Camera.Constants.FlashMode.off,
		);
	};

	const takePicture = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
			const compressedPhoto = await compressImage(photo.uri, SaveFormat.JPEG);
			await saveMedia(photo);
		}
	};

	const startRecording = async () => {
		if (cameraRef.current) {
			const video = await cameraRef.current.recordAsync({
				quality: Camera.Constants.VideoQuality["1080p"],
				videoBitrate: 10 * 1000 * 1000,
			});
			await saveMedia(video);
		}
	};

	const stopRecording = () => {
		if (cameraRef.current) {
			cameraRef.current.stopRecording();
		}
	};

	const compressImage = async (uri, format = SaveFormat.JPEG) => {
		const result = await manipulateAsync(uri, [{ resize: { width: 1200 } }], {
			compress: 0.7,
			format,
		});
		return {
			name: `${Date.now()}.${format}`,
			type: `image/${format}`,
			...result,
		};
	};

	const recordAudio = async () => {
		try {
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});

			// Skapa en ny inspelning
			const recording = new Audio.Recording();
			await recording.prepareToRecordAsync(
				Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
			);
			await recording.startAsync();
			recordingRef.current = recording;
			setIsRecording(true);
			console.log("Inspelning pågår...");
		} catch (error) {
			console.error("Ett fel uppstod under start av ljudinspelning:", error);
		}
	};

	const stopRecordingAudio = async () => {
		try {
			const recording = recordingRef.current;
			await recording.stopAndUnloadAsync();
			const uri = recording.getURI();
			console.log("Inspelning avslutad och sparad på:", uri);
			setIsRecording(false);

			if (uri) {
				const { status } = await MediaLibrary.requestPermissionsAsync();
				if (status === "granted") {
					const asset = await MediaLibrary.createAssetAsync(uri);
					const album = await MediaLibrary.getAlbumAsync("Mina Filer");
					if (album) {
						await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
					} else {
						await MediaLibrary.createAlbumAsync("Mina Filer", asset, false);
					}
					console.log("Inspelning sparad i filsystemet!");
				} else {
					console.log("Åtkomst till mediabiblioteket nekad.");
				}
			} else {
				console.log("Ingen inspelningsfil att spara.");
			}
		} catch (error) {
			console.error("Ett fel uppstod under stopp av ljudinspelning:", error);
		}
	};

	const uploadMedia = async () => {
		// Låt användaren välja en bild
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			// Använd FileSystem.uploadAsync för att ladda upp bilden
			const localUri = result.uri;
			const filename = localUri.split("/").pop();
			const match = /\.(\w+)$/.exec(filename);
			const type = match ? `image/${match[1]}` : "image";

			// Ange URL till din uppladdningsserver och inkludera mappen 'media'
			const url = "../homeScreen/media";

			const formData = new FormData();
			formData.append("photo", { uri: localUri, name: filename, type });

			const options = {
				method: "POST",
				body: formData,
				headers: {
					Accept: "application/json",
					"Content-Type": "multipart/form-data",
				},
			};

			return await FileSystem.uploadAsync(url, localUri, options);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
				<View
					style={{
						flex: 1,
						backgroundColor: "transparent",
						flexDirection: "row",
						justifyContent: "space-around",
						alignItems: "flex-end",
						paddingBottom: 20,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back,
							);
						}}
					>
						<MaterialCommunityIcons
							name="camera-switch"
							size={32}
							color="white"
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={uploadMedia}>
						<AntDesign name="clouduploado" size={32} color="white" />
					</TouchableOpacity>
					<TouchableOpacity
						onLongPress={startRecording}
						onPressOut={stopRecording}
						onPress={takePicture}
					>
						<MaterialCommunityIcons
							name="record-circle-outline"
							size={100}
							color="white"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={isRecording ? stopRecordingAudio : recordAudio}
					>
						<MaterialIcons name="record-voice-over" size={32} color="white" />
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
}

export default CameraScreen;
