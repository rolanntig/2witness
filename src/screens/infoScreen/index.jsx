import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const InfoScreen = () => {
	// Tillstånd för den önskade informationen som ska visas
	const [wantedInfo, setWantedInfo] = useState([]);

	// Använd useEffect för att hämta data när komponenten monteras
	useEffect(() => {
		// Funktion för att hämta data från en API
		const fetchData = async () => {
			try {
				// Hämta data från JSONPlaceholder API
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/todos",
				);
				// Konvertera svaret till JSON-format
				const data = await response.json();
				// Sätt den hämtade datan i wantedInfo-variabeln
				setWantedInfo(data); // Ta bara de första 10 posterna för att visa
			} catch (error) {
				// Vid eventuella fel vid hämtning av data
				console.error("Error fetching data:", error);
				// Implementera lämplig felhantering här
			}
		};

		// Anropa funktionen fetchData för att hämta data
		fetchData();
	}, []);

	// Funktion för att ladda upp media (bild eller video)
	const uploadMedia = async () => {
		try {
			// Låt användaren välja en bild eller video från enhetens galleri
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			// Om användaren valde en fil
			if (result.cancelled) {
				// Implementera logik för att ladda upp bilden eller videon till en server eller lagring
				Alert.alert("Success", "Bilden eller videon har laddats upp!");
			} else {
				// Om användaren avbröt processen
				Alert.alert(
					"Cancelled",
					"Du har avbrutit nedladdningen av bilden eller videon.",
				);
			}
		} catch (error) {
			// Vid eventuella fel vid uppladdning av media
			console.error("Error uploading media: ", error);
			Alert.alert("Error", "Det uppstod ett fel vid uppladdning av media.");
		}
	};

	return (
		// Huvudcontainer för komponenten
		<View className="flex-1 bg-white items-center p-4">
			<Text className="text-3xl font-bold mb-6">Information</Text>

			<View className="flex flex-row space-x-2 justify-between w-full">
				<View className="flex bg-white border rounded-lg shadow-md p-4 mb-6 flex-1">
					<Text className="text-gray-700">Vid akuta händelser ring:</Text>
					<Text className="text-3xl font-bold text-center">112</Text>
				</View>

				<View className="flex bg-white border rounded-lg shadow-md p-4 mb-6 flex-1">
					<Text className="text-gray-700">Vid andra ärenden ring:</Text>
					<Text className="text-3xl font-bold text-center">114 14</Text>
				</View>
			</View>
				<Text className="text-2xl font-bold">Eftersökt Information</Text>
			<ScrollView className="w-full">
				<ScrollView
					className={`bg-white border rounded-lg shadow-md w-max mb-6 ${
						wantedInfo.length > 10 ? "overflow-y-scroll" : ""
					}`}
				>
					{wantedInfo.map((item) => (
						<View
							key={item.id}
							className="flex border-b flex-row p-2 justify-between"
						>
							<Text className="flex-1 tracking-wide">{item.title}</Text>
							<TouchableOpacity onPress={uploadMedia}>
								<AntDesign name="clouduploado" size={32} color="black" />
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>

				<StatusBar style="auto" />
			</ScrollView>
		</View>
	);
};

// Exportera InfoScreen som standardkomponenten för modulen
export default InfoScreen;
