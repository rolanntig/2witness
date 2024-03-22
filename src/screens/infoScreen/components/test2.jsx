import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
	View,
	Text,
	TouchableOpacity,
	Alert,
	ScrollView,
	Modal,
	Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const InfoScreen = () => {
	const [wantedInfo, setWantedInfo] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [articleData, setArticleData] = useState(null);

	useEffect(() => {
		const getWantedData = async () => {
			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/todos",
				);
				const data = await response.json();
				setWantedInfo(data.slice(0, 10));
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		const fetchArticleData = async () => {
			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/posts/1",
				);
				const data = await response.json();
				setArticleData(data);
			} catch (error) {
				console.error("Error fetching article data:", error);
			}
		};

		if (isModalVisible && selectedItem) {
			fetchArticleData();
		}

		getWantedData();
	}, [isModalVisible, selectedItem]);

	const uploadMedia = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.cancelled) {
				Alert.alert("Success", "Bilden eller videon har laddats upp!");
			} else {
				Alert.alert(
					"Cancelled",
					"Du har avbrutit nedladdningen av bilden eller videon.",
				);
			}
		} catch (error) {
			console.error("Error uploading media: ", error);
			Alert.alert("Error", "Det uppstod ett fel vid uppladdning av media.");
		}
	};

	const handleClick = (item) => {
		setSelectedItem(item);
		setIsModalVisible(true);
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
								{selectedItem && (
									<>
										<Text className="px-2 text-xl mb-1 font-bold text-gray-800 md:text-xl dark:text-gray-400">
											{selectedItem.title}
										</Text>
										<Text className="px-2 mb-3 text-sl font-bold text-gray-600 md:text-xl dark:text-gray-400">
											{selectedItem.body}
										</Text>
									</>
								)}
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
							<TouchableOpacity
								key={item.id}
								onPress={() => handleClick(item)}
								style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}
							>
								<Text>{item.title}</Text>
								<AntDesign name="infocirlceo" size={26} color="black" />
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
				<StatusBar style="auto" />
				<View className="w-full mb-6">
					<View className="border-t-4 mt-2 w-full  border-yellow-500">
						<Text className="text-2xl my-2 font-bold">FAQ</Text>
					</View>
					<View className="bg-white w-full border rounded-lg shadow-md mb-6">
						{/* FAQ items */}
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default InfoScreen;
