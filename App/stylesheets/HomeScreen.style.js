import { StyleSheet } from "react-native";
import Colors from "../constants/Color";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundBg,
    flex: 1,
  },

  headerPanelWrapper: {
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    marginTop: 15,
  },

  titleWrapper: {
    color: "white",
    fontSize: 40,
    fontFamily: "Grandstander-Regular",
  },

  legendPanelWrapper: {
    // backgroundColor: "red",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  partOfBudgetPanelWrapper: {
    // backgroundColor: "blue",
    // flex: 1,
    flexDirection: "row",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  partOfBudgetTextWrapper: {
    fontFamily: "Grandstander-Regular",
    color: "white",
    fontSize: 10,
  },

  totalNotPartOfBudgetLabelClearBtnPanelWrapper: {
    // backgroundColor: "cyan",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    // justifyContent: "center",
  },

  totalNotPartOfBudgetLabelPanelWrapper: {
    // backgroundColor: "blue",
    flex: 1,
    alignItems: "center",
    marginLeft: 30,
  },

  totalNotPartOfBudgetLabelTextWrapper: {
    color: "white",
    fontFamily: "Grandstander-Regular",
    fontSize: 15,
  },

  separator: {
    backgroundColor: Colors.separatorColor,
    height: 2,
    marginVertical: 8,
  },

  addButtonPanelWrapper: {
    padding: 5,
    alignItems: "flex-end",
    paddingVertical: 10,
  },

  addButtonWrapper: {
    backgroundColor: Colors.green_v1,
    width: 103,
    height: 45,
    justifyContent: "center",
    borderRadius: 10,
  },
});
