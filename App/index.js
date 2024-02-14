/* eslint-disable no-use-before-define */
/* eslint-disable react/style-prop-object */
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { registerRootComponent } from "expo";
import HomeScreen from "./screens/HomeScreen";
import TotalsScreen from "./screens/TotalsScreen";
import WhiteboardScreen from "./screens/WhiteboardScreen";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Totals" component={TotalsScreen} />
          <Tab.Screen name="Whiteboard" component={WhiteboardScreen} />
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>
    //     Open up App.js to start working on your app! Paul Alvin V. Sacedor Love
    //     Dianne Joy Adobo
    //   </Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

registerRootComponent(App);
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "cyan",
    alignItems: "center",
    justifyContent: "center",
  },
});
