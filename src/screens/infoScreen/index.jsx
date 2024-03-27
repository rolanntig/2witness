import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
	View,
	Text,
	TouchableOpacity,
	Alert,
	ScrollView,
	Modal,
	Button,
	Pressable,
	Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const InfoScreen = () => {
	// Tillstånd för den önskade informationen som ska visas
	const [wantedInfo, setWantedInfo] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const [whatFAQNumber, setWhatFAQNumber] = useState(0);
	const [isFAQModalVisible, setIsFAQModalVisible] = useState(false);

	// Använd useEffect för att hämta data när komponenten monteras
	useEffect(() => {
		// Funktion för att hämta data från en API
		const fetchData = async () => {
			try {
				// Hämta data från JSONPlaceholder API
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/posts",
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
			if (!result.cancelled) {
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
		<ScrollView className="flex-1 bg-white ">
			<View className="items-center p-4">
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
				<View className="border-t-4 w-full border-yellow-500">
					<Modal
						className="flex-1 justify-center bg-black items-center"
						visible={isModalVisible}
						onRequestClose={() => setIsModalVisible(false)}
						animationType="slide"
						presentationStyle="pageSheet"
					>
						<View
							style={{
								flex: 1,
								justifyContent: "space-around",
								alignItems: "center",
							}}
						>
							<TouchableOpacity
								onPress={() => setIsModalVisible(false)}
								style={{ position: "absolute", top: 20, left: 20 }}
							>
								<AntDesign name="close" size={24} color="grey" />
							</TouchableOpacity>
							<View className="px-4 h-2/3">
								<Text className="px-2 text-xl mb-1 font-bold text-gray-800 md:text-xl dark:text-gray-400">
									Polisen söker information om brottet i Brotthaga
								</Text>
								<Text className="px-2 mb-3 text-sl font-bold text-gray-600 md:text-xl dark:text-gray-400">
									Feb. 8, 2022
								</Text>
								<ScrollView className="px-2">
									<View>
										<Text className="text-justify mb-3 text-gray-600 dark:text-gray-400">
											Track work across the enterprise through an open,
											collaborative platform. Link issues across Jira and ingest
											data from other software development tools, so your IT
											support and operations teams have richer contextual
											information to rapidly respond to requests, incidents, and
											changes.
										</Text>
										<Text className="text-justify mb-3 text-gray-600 dark:text-gray-400">
											Deliver great service experiences fast - without the
											complexity of traditional ITSM solutions. Accelerate
											critical development work, eliminate toil, and deploy
											changes with ease, with a complete audit trail for every
											change.
										</Text>
										<Text className="text-justify mb-3 text-gray-600 dark:text-gray-400">
											Track work across the enterprise through an open,
											collaborative platform. Link issues across Jira and ingest
											data from other software development tools, so your IT
											support and operations teams have richer contextual
											information to rapidly respond to requests, incidents, and
											changes.
										</Text>
										<Text className="text-justify mb-3 text-gray-600 dark:text-gray-400">
											Track work across the enterprise through an open,
											collaborative platform. Link issues across Jira and ingest
											data from other software development tools, so your IT
											support and operations teams have richer contextual
											information to rapidly respond to requests, incidents, and
											changes.
										</Text>
										<Text className="text-justify mb-3 text-gray-600 dark:text-gray-400">
											Track work across the enterprise through an open,
											collaborative platform. Link issues across Jira and ingest
											data from other software development tools, so your IT
											support and operations teams have richer contextual
											information to rapidly respond to requests, incidents, and
											changes.
										</Text>
										<Text className="text-justify mb-3 text-gray-600 dark:text-gray-400">
											Track work across the enterprise through an open,
											collaborative platform. Link issues across Jira and ingest
											data from other software development tools, so your IT
											support and operations teams have richer contextual
											information to rapidly respond to requests, incidents, and
											changes.
										</Text>
										<Text className="text-justify mb-3 text-gray-600 dark:text-gray-400">
											Track work across the enterprise through an open,
											collaborative platform. Link issues across Jira and ingest
											data from other software development tools, so your IT
											support and operations teams have richer contextual
											information to rapidly respond to requests, incidents, and
											changes.
										</Text>
									</View>
								</ScrollView>
							</View>
							<Button
								title="Close modal"
								color="red"
								onPress={() => setIsModalVisible(false)}
							/>
						</View>
					</Modal>
					<Text className="text-2xl my-2 font-bold">Eftersökt Information</Text>
				</View>

				<View className="w-full h-80">
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
								<TouchableOpacity onPress={() => setIsModalVisible(true)}>
									<AntDesign name="infocirlceo" size={26} color="black" />
								</TouchableOpacity>
							</View>
						))}
					</ScrollView>
				</View>
				<StatusBar style="auto" />
				<View className="w-full mb-6">
					<View className="border-t-4 mt-2 w-full border-yellow-500">
						<Modal
							visible={isFAQModalVisible}
							onRequestClose={() => setIsFAQModalVisible(!isFAQModalVisible)}
							animationType="fade"
							transparent={true}
						>
							<View className="h-screen mb-10 bg-black/20">
								<Pressable
									className="flex-1 justify-center items-center h-4/6 w-screen"
									onPress={() => setIsFAQModalVisible(!isFAQModalVisible)}
								/>
								<View className="px-4 py-5 h-1/4 bg-slate-100 w-11/12 ml-4 rounded-xl">
									<Text className="px-2 text-xl mb-1 font-bold text-gray-800 md:text-xl dark:text-gray-400">
										{whatFAQNumber === 0 ? "Vad händer med materialet?" : null}
										{whatFAQNumber === 1
											? "Hur vet jag att jag är anonym?"
											: null}
										{whatFAQNumber === 2
											? "Vad sparas när jag tar en bild?"
											: null}
										{whatFAQNumber === 3 ? "Vad innebär kryptering?" : null}
										{whatFAQNumber === 4 ? "Vad är syftet med appen?" : null}
									</Text>
									<View>
										<Text className="text-justify mb-3 text-gray-800 text dark:text-gray-400">
											{whatFAQNumber === 0
												? "Det krypteras och skickas till 2witness helt anonymt, därefter lagras det i vår databas som anslutna polis och åklagarmyndigheter kan komma åt. Materialet används sedan som bevismaterial om det paras ihop med ett fall."
												: null}
											{whatFAQNumber === 1
												? "Inget av din data från appen sparas på din telefon. All data krypteras innan det skickas till 2witness och inget av detta kan ses av polis/åklagare"
												: null}
											{whatFAQNumber === 2
												? "All information kring bilden som vanligen sparas i bildens meta-data. Detta inkluderar saker som tiden, platsen och storleken i pixlar som orginalbilden innehåller med mera. Detta krävs för att materialet skall kunnas användas som bevismaterial."
												: null}
											{whatFAQNumber === 3
												? "Kryptering är en säkerhetsprocess där information omvandlas till kod genom att använda algoritmer och nycklar, vilket gör det svårt för obehöriga att förstå utan rätt dekrypteringsnyckel. Kryptering används brett för att skydda känslig information."
												: null}
											{whatFAQNumber === 4
												? "Målet med 2witness är att göra det möjligt för allmänheten att vittna anonymt, antingen direkt med inspelning på plats eller genom uppladdningen i efterhand."
												: null}
										</Text>
									</View>
								</View>
								<Pressable
									className="mb-20 mt-5"
									onPress={() => setIsFAQModalVisible(!isFAQModalVisible)}
								/>
							</View>
						</Modal>
						<Text className="text-2xl my-2 font-bold">FAQ</Text>
					</View>
					<View className="bg-white w-full border rounded-lg shadow-md mb-6">
						<View className="flex border-b flex-row p-2 justify-between">
							<Text className="flex-1 tracking-wide">
								Vad händer med materialet?
							</Text>
							<TouchableOpacity
								onPress={() => {
									setIsFAQModalVisible(true);
									setWhatFAQNumber(0);
								}}
							>
								<AntDesign name="pluscircleo" size={24} color="black" />
							</TouchableOpacity>
						</View>
						<View className="flex border-b flex-row p-2 justify-between">
							<Text className="flex-1 tracking-wide">
								Hur vet jag att jag är anonym?
							</Text>
							<TouchableOpacity
								onPress={() => {
									setIsFAQModalVisible(true);
									setWhatFAQNumber(1);
								}}
							>
								<AntDesign name="pluscircleo" size={24} color="black" />
							</TouchableOpacity>
						</View>
						<View className="flex border-b flex-row p-2 justify-between">
							<Text className="flex-1 tracking-wide">
								Vad sparas när jag tar en bild?
							</Text>
							<TouchableOpacity
								onPress={() => {
									setIsFAQModalVisible(true);
									setWhatFAQNumber(2);
								}}
							>
								<AntDesign name="pluscircleo" size={24} color="black" />
							</TouchableOpacity>
						</View>
						<View className="flex border-b flex-row p-2 justify-between">
							<Text className="flex-1 tracking-wide">
								Vad innebär kryptering?
							</Text>
							<TouchableOpacity
								onPress={() => {
									setIsFAQModalVisible(true);
									setWhatFAQNumber(3);
								}}
							>
								<AntDesign name="pluscircleo" size={24} color="black" />
							</TouchableOpacity>
						</View>
						<View className="flex border-b flex-row p-2 justify-between">
							<Text className="flex-1 tracking-wide">
								Vad är syftet med appen?
							</Text>
							<TouchableOpacity
								onPress={() => {
									setIsFAQModalVisible(true);
									setWhatFAQNumber(4);
								}}
							>
								<AntDesign name="pluscircleo" size={24} color="black" />
							</TouchableOpacity>
						</View>
						<View className="flex flex-row p-2 justify-between">
							<Text
								className="flex-1 text-center tracking-wide text-sky-700"
								onPress={() => Linking.openURL("https://www.2witness.se/")}
							>
								Läs mer på: 2witness.se
							</Text>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

// Exportera InfoScreen som standardkomponenten för modulen
export default InfoScreen;
