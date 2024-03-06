import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text } from 'react-native';

export default function SettingsScreen({ navigation }) {
    return (
        <View style={styles.container}> {/* Does not want to work with tailwind for some reason */}
            <Text className="bg-zinc-600">Settings</Text>
            <Button
                title="Go to Home"
                onPress={() =>
                    navigation.navigate('Home')
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#404654',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
