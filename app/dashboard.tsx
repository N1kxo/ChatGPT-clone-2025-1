import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { DataContext } from "@/context/dataContext/DataContext";
import { AuthContext } from "@/context/authContext/AuthContext";

export default function Dashboard() {
    const router = useRouter();
    const dataContext = useContext(DataContext);
    const authContext = useContext(AuthContext);

    if (!dataContext || !authContext) {
        return <Text>Error: Contextos no disponibles</Text>;
    }

    const { chats, getChats, clearChats } = dataContext;
    const { logoutUser} = authContext;

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchChats = async () => {
            await getChats();
            setLoading(false);
        };
        fetchChats();
    }, []);

    // Función para confirmar y limpiar las conversaciones
    const handleClearChats = async () => {
        Alert.alert("Clear conversations", "Are you sure you want to clear all conversations?", [
            { text: "Cancel", style: "cancel" },
            { text: "Confirm", onPress: async () => {
                await clearChats();
            }}
        ]);
    };

    // Función para cerrar sesión
    const handleLogout = async () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Confirm", onPress: async () => {
                await logoutUser();
            }}
        ]);
    };

    return (
        <View style={styles.container}>
            {/* Botón de Nuevo Chat */}
            <TouchableOpacity style={styles.newChat} activeOpacity={0.8} onPress={() => router.push("/chat")}>
                <Icon name="message-square" size={20} color="white" />
                <Text style={styles.newChatText}>New Chat</Text>
                <Icon name="chevron-right" size={20} color="white" />
            </TouchableOpacity>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            {/* Lista de chats */}
            {loading ? (
                <ActivityIndicator size="large" color="white" />
            ) : chats.length > 0 ? (
                <FlatList
                    data={chats}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.chatItem}
                            onPress={() => router.push({ pathname: "/chatdetail", params: { chatId: item.id } })}
                        >
                            <Text style={styles.chatText}>{item.title || "Chat sin nombre"}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={styles.noChatsText}>No chats yet</Text>
            )}

            {/* Línea divisoria */}
            <View style={styles.divider} />

            {/* Opciones del Dashboard */}
            {menuOptions.map((option, index) => (
                <TouchableOpacity key={index} style={styles.option} activeOpacity={0.7} onPress={() => {
                    if (option.label === "Clear conversations") {
                        handleClearChats();
                    }
                }}>
                    <Icon name={option.icon} size={20} color="white" />
                    <Text style={styles.optionText}>{option.label}</Text>
                    {option.badge && (
                        <View style={styles.newBadge}>
                            <Text style={styles.badgeText}>{option.badge}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            ))}

            {/* Botón de Logout */}
            <TouchableOpacity style={styles.logout} activeOpacity={0.8} onPress={handleLogout}>
                <Icon name="log-out" size={20} color="#E55353" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

// Lista de opciones del menú
const menuOptions = [
    { label: "Clear conversations", icon: "trash-2" },
    { label: "Upgrade to Plus", icon: "user", badge: "NEW" },
    { label: "Light mode", icon: "sun" },
    { label: "Updates & FAQ", icon: "info" }
];
