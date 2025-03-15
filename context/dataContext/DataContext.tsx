import { Chat, Message } from "@/interfaces/AppInterfaces";
import { createContext, useState, useEffect } from "react";
import { db } from "@/utils/FirebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";


interface DataContextProps {
    chats: Chat[];
    getChatTitle: (messages: Message[]) => string;
    updateChatTitle: (chatId: string, messages: Message[]) => Promise<void>;
    createChat: (text: string, messages: Message[]) => Promise<void>;
    updateChat: (chatId: string, messages: Message[]) => Promise<void>;
    getChats: () => Promise<void>;
    clearChats: () => Promise<void>;
}

// Crear el contexto
export const DataContext = createContext<DataContextProps | undefined>(undefined);

// Proveedor del contexto
export const DataProvider = ({ children }: any) => {
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        getChats();
    }, []);

    // Obtener las palabras más repetidas dentro del chat

    const getChatTitle = (messages: Message[]): string => {
        const stopWords = new Set(["the", "is", "in", "on", "at", "a", "an", "and", "or", "for", "to", "with", "about"]); // Palabras comunes que no queremos
        const wordCounts: Record<string, number> = {};
    
        messages.forEach(({ text }) => {
            text.toLowerCase()
                .replace(/[^a-z\s]/g, "") // Quitar signos de puntuación
                .split(/\s+/) // Separar por espacios
                .forEach((word) => {
                    if (!stopWords.has(word) && word.length > 2) { // Ignorar palabras cortas y comunes
                        wordCounts[word] = (wordCounts[word] || 0) + 1;
                    }
                });
        });
    
        const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]); // Ordenar por frecuencia
        const title = sortedWords.slice(0, 2).map(([word]) => word).join(" "); // Tomar las 2 palabras más frecuentes
        return title || "Nuevo Chat";
    };

    // Actualizar el título de un chat en Firestore

    const updateChatTitle = async (chatId: string, messages: Message[]) => {
        const newTitle = getChatTitle(messages);
    
        const chatRef = doc(db, "chats", chatId);
        await updateDoc(chatRef, { title: newTitle });
    };
    

    // Crear un nuevo chat en Firestore
    const createChat = async (title: string, messages: Message[]) => {
        try {
            const generatedTitle = getChatTitle(messages);

            const newChat = {
                title: generatedTitle || "Nuevo Chat",
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
            const updatedTitle = getChatTitle(messages);
            
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
                    messages: data.messages ?? [],
                    title: data.title || "Sin título",
                };
            });

            setChats(fetchedChats);
            console.log("✅ Chats obtenidos:", fetchedChats);
        } catch (error) {
            console.error("🔥 Error obteniendo los chats:", error);
        }
    };

    // Limpiar todos los chats

    const clearChats = async () => {
        try {
            const chatsCollection = collection(db, "chats");
            const querySnapshot = await getDocs(chatsCollection);
    
            // Eliminar cada chat de la base de datos
            const deletePromises = querySnapshot.docs.map((doc) =>
                deleteDoc(doc.ref)
            );
            await Promise.all(deletePromises);
    
            // Limpiar el estado local
            setChats([]);
    
            console.log("✅ Todas las conversaciones han sido eliminadas");
        } catch (error) {
            console.error("🔥 Error al eliminar las conversaciones:", error);
        }
    };
    

    return (
        <DataContext.Provider
        value={{
             chats, 
             getChatTitle,
             updateChatTitle,
             createChat, 
             updateChat, 
             getChats,
             clearChats,
             }}
             >
            {children}
        </DataContext.Provider>
    );
};
