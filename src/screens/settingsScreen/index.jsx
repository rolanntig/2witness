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
	const [setting4, setSetting4] = useState(false);
	const [setting5, setSetting5] = useState(false);
	const [setting6, setSetting6] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState("");

	const storageKey = "@storage_Key";
	React.useEffect(() => {
		// Get the stored value
		const getData = async () => {
			try {
				const value = await AsyncStorage.getItem(storageKey);
				if (value !== null) {
					// Gets the stored values and sets them as the current values
					const parsedValue = JSON.parse(value);
					setSelectedIcon(Number.parseInt(parsedValue.selectedIcon));
					setNotifications(parsedValue.notifications);
					setSetting2(parsedValue.setting2);
					setSetting3(parsedValue.setting3);
					setSetting4(parsedValue.setting4);
					setSetting5(parsedValue.setting5);
					setSetting6(parsedValue.setting6);
				} else {
					setSelectedIcon(0);
				}
			} catch (e) {
				// error reading value
				return null;
			}
		};
		if(getData() === null) {
			console.error("Error getting data");
		};
	}, []);

	React.useEffect(() => {
		// Update the stored values when they change
		const jsonData = JSON.stringify({
			selectedIcon: selectedIcon,
			notifications: notifications,
			setting2: setting2,
			setting3: setting3,
			setting4: setting4,
			setting5: setting5,
			setting6: setting6,
		});
		const storeData = async (value) => {
			try {
				await AsyncStorage.setItem(storageKey, value);
			} catch (e) {
				// saving error
				return null;
			}
		};
		if(storeData(jsonData) === null) {
			console.error("Error storing data");
		};
	}, [selectedIcon, notifications, setting2, setting3, setting4, setting5, setting6]);

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
				<View className="w-full flex-row justify-between items-center ">
					<Text className="">Inställing</Text>
					<Switch
						onValueChange={() => setSetting4((prevState) => !prevState)}
						value={setting4}
					/>
				</View>
				<View className="w-full flex-row justify-between items-center ">
					<Text className="">Inställing</Text>
					<Switch
						onValueChange={() => setSetting5((prevState) => !prevState)}
						value={setting5}
					/>
				</View>
			</View>
			<View className="w-11/12 bg-gray-400 rounded-lg mb-6 px-5">
				<View className="w-full flex-row justify-between items-center">
					<Text className="">Alternativa Ikoner</Text>
					<Switch
						onValueChange={() => setSetting6((prevState) => !prevState)}
						value={setting6}
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
/* 
const styles = StyleSheet.create({
	container: {
		height: "100vh",
		flex: 1,
		display: "flex",
		backgroundColor: "#404654",
		alignItems: "center",
		justifyContent: "space-around",
	},
	settingsContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "85vw",
		backgroundColor: "#a4abbd",
		borderRadius: 10,
	},
	settingContainer: {
		display: "flex",
		width: "90%",
	},
	iconsContainer: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
		width: "90vw",
		height: "25vh",
	},
	settingStyling: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		height: "6vh",
		textAlign: "center",
		fontSize: 20,
		color: "black",
	},
	iconImage: {
		width: 80,
		height: 80,
	},
}); */

/* const tailwindStyles = {
	container: "h-screen flex items-center justify-around bg-gray-700",
	settingsContainer: "w-11/12 bg-gray-400 rounded-lg px-5",
	settingContainer: "w-full flex-row justify-between items-center",
	iconsContainer: "flex flex-wrap justify-around items-center h-3/5 bg-black",
	settingStyling: "text-black",
	iconImage: "w-20 h-20",
}; */

/* This is the return without tailwind which worked on web but not phone... */
/* 
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Notifikationer
                        <Switch onValueChange={() => setNotifications(prevState => !prevState)} value={notifications} />
                    </Text>
                </View>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Inställing
                        <Switch onValueChange={() => setSetting2(prevState => !prevState)} value={setting2} />
                    </Text>
                </View>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Inställing
                        <Switch onValueChange={() => setSetting3(prevState => !prevState)} value={setting3} />
                    </Text>
                </View>
            </View>
            <View style={styles.settingsContainer}>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Inställing
                        <Switch onValueChange={() => setSetting4(prevState => !prevState)} value={setting4} />
                    </Text>
                </View>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Inställing
                        <Switch onValueChange={() => setSetting5(prevState => !prevState)} value={setting5} />
                    </Text>
                </View>
            </View>
            <View style={styles.settingsContainer}>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Alternativa Ikoner
                        <Switch onValueChange={() => setSetting6(prevState => !prevState)} value={setting6} />
                    </Text>
                </View>
                <View style={styles.settingContainer}>
                    <Text>Välj vilken ikon som ska visas på din telefon. Bara appens ikon kommer ändras <Text style={{ fontWeight: "bold" }}>inte appens namn</Text></Text>
                </View>
                <View style={styles.iconsContainer}>
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100vh',
        flex: 1,
        display: 'flex',
        backgroundColor: '#404654',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    settingsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '85vw',
        backgroundColor: "#a4abbd",
        borderRadius: 10,
    },
    settingContainer: {
        display: 'flex',
        width: '90%',
    },
    iconsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90vw',
        height: "25vh",
    },
    settingStyling: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: "6vh",
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
    },
    iconImage: {
        width: 80,
        height: 80,
    }
});
*/
