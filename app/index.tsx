import { useRouter } from "expo-router";
import { Button, Text, View, StyleSheet } from "react-native";
import { styles } from "./styles";

export default function Index() {
  
  const router = useRouter();

  return (
    <View
      style={styles.backGround}
    >
      <Button title="Screens" onPress={() => router.push("/splashscreen")}/>
      <Button title="Register" onPress={() => router.push("/register")}/>
      <Button title="Login" onPress={() => router.push("/login")}/>  
    </View>
  );
}
