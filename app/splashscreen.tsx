import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useRouter } from "expo-router";

export default function SplashScreen() {
    const router = useRouter();
    return (
        <View style={styles.backGround}>
        <TouchableOpacity onPress={() => router.push("/welcome")}>
        <Image source={require('../assets/images/ChatGPT-logo.png')} />
        </TouchableOpacity>
</View>

    )
}

