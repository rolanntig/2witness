import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	View,
	Button,
	Text,
	ScrollView,
	FlatList,
} from "react-native";

//Todo Add FlatList to the images
//Todo Add CheckBox to the images
//Todo Add ChatPage
//Todo Add IdCardPage

export default function ProfileScreen({ navigation }) {
	return (
		//* Main Container
		<View style={styles.container}>
			<ScrollView>
				{/* Top Button Container */}
				<View style={styles.topButtonContainer}>
					{/* Id Card Button */}
					<View style={styles.idCard}>
						<Button
							title="Anonymt Kort"
							onPress={() => navigation.navigate("Home")}
						/>
					</View>

					{/* Chat Button */}
					<View style={styles.chatButton}>
						<Button title="Chat" onPress={() => navigation.navigate("Home")} />
					</View>
				</View>

				{/* Top Text */}
				<View style={styles.topText}>
					<Text style={styles.topTextLook}>
						Du är alltid anonym när du använder 2witness, alla chatter är
						krypterade. Samarbete med polis och rättväsende kan hjälpa
						inrapporterande brott
					</Text>
				</View>
				<View style={styles.imgContainer}>
					<View style={styles.imgContainerCheckButton}>
						<Text>CheckBox</Text>
						<Text style={styles.checkBoxText}>
							Vill du bli anonymt kontaktad angående detta material
						</Text>
					</View>
					<FlatList>
						<View style={styles.insideImgContainer}>
							<Text>Image Container</Text>
							<Text>Image Container</Text>
							<Text>Image Container</Text>
							<Text>Image Container</Text>
							<Text>Image Container</Text>
							<Text>Image Container</Text>
							<Text>Image Container</Text>
						</View>
					</FlatList>
				</View>
				<View style={styles.timeReminderContainer}>
					<Text> Raderingen sker automatisk inom </Text>
					<Text> 9d:23h:32min</Text>
				</View>

				<View style={styles.deleteHistoryButton}>
					<Button
						title="Radera Historik"
						onPress={() => navigation.navigate("Home")}
					/>
				</View>
				<StatusBar style="auto" />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	topButtonContainer: {
		margin: 10,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	idCard: {
		borderWidth: 1,
		borderColor: "thistle",
		height: 70,
		width: 150,
		justifyContent: "center",
	},
	chatButton: {
		borderWidth: 1,
		borderColor: "thistle",
		height: 70,
		width: 150,
		justifyContent: "center",
	},
	insideImgContainer: {
		borderWidth: 1,
		borderColor: "thistle",
		height: 200,
		width: 410,
	},
	imgContainer: {
		borderWidth: 1,
		borderColor: "thistle",
		height: 500,
		marginTop: 20,
		marginBottom: 10,
		marginRight: 10,
		marginLeft: 10,
	},
	deleteHistoryButton: {
		borderWidth: 1,
		borderColor: "thistle",
		height: 70,
		justifyContent: "center",
		marginRight: 10,
		marginLeft: 10,
	},
	topText: {
		marginTop: 20,
		marginBottom: 20,
		marginRight: 10,
		marginLeft: 10,
		borderWidth: 1,
		borderColor: "thistle",
		width: 410,
		height: 90,
		justifyContent: "center",
		alignItems: "center",
	},
	topTextLook: {
		fontSize: 15,
		fontWeight: "bold",
	},
	imgContainerCheckButton: {
		borderBottomWidth: 1,
		borderColor: "thistle",
		height: 70,
		justifyContent: "space-evenly",
		alignItems: "center",
		flexDirection: "row",
	},
	checkBoxText: {
		fontSize: 12,
		fontWeight: "bold",
	},
	timeReminderContainer: {
		marginTop: 10,
		marginRight: 10,
		marginLeft: 10,
		borderWidth: 1,
		borderColor: "thistle",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
});
