import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getChats } from "../utils/FirebaseServices"; // Asegúrate de importar tu función correctamente
import { styles } from "./styles";
import { Chat } from "../interfaces/AppInterfaces";

export default function ChatDetailScreen() {
    const { chatId } = useLocalSearchParams(); // ID del chat seleccionado


    const [chat, setChat] = useState<Chat | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("📌 chatId recibido:", chatId); // Verifica si chatId tiene un valor correcto
        const fetchChat = async () => {
            try {
                const chats = await getChats();
                console.log("📌 Chats obtenidos de Firestore:", chats); // Verifica los datos obtenidos
    
                const selectedChat = chats.find(chat => chat.id === chatId);    
                if (selectedChat) {
                    setChat(selectedChat);
                } else {
                    console.warn("⚠️ Chat no encontrado. Revisar chatId y Firestore.");
                }
            } catch (error) {
                console.error("🚨 Error obteniendo el chat:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchChat();
    }, [chatId]);
    

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!chat) {
        return (
            <View style={styles.chatDetailContainer}>
                <Text style={styles.title}>Chat no encontrado</Text>
            </View>
        );
    }

    return (
        <View style={styles.chatDetailContainer}>
            <Text style={styles.title}>Chat Detail</Text>
            <Text style={styles.chatId}>Chat ID: {chat.id}</Text>
            <Text style={styles.chatDateText}>
                Creado el: {chat.create_at ? chat.create_at.toLocaleString() : "Fecha no disponible"}
            </Text>

            <Text style={styles.chatText}>Mensajes:</Text>
            {chat.messages.length > 0 ? (
                <FlatList
                data={chat.messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.sender}>{item.sender_by}</Text> 
                        <Text style={styles.message}>{item.text}</Text>  
                        <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text> 
                    </View>
                )}
            />
            
            ) : (
                <Text style={styles.noMessages}>No hay mensajes en este chat.</Text>
            )}
        </View>
    );
}
