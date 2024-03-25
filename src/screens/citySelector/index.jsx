import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, TextInput } from "react-native";
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <I dont want this to refresh, only want to run it once>
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
			const updatedCities = unfolded.flat(Number.POSITIVE_INFINITY);
			const jsonData = JSON.stringify({ favoriteCities: updatedCities });
			setFavoriteCities(updatedCities);
			await AsyncStorage.setItem(storageKey, jsonData);
		} catch (e) {
			console.error("Error removing data", e);
		}
	};

	const CityButton = ({ item }) => {
		return (
			<View>
				{favoriteCities?.includes(`${item.key}`) ? (
					<Pressable
						className="bg-slate-300 rounded p-2 mb-1 w-full"
						onPress={() => removeData(item)}
					>
						<View className="flex-row justify-between mx-1">
							<Text className="">{item.key}</Text>
							{favoriteCities?.includes(`${item.key}`) ? (
								<Text className="text-white">✅</Text>
							) : null}
						</View>
					</Pressable>
				) : (
					<Pressable
						className="bg-slate-300 rounded p-2 mb-1 w-full"
						onPress={() => storeData(item)}
					>
						<View className="flex-row justify-between mx-1">
							<Text className="">{item.key}</Text>
							{favoriteCities?.includes(`${item.key}`) ? <Text>✔️</Text> : null}
						</View>
					</Pressable>
				)}
			</View>
		);
	};

	return (
		<View className="h-screen flex items-center bg-gray-700">
			{favoriteCities ? (
				<View className="h-2/6 flex-col justify-around">
					<View className="bg-gray-400 mt-5 mx-4 px-4 py-2 rounded">
						<Text className="bg-slate-300 p-1 rounded pl-3 underline text-xl font-bold tracking-wider">
							Favoritstäder:
						</Text>
					</View>
					<View
						className={
							"w-11/12 bg-gray-400 rounded-lg h-4/6 flex-row flex-wrap"
						}
					>
						{favoriteCities.length === 0 ? (
							<Text className="bg-slate-300 px-8 mx-4 p-1 my-3 w-10/12 text-center text-xl rounded">
								Inga favoriter
							</Text>
						) : (
							favoriteCities.map((city, index) => {
								if (index < 5) {
									return (
										<Pressable
											// biome-ignore lint/suspicious/noArrayIndexKey: <I want to use index as a key because its easy>
											key={index}
											onPress={() => removeData({ key: [city] })}
											className={`bg-slate-300 mx-2 p-1 my-3 ${
												favoriteCities.length === 1
													? "w-10/12 px-8 mx-4"
													: "w-5/12 px-2"
											} rounded`}
										>
											<Text
												// biome-ignore lint/suspicious/noArrayIndexKey: <I want to use index as a key because its easy>
												key={index}
											>
												{city}
											</Text>
										</Pressable>
									);
								}
								if (index === 5) {
									return (
										<Pressable
											key={"6thPos"}
											onPress={() => {
												if (favoriteCities.length <= 6) {
													removeData({ key: [favoriteCities[5]] });
												}
											}}
											className="bg-slate-300 mx-2 p-1 px-2 my-3 w-5/12 rounded"
										>
											<Text>
												{favoriteCities.length > 6
													? `+${favoriteCities.length - 5}`
													: favoriteCities[5]}
											</Text>
										</Pressable>
									);
								}
								return null;
							})
						)}
					</View>
				</View>
			) : null}
			<TextInput
				placeholder="Sök på stad eller län"
				className="w-7/12 bg-gray-300 rounded-lg px-5 m-5 mt-10"
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
			{länAndKommun ? (
				<FlatList
					className="w-6/12 flex-grow-0 h-2/5"
					data={länAndKommun.map((item, index) => {
						return { key: item, id: index };
					})}
					renderItem={({ item }) => <CityButton item={item} />}
				/>
			) : null}
			<StatusBar style="auto" />
		</View>
	);
}
