import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { router, useRouter } from "expo-router";

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.backGround}>
            <Image source={require("../assets/images/ChatGPT-Logo-mini.png")} style={styles.logo} />
            <Text style={styles.title}>Welcome to {"\n"} <Text style={{ fontWeight: "bold" }}>ChatGPT</Text></Text>
            <Text style={styles.subtitle}>Ask anything, get your answer</Text>
            <Text style={styles.examplesTitle}><Image source={require("../assets/images/Frame.png")} style={styles.logoexamples} />{"\n"}Examples</Text>
            <View style={styles.examplesContainer}>
                <Text style={styles.exampleCard}>"Explain quantum computing in simple terms"</Text>
                <Text style={styles.exampleCard}>"Got any creative ideas for a 10 year old's birthday?"</Text>
                <Text style={styles.exampleCard}>"How do I make an HTTP request in Javascript?"</Text>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/chat")}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
            
        </View>
    );
}

