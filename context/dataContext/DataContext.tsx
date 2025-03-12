import { Chat, Message } from "@/interfaces/AppInterfaces";
import { createContext, useState, useEffect } from "react";
import { db } from "@/utils/FirebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";


interface DataContextProps {
    chats: Chat[];
    createChat: (text: string, messages: Message[]) => Promise<void>;
    updateChat: (chatId: string, messages: Message[]) => Promise<void>;
    getChats: () => Promise<void>;
}

// Crear el contexto
export const DataContext = createContext<DataContextProps | undefined>(undefined);

// Proveedor del contexto
export const DataProvider = ({ children }: any) => {
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        getChats();
    }, []);

    // Crear un nuevo chat en Firestore
    const createChat = async (title: string, messages: Message[]) => {
        try {
            const newChat = {
                title,
                create_at: new Date(),
                messages,
            };

            const docRef = await addDoc(collection(db, "chats"), newChat);
            setChats([...chats, { id: docRef.id, ...newChat }]);
            console.log("✅ Chat creado con ID:", docRef.id);
        } catch (error) {
            console.error("🔥 Error al crear el chat:", error);
        }
    };

    // Actualizar un chat existente en Firestore
    const updateChat = async (chatId: string, messages: Message[]) => {
        try {
            const chatRef = doc(db, "chats", chatId);
            await updateDoc(chatRef, { messages });

            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === chatId ? { ...chat, messages } : chat
                )
            );

            console.log("✅ Chat actualizado:", chatId);
        } catch (error) {
            console.error("🔥 Error actualizando el chat:", error);
        }
    };

    // Obtener todos los chats desde Firestore
    const getChats = async () => {
        try {
            console.log("📡 Obteniendo chats...");

            const chatsCollection = collection(db, "chats");
            const querySnapshot = await getDocs(chatsCollection);

            if (querySnapshot.empty) {
                console.warn("⚠️ No se encontraron chats en la base de datos.");
                setChats([]);
                return;
            }

            const fetchedChats: Chat[] = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    create_at: data.create_at ? data.create_at.toDate() : null,
                    messages: Array.isArray(data.messages) ? data.messages : [],
                    title: data.title || "Sin título",
                };
            });

            setChats(fetchedChats);
            console.log("✅ Chats obtenidos:", fetchedChats);
        } catch (error) {
            console.error("🔥 Error obteniendo los chats:", error);
        }
    };

    return (
        <DataContext.Provider value={{ chats, createChat, updateChat, getChats }}>
            {children}
        </DataContext.Provider>
    );
};
