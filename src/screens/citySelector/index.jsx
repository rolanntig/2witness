import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Switch, Image, Pressable, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CitySelector({ navigation }) {
	const [kommuner, setKommun] = React.useState([]);
	const [län, setLän] = React.useState([]);
	const [länAndKommun, setLänAndKommun] = React.useState([]);
	const [favoriteCities, setFavoriteCities] = React.useState();

	const [search, setSearch] = React.useState("");

	const kommunData = require("./georef-sweden-kommun.json");
	const länData = require("./georef-sweden-lan.json");

	const storageKey = "favoriteCities";

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		//! Clear storage for testing purposes
		/* AsyncStorage.clear(); */

		const tempKommunArray = [];
		const tempLänArray = [];

		kommunData.map((commune) => {
			tempKommunArray.push(commune.kom_name);
		});
		länData.map((lan) => {
			tempLänArray.push(lan.lan_name);
		});

		tempKommunArray.sort();
		tempLänArray.sort();

		setKommun(tempKommunArray);
		setLän(tempLänArray);
		setLänAndKommun([...tempLänArray, ...tempKommunArray]);

		console.log(favoriteCities);
		const getData = async () => {
			try {
				const value = await AsyncStorage.getItem(storageKey);
				if (value !== null) {
					const parsedValue = JSON.parse(value);
					setFavoriteCities(parsedValue.favoriteCities);
				}
			} catch (e) {
				return null;
			}
		};
		if (getData() === null) {
			console.error("Error getting data");
		}
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <I very very much dislike this error because I DONT WANT TO CALL THIS OVER AND OVER>
	React.useEffect(() => {
		if (search === "") {
			setLänAndKommun([...län, ...kommuner]);
		} else {
			const temp = [...län, ...kommuner];
			const filtered = temp.filter((item) => {
				return item[0].toLowerCase().includes(search.toLowerCase());
			});
			setLänAndKommun(filtered);
		}
	}, [search]);

	const storeData = async (item) => {
		try {
			if (!favoriteCities) {
				const jsonData = JSON.stringify({ favoriteCities: [item.key] });
				setFavoriteCities([item.key]);
				await AsyncStorage.setItem(storageKey, jsonData);
			} else {
				const unfolded = [...favoriteCities, item.key];
				const updatedCities = unfolded.flat(Number.POSITIVE_INFINITY);
				const jsonData = JSON.stringify({ favoriteCities: updatedCities });
				setFavoriteCities(updatedCities);
				await AsyncStorage.setItem(storageKey, jsonData);
			}
		} catch (e) {
			console.error("Error storing data", e);
		}
	};

	//* Takes in a city name and removes it from the favoriteCities array in AsyncStorage
	const removeData = async (item) => {
		try {
			const unfolded = await favoriteCities.filter((city) => {
				return city !== item.key[0];
			});
			console.log("Removing: ");
			const updatedCities = unfolded.flat(Number.POSITIVE_INFINITY);
			const jsonData = JSON.stringify({ favoriteCities: updatedCities });
			setFavoriteCities(updatedCities);
			await AsyncStorage.setItem(storageKey, jsonData);
		} catch (e) {
			console.error("Error removing data", e);
		}
	};

	return (
		<View className="h-full flex items-center justify-around bg-gray-700">
			{favoriteCities ? (
				<View className="h-2/6 flex-col justify-around">
					<Text className="text-white bg-slate-500 mt-5 mx-4 px-4 py-2 underline text-xl rounded font-bold tracking-wider">
						Favoritstäder:
					</Text>
					<View
						className={`w-11/12 bg-gray-600 rounded-lg h-4/6 flex-row flex-wrap ${
							favoriteCities.length > 5 ? "h-fit" : "h-fit"
						}`}
					>
						{favoriteCities.length === 0 ? (
							favoriteCities.map((city, index) => {
								if (index < 5) {
									return (
										<Text
											className="text-white bg-slate-500 mx-2 p-1 px-2 my-3 w-5/12 rounded"
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
										>
											{city}
										</Text>
									);
								}
								if (index === 6) {
									return (
										<Text className="text-white bg-slate-500 mx-2 p-1 px-2 my-3 w-5/12 rounded">
											{`+${favoriteCities.length - 5}`}
										</Text>
									);
								}
								return null;
							})
						) : (
							<Text className="text-white bg-slate-500 mx-2 p-1 px-2 my-3 w-5/12 rounded">
								Inga favoriter
							</Text>
						)}
					</View>
				</View>
			) : null}
			<TextInput
				placeholder="Sök på stad eller län"
				className="w-7/12 bg-gray-400 rounded-lg px-5 m-3"
				onChangeText={(text) => setSearch(text)}
				onFocus={() => {
					if (search === "") {
						setLänAndKommun([...län, ...kommuner]);
					}
				}}
				onBlur={() => {
					if (search === "") {
						setLänAndKommun([...län, ...kommuner]);
					}
				}}
				value={search}
				keyboardType="default"
			/>
			{/* //* The list currently only loads when the search is empty for some reason, will fix later on */}
			{länAndKommun ? (
				<FlatList
					className="w-6/12"
					data={länAndKommun.map((item, index) => {
						return { key: item, id: index };
					})}
					renderItem={({ item }) => (
						<View>
							{favoriteCities?.includes(`${item.key}`) ? (
								<Pressable
									className="bg-slate-600 rounded p-2 mb-1 w-full"
									onPress={() => removeData(item)}
								>
									<View className="flex-row justify-between mx-1">
										<Text className="text-white">{item.key}</Text>
										{favoriteCities?.includes(`${item.key}`) ? (
											<Text>✔️</Text>
										) : null}
									</View>
								</Pressable>
							) : (
								<Pressable
									className="bg-slate-600 rounded p-2 mb-1 w-full"
									onPress={() => storeData(item)}
								>
									<View className="flex-row justify-between mx-1">
										<Text className="text-white">{item.key}</Text>
										{favoriteCities?.includes(`${item.key}`) ? (
											<Text>✔️</Text>
										) : null}
									</View>
								</Pressable>
							)}
						</View>
					)}
				/>
			) : null}

			<StatusBar style="auto" />
		</View>
	);
}
