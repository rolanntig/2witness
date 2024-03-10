import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text } from 'react-native';

export default function ProfileScreen({ navigation }) {
	return (
		<View style={styles.container}>
		  <Text>Profile</Text>
		  <Button
			title="Go to Home"
			onPress={() => navigation.navigate('Home')}
		  />
		  <StatusBar style="auto" />
		</View>
	  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


