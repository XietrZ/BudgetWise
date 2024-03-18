import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Color";

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
  },

  modalPanelWrapper: {
    backgroundColor: Colors.modalBg,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },

  questionTextWrapper: {
    color: "white",
    fontFamily: "Grandstander-Regular",
    fontSize: 22,
  },

  optionPanelWrapper: {
    // backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  optionTextWrapper: {
    color: "white",
    margin: 5,
    marginHorizontal: 10,
    fontSize: 20,
    fontFamily: "Grandstander-Regular",
    marginRight: 20,
  },
});
