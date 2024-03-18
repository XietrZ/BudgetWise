import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { styles } from "../stylesheets/ExpenseRowItem.style";
import { Icon } from "@rneui/themed";
import Colors from "../constants/Color";
import { useNavigation } from "@react-navigation/native";
import { EXPENSE_SCREEN } from "../constants/StaticVariable";
import { useDispatch } from "react-redux";
import {
  setAmount,
  setChecked,
  setDescription,
  setPartOfBudget,
} from "../slices/navSlice";
import { formatNumberRemoveComma } from "../constants/StaticMethod";

const ExpenseRowItem = ({ expense }) => {
  const [loggerClass, setLoggerClass] = useState("[ExpenseRowItem.js]");

  const { id, amount, dateMonthDay, dateYear, description, isPartOfBudget } =
    expense;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const updateFieldsFromExpenseData = () => {
    if (expense != null) {
      const { amount, description, isPartOfBudget } = expense;
      dispatch(setChecked(isPartOfBudget ? "first" : "second"));
      dispatch(setAmount(amount));
      dispatch(setDescription(description));
      dispatch(setPartOfBudget(isPartOfBudget));
    }
  };
  // Logging Purposes only
  console.log(loggerClass, " expensse: ", expense);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log("[ExpenseRowItem.js] Navigate to AddEditExpenseScreen");
        updateFieldsFromExpenseData();
        dispatch(setAmount(formatNumberRemoveComma(amount)));
        navigation.navigate("AddEditExpenseScreen", {
          screenHeaderText: "Expense",
          screenMode: EXPENSE_SCREEN,
          expenseId: id,
        });
      }}
    >
      {/* Date  */}
      <View>
        {/* <Text style={{ color: "white" }}>{date}</Text>
        <Text style={{ color: "white" }}>{date}</Text> */}
        <Text style={{ color: "white" }}>{dateMonthDay}</Text>
        <Text style={{ color: "white" }}>{dateYear}</Text>
      </View>

      {/* Expense  */}
      <View style={styles.expenseTextPanelWrapper}>
        <Text style={{ color: "white" }}>{description}</Text>
      </View>

      {/* Spent Data  */}
      <View style={styles.youSpentPanelWrapper}>
        {/* Spent Text */}
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={
              isPartOfBudget
                ? { color: Colors.green_v1 }
                : { color: Colors.red_v1 }
            }
          >
            you spent
          </Text>
          <Text
            style={
              isPartOfBudget
                ? { color: Colors.green_v1 }
                : { color: Colors.red_v1 }
            }
          >
            {amount}
          </Text>
        </View>

        {/* Icon image */}
        {isPartOfBudget ? (
          <Icon
            name="check"
            type="font-awesome-5"
            size={20}
            color={Colors.green_v1}
            style={{ marginHorizontal: 5 }}
          />
        ) : (
          <Icon
            name="cross"
            type="entypo"
            size={25}
            color={Colors.red_v1}
            style={{ marginHorizontal: 5 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseRowItem;
