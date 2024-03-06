import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/homeScreen';
import SettingsScreen from './src/screens/settingsScreen';
import InfoScreen from './src/screens/infoScreen';
import MapScreen from './src/screens/mapScreen';
import UploadScreen from './src/screens/uploadScreen';
import ProfileScreen from './src/screens/profileScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;