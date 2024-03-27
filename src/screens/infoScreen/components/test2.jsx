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

const InfoScreen = () => {
	const [wantedInfo, setWantedInfo] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/posts"
				);
				const data = await response.json();
				setWantedInfo(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleClick = (item) => {
		setSelectedItem(item);
		setIsModalVisible(true);
	};

	return (
		<ScrollView className="flex-1 bg-white ">
			<View className="items-center p-4">
				<Text className="text-3xl font-bold mb-6">Information</Text>
				{/* Akutnummer och annan info här */}
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
				{/* FAQ-sektionen */}
			</View>
		</ScrollView>
	);
};

export default InfoScreen;
