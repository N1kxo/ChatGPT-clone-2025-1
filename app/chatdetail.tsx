import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DataContext } from "@/context/dataContext/DataContext";
import { styles } from "./styles";
import { Chat, Message } from "../interfaces/AppInterfaces";
import { AuthContext } from "@/context/authContext/AuthContext";

export default function ChatDetailScreen() {
    const { chatId } = useLocalSearchParams(); 
    const dataContext = useContext(DataContext);

    // Verificar si el contexto está disponible
    if (!dataContext || !AuthContext) {
        return <Text>Error: Contextos no disponibles</Text>;
    }

    // Extraer valores del contexto
    const user = AuthContext;
    const { chats, getChats, sendMessageToChat } = dataContext;
    const [chat, setChat] = useState<Chat | null>(null);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");

    // Obtener el chat al montar el componente
    useEffect(() => {
        const fetchChat = async () => {
            setLoading(true);

            // Asegurar que `chatId` sea una string
            const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;
            if (!chatIdString) {
                console.error("⚠️ Error: `chatId` no válido.");
                setLoading(false);
                return;
            }

            if (chats.length === 0) {
                await getChats();
            }

            const selectedChat = chats.find((chat) => chat.id === chatIdString);
            setChat(selectedChat || null);

            setLoading(false);
        };

        fetchChat();
    }, [chatId, chats, getChats]);

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

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;

        // Asegurar que `chatId` sea una string
        const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;
        if (!chatIdString) return;

        const message: Message = {
            sender_by: user?.name || "Me",
            text: newMessage,
            date: new Date().toISOString()
        };

        try {
            await sendMessageToChat(chatIdString, message);
            
            // Actualizar el estado local sin recargar todos los chats
            setChat((prevChat) => prevChat ? { ...prevChat, messages: [...prevChat.messages, message] } : prevChat);
            setNewMessage("");
        } catch (error) {
            console.error("🔥 Error al enviar el mensaje:", error);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.chatDetailContainer} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <FlatList
                data={chat.messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View 
                        style={[
                            styles.messageContainer, 
                            item.sender_by === user?.name ? styles.userBubble : styles.botBubble
                        ]}
                    >
                        <Text style={styles.sender}>{item.sender_by}</Text> 
                        <Text style={styles.message}>{item.text}</Text>  
                        <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text> 
                    </View>
                )}
                inverted // Para que los mensajes nuevos aparezcan abajo
            />

            {/* Campo de entrada y botón de enviar */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
