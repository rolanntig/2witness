import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Image, TextInput } from "react-native";

export default function ProfileScreen({ navigation }) {
	return (
		<View className="flex-1 bg-[#F6F5F5]">
			<ScrollView>
				<View className="border mt-5 mr-5 ml-5 mb-10 h-36  flex-row justify-evenly items-center">
					<View>
						<Image
							width={120}
							height={120}
							source={{ uri: "https://www.w3schools.com/w3images/avatar2.png" }}
							className="rounded-full"
						/>
					</View>
					<View>
						<Text className="text-lg">Florri Gonzonos</Text>
					</View>
				</View>
				<View className="gap-y-10 h-auto">

					<View className="border bg-[#353e4c] rounded-md m-3">
						<View className="m-5">
							<Text className="text-s text-white font-medium">Namn</Text>
							<View className="border-b-2 pt-2 ">
								<TextInput className="text-xl pb-1 text-white">Florri</TextInput>
							</View>
						</View>
						<View className="m-5">
							<Text className="text-s text-white font-medium">Efternamn</Text>
							<View className="border-b-2 pt-2 ">
								<TextInput className="text-xl pb-1 text-white">Gonzonos</TextInput>
							</View>
						</View>
						<View className="m-5">
							<Text className="text-s text-white font-medium">E-postadress</Text>
							<View className="border-b-2 pt-2 ">
								<TextInput className="text-xl pb-1 text-white ">
									Florri.Gonzonos@fakemail.com
								</TextInput>
							</View>
						</View>
					</View>

					<View className="border bg-[#353e4c]  rounded-md m-3">
						<View className="m-5">
							<Text className="text-s text-white font-medium">Mobilnummer</Text>
							<View className="border-b-2 pt-2 ">
								<TextInput className="text-xl pb-1 text-white">+46 01859182</TextInput>
							</View>
						</View>
						<View className="m-5">
							<Text className="text-s text-white font-medium">Hemnummer</Text>
							<View className="border-b-2 pt-2 ">
								<TextInput className="text-xl pb-1 text-white">+46 01859182</TextInput>
							</View>
						</View>
						<View className="m-5">
							<Text className="text-s text-white font-medium">Arbetsnummer</Text>
							<View className="border-b-2 pt-2 ">
								<TextInput className="text-xl pb-1 text-white">+46 01859182</TextInput>
							</View>
						</View>
					</View>
				</View>
				<StatusBar style="auto" />
			</ScrollView>
		</View>
	);
}

//Todo Add ChatPage
//Todo Add IdCardPage
