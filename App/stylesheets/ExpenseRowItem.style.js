import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/Color";

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    padding: 5,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.listBorder,
  },

  expenseTextPanelWrapper: {
    flex: 1,
    marginHorizontal: 12,
    // marginRight: 6,
    // backgroundColor: "cyan",
  },

  youSpentPanelWrapper: {
    // backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
  },
});
