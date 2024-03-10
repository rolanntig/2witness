import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const InfoScreen = () => {
	const navigation = useNavigation();

	return (
		<View className="flex-1 bg-white items-center">
			<Text className="text-3xl font-bold mb-6">Information</Text>

			<View className="flex flex-row space-x-2 justify-between">
				<View className="flex bg-white border rounded-lg shadow-md p-4 mb-6">
					<View className="w-full ">
						<Text className="text-gray-700">Vid akuta händelser ring:</Text>
					</View>
					<View className="w-full px-4">
						<Text className="text-3xl font-bold text-center">112</Text>
					</View>
				</View>

				<View className="flex bg-white border rounded-lg shadow-md p-4 mb-6">
					<View className="w-full ">
						<Text className="text-gray-700">Vid andra ärenden ring:</Text>
					</View>
					<View className="w-full px-4">
						<Text className="text-3xl font-bold text-center">114 14</Text>
					</View>
				</View>
			</View>

			<Text className="text-2xl font-bold mb-6">Eftersökt Information</Text>

			<Button
				title="Go to Home"
				onPress={() => navigation.navigate("Home")}
				className="bg-blue-500 py-2 px-4 rounded-lg text-white font-bold shadow-md"
			/>
			<StatusBar style="auto" />
		</View>
	);
};

export default InfoScreen;
