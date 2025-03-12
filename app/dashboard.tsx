import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Iconos minimalistas
import { styles } from "./styles";
import { router, useRouter } from "expo-router";


export default function Dashboard() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            {/* Opción de nuevo chat */}
            <TouchableOpacity style={styles.newChat} activeOpacity={0.8} onPress={() => router.push("/empty_conversations")}>
                <Icon name="message-square" size={22} color="white" />
                <Text style={styles.newChatText}>New Chat</Text>
                <Icon name="chevron-right" size={22} color="white" />
            </TouchableOpacity>

            {/* Línea divisoria */}
            <View style={styles.divider} />

            {/* Opciones del dashboard */}
            {menuOptions.map((option, index) => (
                <TouchableOpacity key={index} style={styles.option} activeOpacity={0.7}>
                    <Icon name={option.icon} size={22} color="white" />
                    <Text style={styles.optionText}>{option.label}</Text>
                    {option.badge && (
                        <View style={styles.newBadge}>
                            <Text style={styles.badgeText}>{option.badge}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            ))}

            {/* Botón de Logout */}
            <TouchableOpacity style={styles.logout} activeOpacity={0.8}>
                <Icon name="log-out" size={22} color="#E55353" />
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


