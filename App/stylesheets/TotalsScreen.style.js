import { StyleSheet } from "react-native";
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

  backBtnAddExpenseLabelPanelWrapper: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },

  spendingSummaryLabelTextWrapper: {
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

  textLabelWrapper_2: {
    fontSize: 20,
    marginLeft: -15,
  },

  topPanelWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
});
