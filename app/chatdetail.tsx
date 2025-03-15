import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DataContext } from "@/context/dataContext/DataContext"; // Importa el contexto
import { styles } from "./styles";
import { Chat } from "../interfaces/AppInterfaces";

export default function ChatDetailScreen() {
    const { chatId } = useLocalSearchParams(); // ID del chat seleccionado
    const dataContext = useContext(DataContext);

    if (!dataContext) {
        return <Text>Error: DataContext no disponible</Text>;
    }

    const { chats, getChats } = dataContext;
    const [chat, setChat] = useState<Chat | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChat = async () => {
            if (chats.length === 0) {
                await getChats(); // Solo carga si no hay datos en memoria
            }
            const selectedChat = chats.find(chat => chat.id === chatId);
            if (selectedChat) {
                setChat(selectedChat);
            } else {
                console.warn("⚠️ Chat no encontrado. Revisar chatId y Firestore.");
            }
            setLoading(false);
        };

        fetchChat();
    }, [chatId, chats]); // Se ejecuta cuando cambia chatId o la lista de chats

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
