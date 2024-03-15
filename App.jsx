import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import CameraScreen from "./src/screens/homeScreen";
import MapScreen from "./src/screens/mapScreen";
import SettingsScreen from "./src/screens/settingsScreen";
import InfoScreen from "./src/screens/infoScreen";
import ProfileScreen from "./src/screens/profileScreen";
import LoginScreen from "./src/screens/loginScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Camera"
			screenOptions={{
				tabBarActiveTintColor: "#e91e63",
			}}
		>
			<Tab.Screen
				name="Info"
				component={InfoScreen}
				options={{
					tabBarLabel: "Info",
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="infocirlceo" color={color} size={size} />
					),
				}}
			/>

			<Tab.Screen
				name="Login"
				component={LoginScreen}
				options={{
					tabBarLabel: "Login",
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="login" color={color} size={size} />
					),
				}}
			/>

			

			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarLabel: "profile",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Camera"
				component={CameraScreen}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="camera" color={color} size={size} />
					),
				}}
			/>

			<Tab.Screen
				name="map"
				component={MapScreen}
				options={{
					tabBarLabel: "map",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="map" color={color} size={size} />
					),
				}}
			/>

			<Tab.Screen
				name="settings"
				component={SettingsScreen}
				options={{
					tabBarLabel: "setting",
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="setting" color={color} size={size} />
					),
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<MyTabs />
		</NavigationContainer>
	);
}
