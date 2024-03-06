import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text } from 'react-native';

export default function InfoScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Info</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
