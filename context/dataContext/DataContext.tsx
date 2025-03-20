import { Chat, Message } from "@/interfaces/AppInterfaces";
import { createContext, useState, useEffect, useContext } from "react";
import { db } from "@/utils/FirebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where, arrayUnion } from "firebase/firestore";
import { AuthContext } from "../authContext/AuthContext"; // Asegúrate de importar tu contexto de autenticación

interface DataContextProps {
    chats: Chat[];
    getChatTitle: (messages: Message[]) => string;
    updateChatTitle: (chatId: string, messages: Message[]) => Promise<void>;
    createChat: (text: string, messages: Message[]) => Promise<void>;
    updateChat: (chatId: string, messages: Message[]) => Promise<void>;
    getChats: () => Promise<void>;
    clearChats: () => Promise<void>;
    addMessageToChat: (chatId: string, newMessage: Message) => Promise<void>;
    sendMessageToChat: (chatId: string, message: Message) => Promise<void>;
}

// Crear el contexto
export const DataContext = createContext<DataContextProps | undefined>(undefined);

// Proveedor del contexto
export const DataProvider = ({ children }: any) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const user = useContext(AuthContext); // Obtener el usuario autenticado

    useEffect(() => {
        if (user?.uid) getChats(); // Solo obtener los chats si hay un usuario autenticado
    }, [user?.uid]);

    const getChatTitle = (messages: Message[]): string => {
        const stopWords = new Set(["the", "is", "in", "on", "at", "a", "an", "and", "or", "for", "to", "with", "about"]);
        const wordCounts: Record<string, number> = {};

        messages.forEach(({ text }) => {
            text.toLowerCase()
                .replace(/[^a-z\s]/g, "")
                .split(/\s+/)
                .forEach((word) => {
                    if (!stopWords.has(word) && word.length > 2) {
                        wordCounts[word] = (wordCounts[word] || 0) + 1;
                    }
                });
        });

        const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
        return sortedWords.slice(0, 2).map(([word]) => word).join(" ") || "Nuevo Chat";
    };

    const updateChatTitle = async (chatId: string, messages: Message[]) => {
        const newTitle = getChatTitle(messages);
        const chatRef = doc(db, "chats", chatId);
        await updateDoc(chatRef, { title: newTitle });
    };

    // 🔹 **Crear un nuevo chat y asociarlo al usuario**
    const createChat = async (title: string, messages: Message[]) => {
        if (!user) return; // No permitir la creación de chats sin usuario autenticado

        try {
            const generatedTitle = getChatTitle(messages);

            const newChat = {
                title: generatedTitle || "Nuevo Chat",
                create_at: new Date(),
                messages,
                userId: user.uid, // Asociamos el chat al usuario autenticado
            };

            const docRef = await addDoc(collection(db, "chats"), newChat);
            setChats([...chats, { id: docRef.id, ...newChat }]);
            console.log("✅ Chat creado con ID:", docRef.id);
        } catch (error) {
            console.error("🔥 Error al crear el chat:", error);
        }
    };

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

    // 🔹 **Obtener solo los chats del usuario autenticado**
    const getChats = async () => {
        if (!user) return; // Evitar que se intente obtener chats sin usuario autenticado

        try {
            console.log("📡 Obteniendo chats del usuario:", user.uid);

            const q = query(collection(db, "chats"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.warn("⚠️ No se encontraron chats para este usuario.");
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

    // 🔹 **Eliminar solo los chats del usuario autenticado**
    const clearChats = async () => {
        if (!user) return;

        try {
            const q = query(collection(db, "chats"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);

            const deletePromises = querySnapshot.docs.map((doc) =>
                deleteDoc(doc.ref)
            );
            await Promise.all(deletePromises);

            setChats([]);
            console.log("✅ Todos los chats del usuario han sido eliminados");
        } catch (error) {
            console.error("🔥 Error al eliminar los chats:", error);
        }
    };

    // **Añadir mensajes a un chat existente**
    const addMessageToChat = async (chatId: string, newMessage: Message) => {
        try {
            const chatRef = doc(db, "chats", chatId);

            await updateDoc(chatRef, {
                messages: arrayUnion(newMessage), // Agregar mensaje sin sobrescribir
            });

            setChats(prevChats =>
                prevChats.map(chat =>
                    chat.id === chatId
                        ? { ...chat, messages: [...chat.messages, newMessage] }
                        : chat
                )
            );

            console.log("✅ Mensaje agregado al chat:", chatId);
        } catch (error) {
            console.error("🔥 Error agregando mensaje:", error);
        }
    };

    // **Enviar mensajes a un chat existente**
    const sendMessageToChat = async (chatId: string, message: Message) => {
        try {
            const chatRef = doc(db, "chats", chatId);
            await updateDoc(chatRef, {
                messages: arrayUnion(message)
            });
            console.log("✅ Mensaje enviado al chat:", chatId);
        } catch (error) {
            console.error("🔥 Error enviando mensaje:", error);
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
                addMessageToChat,
                sendMessageToChat, // 🔹 Corregido el nombre aquí
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
