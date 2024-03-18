import { Text, View } from "react-native";
import React from "react";
import { styles } from "../stylesheets/WhiteboardScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";

const WhiteboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>WhiteboardScreen</Text>
    </SafeAreaView>
  );
};

export default WhiteboardScreen;
