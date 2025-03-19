import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../utils/FirebaseConfig";


interface AuthContextProps {
    user: User | null;
    registerUser: (email: string, password: string) => Promise<User | null>;
    loginUser: (email: string, password: string) => Promise<User | null>;
    logoutUser: () => Promise<void>;
    uid: string;
}

// Crear el contexto
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Verificar si el usuario está autenticado en el inicio de la aplicación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Limpiar el efecto al desmontar
    }, []);

    // Registrar usuario
    const registerUser = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("✅ Usuario registrado:", userCredential.user);
            setUser(userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error("🔥 Error al registrar usuario:", error);
            return null;
        }
    };

    // Iniciar sesión
    const loginUser = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("✅ Usuario autenticado:", userCredential.user);
            setUser(userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error("🔥 Error al autenticar usuario:", error);
            return null;
        }
    };

    // Cerrar sesión
    const logoutUser = async () => {
        try {
            await signOut(auth);
            console.log("✅ Usuario desconectado");
            setUser(null);
        } catch (error) {
            console.error("🔥 Error al cerrar sesión:", error);
        }
    };

    return <AuthContext.Provider 
        value={{
            user,
            registerUser,
            loginUser,
            logoutUser,
            uid: user?.uid || ""}}>
            {children}
        </AuthContext.Provider>
};
