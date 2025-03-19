import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../context/authContext/AuthContext";
import { useRouter } from "expo-router";

export default function LoginScreen() {
    const router = useRouter();
    const auth = useContext(AuthContext);

    if (!auth) {
        return <Text>Error: AuthContext no está disponible</Text>;
    }

    const { loginUser } = auth;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage("Por favor completa todos los campos.");
            return;
        }

        setLoading(true);
        setErrorMessage(""); // Limpiar mensaje previo

        try {
            const user = await loginUser(email, password);
            if (user) {
                router.push("/welcome"); // Ajusta la ruta según la navegación de tu app
            } else {
                setErrorMessage("Correo o contraseña incorrectos.");
            }
        } catch (error) {
            setErrorMessage("Ocurrió un error. Intenta nuevamente.");
        }

        setLoading(false);
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#343541" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "white" }}>Iniciar Sesión</Text>

            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10, color: "white" }}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                style={{ borderBottomWidth: 1, marginBottom: 20, padding: 10, color: "white" }}
                secureTextEntry
            />

            {errorMessage ? (
                <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>{errorMessage}</Text>
            ) : null}

            <TouchableOpacity
                onPress={handleLogin}
                style={{
                    backgroundColor: "#10A37F",
                    padding: 15,
                    borderRadius: 5,
                    alignItems: "center"
                }}
                disabled={loading}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                    {loading ? "Iniciando sesión..." : "Ingresar"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/register")} style={{ marginTop: 20 }}>
                <Text style={{ color: "#10A37F", textAlign: "center" }}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>
        </View>
    );
}
