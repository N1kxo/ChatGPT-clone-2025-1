import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Íconos minimalistas
import { styles } from "./styles";
import { APIResponse } from '../interfaces/Responses';
import { useRouter } from "expo-router";
import { DataContext } from "@/context/dataContext/DataContext";
import { Message } from "../interfaces/AppInterfaces";

export default function Chat() {
    const router = useRouter();
    const dataContext = useContext(DataContext)

    if (!dataContext) {
        return <Text>Error: DataContext no disponible</Text>;
    }

    const { createChat } = dataContext;

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);

    const getResponse = async () => {
        if (!message.trim()) return;

        const userMessage = { text: message, sender: "user" };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        setMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC5nQZ-mIOPANbSdmfu3c6EySC1Ma4KLT0", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    contents: [{ parts: [{ text: message }] }]
                })
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data: APIResponse = await response.json();
            const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";

            const newBotMessage = { text: botResponse, sender: "bot" };

            setMessages(prevMessages => [...prevMessages, newBotMessage]);

            const updatedMessages: Message[] = [
                ...messages, // Mensajes anteriores
                { text: message, sender_by: "Me", date: new Date(), state: "Sent" },
                { text: botResponse, sender_by: "Bot", date: new Date(), state: "Sent" }
            ];

             // Guardar el chat en Firestore
             await createChat("Nuevo Chat", updatedMessages);
            
        } catch (error) {
            console.log("Error en getResponse", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.backGround}>
            {/* Barra superior */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.push("/welcome")}>
                    <Icon name="arrow-left" size={24} color="white" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/dashboard")}>
                    <Image source={require("../assets/images/ChatGPT-Logo-mini.png")} style={styles.logo} />
                </TouchableOpacity>
            </View>

            {/* ScrollView para mostrar mensajes */}
            <ScrollView style={{ flex: 1, padding: 10 }}>
                {messages.map((msg, index) => (
                    <View 
                        key={index} 
                        style={[styles.messageBubble, msg.sender === "user" ? styles.userBubble : styles.botBubble]}
                    >
                        <Text style={styles.messageText}>{msg.text}</Text>
                    </View>
                ))}
                
                {/* Animación de carga */}
                {isLoading && (
                    <View style={[styles.messageBubble, styles.botBubble]}>
                        <Text style={styles.messageText}>...</Text>
                    </View>
                )}
            </ScrollView>

            {/* Input para escribir mensajes */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Type a message..."
                    placeholderTextColor="#A0A0A0"
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={getResponse} disabled={isLoading}>
                    <Icon name="send" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
