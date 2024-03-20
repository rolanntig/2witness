import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Switch, Image, Pressable, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function CitySelector({ navigation }) {
	const [kommuner, setKommun] = React.useState([]);
	const [län, setLän] = React.useState([]);
	const [länAndKommun, setLänAndKommun] = React.useState([]);

	const [search, setSearch] = React.useState("");

	const kommunData = require("./georef-sweden-kommun.json");
	const länData = require("./georef-sweden-lan.json");

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
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
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <I very very much dislike this error because I DONT WANT TO CALL THIS OVER AND OVER>
	React.useEffect(() => {
		if (search === "") {
			setLänAndKommun([...län, ...kommuner]);
		} else {
			const filtered = länAndKommun.filter((item) => {
				return item[0].toLowerCase().includes(search.toLowerCase());
			});
			setLänAndKommun(filtered);
		}
	}, [search]);

	return (
		<View className="flex-1 bg-[#F6F5F5]">
			<Text className="text-3xl text-center mt-10">Välkommen till</Text>
			<Text className="text-3xl text-center">Stockholm</Text>
			<TextInput
				placeholder="Sök på stad eller län"
				onChangeText={(text) => setSearch(text)}
				value={search}
				keyboardType="default"
			/>
			{/* //* The list currently only loads when the search is empty for some reason, will fix later on */}
			<FlatList
				data={länAndKommun.map((item, index) => {
					return { key: item };
				})}
				renderItem={({ item }) => <Text>{item.key}</Text>}
			/>

			<StatusBar style="auto" />
		</View>
	);
}
