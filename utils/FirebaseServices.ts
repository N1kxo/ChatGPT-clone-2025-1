import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";

export const getChats = async () => {
    try {
        console.log("📡 Intentando obtener los chats...");
        
        // Verifica que `db` esté definido
        if (!db) {
            console.error("🔥 Error: Firestore no está inicializado correctamente.");
            return [];
        }

        const chatsCollection = collection(db, "chats");
        const querySnapshot = await getDocs(chatsCollection);

        if (querySnapshot.empty) {
            console.warn("⚠️ No se encontraron chats en la base de datos.");
            return [];
        }

        const chats = querySnapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                id: doc.id,
                create_at: data.create_at ? data.create_at.toDate() : null, // Convierte timestamp
                messages: Array.isArray(data.messages) ? data.messages : [], // Asegura que messages sea un array
                title: data.title || "Sin título", // Si el título no existe, usa un valor por defecto
            };
        });

        console.log("✅ Chats obtenidos:", chats);
        return chats;
    } catch (error) {
        console.error("🔥 Error obteniendo los chats:", error);
        return [];
    }
};


