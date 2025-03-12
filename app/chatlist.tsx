import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { getChats } from "../utils/FirebaseServices";
import { styles } from "./styles";

export default function ChatListScreen() {
    const router = useRouter();
    const [chats, setChats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            const chatsData = await getChats();
            console.log("Chats obtenidos:", chatsData);
            setChats(chatsData);
            setLoading(false);
        };

        fetchChats();
    }, []);

    return (
        <View style={styles.chatListContainer}>
            <Text style={styles.title}>Chats</Text>

            {loading ? (
                <ActivityIndicator size="large" color="white" />
            ) : (
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
            )}
        </View>
    );
}
