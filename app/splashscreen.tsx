import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "expo-router";

export default function SplashScreen() {
    return (
        <View style={styles.backGround}>
        <Image source={require('../assets/images/ChatGPT-logo.png')} />
</View>

    )
}

