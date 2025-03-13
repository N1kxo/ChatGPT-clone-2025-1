import { AuthProvider } from "@/context/authContext/AuthContext";
import { DataProvider } from "@/context/dataContext/DataContext";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <DataProvider>
        <Stack>
          <Stack.Screen name="splashscreen" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen name="chatlist" options={{ headerShown: false }} />
          <Stack.Screen name="chatdetail" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
      </DataProvider>
    </AuthProvider>
  );
}
