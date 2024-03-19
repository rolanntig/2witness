import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Switch, Image, Pressable } from "react-native";

export default function CitySelector({ navigation }) {
	const [isEnabled, setIsEnabled] = React.useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	return (
		<View className="flex-1 bg-[#F6F5F5]">
			<StatusBar style="auto" />
			<View className="flex-row justify-between items-center m-5">
				<Text className="text-2xl font-bold">Inställningar</Text>
				<Pressable
					onPress={() => navigation.navigate("Profile")}
					className="rounded-full bg-[#353e4c] p-2"
				>
					<Image
						source={{
							uri: "https://www.w3schools.com/w3images/avatar2.png",
						}}
						className="rounded-full"
						style={{ width: 40, height: 40 }}
					/>
				</Pressable>
			</View>
			<View className="border bg-[#353e4c] rounded-md m-5">
				<View className="m-5 flex-row justify-between items-center">
					<Text className="text-lg text-white">Mörkt läge</Text>
					<Switch
						trackColor={{ false: "#767577", true: "#81b0ff" }}
						thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggleSwitch}
						value={isEnabled}
					/>
				</View>
			</View>
		</View>
	);
}
