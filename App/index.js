/* eslint-disable no-use-before-define */
/* eslint-disable react/style-prop-object */
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { registerRootComponent } from "expo";
import HomeScreen from "./screens/HomeScreen";
import TotalsScreen from "./screens/TotalsScreen";
import WhiteboardScreen from "./screens/WhiteboardScreen";
import Colors from "./constants/Color";
import { Icon } from "@rneui/themed";
import { color } from "@rneui/base";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddEditExpenseScreen from "./screens/AddEditExpenseScreen";
import { Provider } from "react-redux";
import store from "./redux/store";
import AboutScreen from "./screens/AboutScreen";

export default function App() {
  // const Tab = createBottomTabNavigator();
  const Tab = createMaterialBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";

  const HomeTabNavigation = () => {
    return (
      <Tab.Navigator
        activeIndicatorStyle="null"
        initialRouteName="HomeScreen"
        activeColor={Colors.bottomMenuHighlight}
        inactiveColor="white"
        barStyle={{
          backgroundColor: Colors.green_v1,
        }}
        sceneAnimationType="shifting"
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Icon name="home" type="font-awesome-5" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Totals"
          component={TotalsScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Totals",
            tabBarIcon: ({ color }) => (
              <Icon
                name="calculator"
                type="font-awesome-5"
                size={30}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            headerShown: false,
            tabBarLabel: "About",
            tabBarIcon: ({ color }) => (
              <Icon
                name="info-circle"
                type="font-awesome-5"
                size={30}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeTabNavigation"
              component={HomeTabNavigation} // Home.js
              options={{ headerShown: false }} // Remove the Home label above
            />
            <Stack.Screen
              name="AddEditExpenseScreen"
              component={AddEditExpenseScreen}
              options={{ headerShown: false }} // Remove the Home label above
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
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
