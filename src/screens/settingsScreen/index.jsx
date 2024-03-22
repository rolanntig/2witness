import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Switch, Image, Pressable } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
	// The images for the icons
	const iconImages = [
		"https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg",
		"https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg",
		"https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg",
		"https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg",
		"https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg",
		"https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg",
	];
	const [notifications, setNotifications] = useState(false);
	const [setting2, setSetting2] = useState(false);
	const [setting3, setSetting3] = useState(false);
	const [alternativeIcons, setAlternativeIcons] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState("");

	const storageKey = "@storage_Key";
	React.useEffect(() => {
		//* Get the stored value
		const getData = async () => {
			try {
				const value = await AsyncStorage.getItem(storageKey);
				if (value !== null) {
					//* Gets the stored values and sets them as the current values
					const parsedValue = JSON.parse(value);
					setSelectedIcon(Number.parseInt(parsedValue.selectedIcon));
					setNotifications(parsedValue.notifications);
					setSetting2(parsedValue.setting2);
					setSetting3(parsedValue.setting3);
					setAlternativeIcons(parsedValue.setting4);
				} else {
					setSelectedIcon(0);
				}
			} catch (e) {
				//* error reading value
				return null;
			}
		};
		if (getData() === null) {
			console.error("Error getting data");
		}
	}, []);

	React.useEffect(() => {
		//* Update the stored values when they change
		const jsonData = JSON.stringify({
			selectedIcon: selectedIcon,
			notifications: notifications,
			setting2: setting2,
			setting3: setting3,
			setting4: alternativeIcons,
		});
		const storeData = async (value) => {
			try {
				await AsyncStorage.setItem(storageKey, value);
			} catch (e) {
				//* saving error
				return null;
			}
		};
		if (storeData(jsonData) === null) {
			console.error("Error storing data");
		}
	}, [selectedIcon, notifications, setting2, setting3, alternativeIcons]);

	/* Tailwind works for phone but not web... */
	return (
		<View className="h-full flex items-center justify-around bg-gray-700">
			<View className="w-11/12 bg-gray-400 rounded-lg px-5 mt-8">
				<View className="w-full flex-row justify-between items-center">
					<Text className="">Notifikationer</Text>
					<Switch
						onValueChange={() => setNotifications((prevState) => !prevState)}
						value={notifications}
					/>
				</View>
				<View className="w-full flex-row justify-between items-center">
					<Text className="">Inställing</Text>
					<Switch
						onValueChange={() => setSetting2((prevState) => !prevState)}
						value={setting2}
					/>
				</View>
				<View className="w-full flex-row justify-between items-center">
					<Text className="">Inställing</Text>
					<Switch
						onValueChange={() => setSetting3((prevState) => !prevState)}
						value={setting3}
					/>
				</View>
			</View>
			<View className="w-11/12 bg-gray-400 rounded-lg px-5">
				<View className="w-full flex-row justify-between items-start py-3">
					<Text className="">Städer</Text>
					<Text className="text-black">0st Favoriter</Text>
				</View>
				<View className="w-full flex-row justify-between items-center py-1 pb-4">
					<Pressable
						className="w-full flex-row justify-center bg-gray-300 rounded-lg px-2 py-2"
						onPress={() => navigation.navigate("CitySelector")}
					>
						<Text className="text-black">Välj Städer</Text>
					</Pressable>
				</View>
			</View>
			<View className="w-11/12 bg-gray-400 rounded-lg mb-6 px-5">
				<View className="w-full flex-row justify-between items-center">
					<Text className="">Alternativa Ikoner</Text>
					<Switch
						onValueChange={() => setAlternativeIcons((prevState) => !prevState)}
						value={alternativeIcons}
					/>
				</View>
				<View className="w-full">
					<Text className=" text-black">
						Välj vilken ikon som ska visas på din telefon. Bara appens ikon
						kommer ändras <Text className="font-bold">inte appens namn</Text>
					</Text>
				</View>
				<View className="flex-row flex-wrap justify-around items-center gap-5 h-2/6 mt-1">
					{iconImages.map((icon, index) => {
						return (
							<Pressable
								className="rounded-2xl border-4"
								style={{
									borderColor: selectedIcon === index ? "red" : "transparent",
								}}
								onPress={() => setSelectedIcon(index)}
								// biome-ignore lint/suspicious/noArrayIndexKey: <I dont like this error very much >:( )>
								key={index}
							>
								<Image
									source={{ uri: icon }}
									className="w-20 h-20 rounded-xl"
								/>
							</Pressable>
						);
					})}
				</View>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}
