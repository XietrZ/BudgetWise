import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/Color";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundBg,
    flex: 1,
  },

  headerPanelWrapper: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },

  backBtnAddExpenseLabelPanelWrapper: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },

  addExpenseLabelTextWrapper: {
    color: "white",
    marginLeft: 19,
    fontFamily: "Grandstander-Regular",
    fontSize: 20,
  },

  amountInputFieldPanelWrapper: {
    // backgroundColor: "red",
    marginTop: 32,
    marginHorizontal: 52,
    // justifyContent: "center",
  },

  enterDescriptionFieldPanelWrapper: {
    // backgroundColor: "red",
    marginHorizontal: 52,
    // justifyContent: "center",
  },
});

export default styles;
