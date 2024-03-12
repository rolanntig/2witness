import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text } from 'react-native';

export default function UploadScreen({ navigation }) {
    return (
        <View>
            <Text>Upload</Text>
            <Button
                title="Go to Home"
                onPress={() =>
                    navigation.navigate('Home')
                }
            />
            <StatusBar style="auto" />
        </View>
    );
}