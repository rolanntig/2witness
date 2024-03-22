import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import CameraScreen from "./src/screens/homeScreen";
import MapScreen from "./src/screens/mapScreen";
import SettingsScreen from "./src/screens/settingsScreen";
import InfoScreen from "./src/screens/infoScreen";
import ProfileScreen from "./src/screens/profileScreen";
import LoginScreen from "./src/screens/loginScreen";
import CitySelector from "./src/screens/citySelector";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

//* This was added to make it possible to navigate to diffrent screens without adding them to the navbar at the bottom
//* If something isn't correct @MyNameJaeff and i will fix it as soon as possible
function HomeStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={MyTabs}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="CitySelector" component={CitySelector} />
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<HomeStack />
		</NavigationContainer>
	);
}
