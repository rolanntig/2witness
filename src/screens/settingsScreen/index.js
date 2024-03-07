import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Switch, Image } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen({ navigation }) {
    const [notifications, setNotifications] = useState(false);
    const [setting2, setSetting2] = useState(false);
    const [setting3, setSetting3] = useState(false);
    const [setting4, setSetting4] = useState(false);
    const [setting5, setSetting5] = useState(false);
    const [setting6, setSetting6] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Notifikationer
                        <Switch onValueChange={() => setNotifications(prevState => !prevState)} value={notifications} />
                    </Text>
                </View>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Inställing
                        <Switch onValueChange={() => setSetting2(prevState => !prevState)} value={setting2} />
                    </Text>
                </View>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Inställing
                        <Switch onValueChange={() => setSetting3(prevState => !prevState)} value={setting3} />
                    </Text>
                </View>
            </View>
            <View style={styles.settingsContainer}>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Inställing
                        <Switch onValueChange={() => setSetting4(prevState => !prevState)} value={setting4} />
                    </Text>
                </View>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Inställing
                        <Switch onValueChange={() => setSetting5(prevState => !prevState)} value={setting5} />
                    </Text>
                </View>
            </View>
            <View style={styles.settingsContainer}>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingStyling}>
                        Alternativa Ikoner
                        <Switch onValueChange={() => setSetting6(prevState => !prevState)} value={setting6} />
                    </Text>
                </View>
                <View style={styles.settingContainer}>
                    <Text>Välj vilken ikon som ska visas på din telefon. Bara appens ikon kommer ändras <Text style={{ fontWeight: "bold" }}>inte appens namn</Text></Text>
                </View>
                <View style={styles.iconsContainer}>
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                    <Image source={{ uri: "https://i.pinimg.com/736x/e6/e9/3f/e6e93f7bd4f95000d9f56a3c096047d0.jpg", }} style={styles.iconImage} />
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        display: 'flex',
        backgroundColor: '#404654',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    settingsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        backgroundColor: "#a4abbd",
        borderRadius: 10,
    },
    settingContainer: {
        display: 'flex',
        width: '90%',
    },
    iconsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        height: "25vh",
    },
    settingStyling: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: "6vh",
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
    },
    iconImage: {
        width: 80,
        height: 80,
    }
});
