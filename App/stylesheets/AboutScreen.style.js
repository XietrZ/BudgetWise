import { StyleSheet } from "react-native";
import React from "react";
import Colors from "../constants/Color";

export const styles = StyleSheet.create({
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
  backBtnAboutScreenLabelPanelWrapper: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },

  aboutScreenLabelTextWrapper: {
    color: "white",
    marginLeft: 19,
    fontFamily: "Grandstander-Regular",
    fontSize: 20,
  },

  textLabelWrapper: {
    color: "white",
    fontFamily: "Grandstander-Regular",
    fontSize: 15,
  },

  centerMessageTextLabelWrapper: {
    // backgroundColor: "orange",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appVersionTextLabelWrapper: {
    // flex: 1,
    //   backgroundColor: "cyan",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
