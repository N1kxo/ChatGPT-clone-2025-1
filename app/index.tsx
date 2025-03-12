import { useRouter } from "expo-router";
import { Button, Text, View, StyleSheet } from "react-native";
import { styles } from "./styles";

export default function Index() {
  
  const router = useRouter();

  return (
    <View
      style={styles.backGround}
    >
      <Button title="Screens" onPress={() => router.push("/welcome")}/>
    </View>
  );
}
