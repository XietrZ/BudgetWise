import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  setAmount,
  setChecked,
  setDescription,
  setPartOfBudget,
} from "../slices/navSlice";
import {
  ADD_EXPENSE_SCREEN,
  EXPENSE_SCREEN,
  HOME_SCREEN,
} from "./StaticVariable";

const loggerClass = "[StaticMethod.js]";

/**
 * Check if we are in Add Expense Screen based from screen mode
 * @param {*} string
 * @returns
 */
const isAreWeInAddExpenseScreen = (string) => {
  if (string == ADD_EXPENSE_SCREEN) return true;
  return false;
};

/**
 * Check if we are in Expense Screen based from screen mode
 * @param {*} string
 * @returns
 */
const isAreWeInExpenseScreen = (string) => {
  if (string == EXPENSE_SCREEN) return true;
  return false;
};

/**
 * Check if we are in Home Screen based from screen mode
 * @param {*} string
 * @returns
 */
const isAreWeInHomeScreen = (string) => {
  if (string == HOME_SCREEN) return true;
  return false;
};

/**
 * Convert screen mode to readable
 * @param {*} mode
 * @returns
 */
const convertScreenModeToReadable = (mode) => {
  if (mode == HOME_SCREEN) {
    return "HOME_SCREEN";
  } else if (mode == ADD_EXPENSE_SCREEN) {
    return "ADD_EXPENSE_SCREEN";
  } else if (mode == EXPENSE_SCREEN) {
    return "EXPENSE_SCREEN";
  }
  return "NULL SCREEN";
};

/**
 * Remove comma from number
 * @param {*} number
 * @returns
 */
const formatNumberRemoveComma = (number) => {
  if (number == "" || number == null) return "0.00";

  const loggerClass = "[StaticMethod.js]";
  const string = "" + number;
  let newString = string.replace(",", "");

  // //-> Logging Purposes
  // console.log();
  // console.log(loggerClass, "formatNumberRemoveComma: ");
  // console.log(loggerClass, " string: ", string);
  // console.log(loggerClass, " newString: ", newString);

  return newString;
};

/**
 * Format number to add comma and decimal places
 * @param {*} number
 * @returns
 */
const formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces = (number) => {
  if (number == "" || number == null || number == "0") return "0.00";

  const num = parseFloat(number);
  const loggerClass = "[StaticMethod.js]";

  // //--> Logging Purposes
  // console.log();
  // console.log(
  //   loggerClass,
  //   "formatNumber from NormalNumber To CommaAndTwoDecimalPlaces: "
  // );
  // console.log(loggerClass, " num: ", num);

  // Using default formatting (based on user's locale)
  const formattedNumberDefault = num.toLocaleString("en-US");

  // //--> Logging Purposes
  // console.log(loggerClass, " formattedNumberDefault: ", formattedNumberDefault); // Output depends on user's locale

  // Specifying options for formatting
  const options = {
    style: "decimal", // Other options: 'currency', 'percent', etc.
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const formattedWithOptions = num.toLocaleString("en-US", options);

  // //--> Logging Purposes
  // console.log(loggerClass, " formattedWithOptions: ", formattedWithOptions); // Output: "1,234,567.89"

  return formattedWithOptions.toLocaleString("en-US");
};

/**
 * Clear or set default values after saved
 * @param {*} param0
 */
const clearOrSetToDefaultValuesAfterSaved = ({
  dispatch,
  setChecked,
  setAmount,
  setDescription,
  setPartOfBudget,
}) => {
  dispatch(setChecked("first"));
  dispatch(setAmount(""));
  dispatch(setDescription(""));
  dispatch(setPartOfBudget(true));
};

/**
 * Do Calculation..
 * @param {*} param0
 */
const doCalculation = ({
  dispatch,
  expensesData,
  maxLimit,
  previousTotalExpenses,
  difference,
  notPartOfBudgetTotalSpending,
  setDifference,
  setNotPartOfBudgetTotalSpending,
  setCurrentTotalExpenses,
  setPartOfBudgetTotalSpending,
  setCalculatedCriticalExpenses,
}) => {
  calculateCurrenTotalExpense({
    dispatch,
    setCurrentTotalExpenses,
    expensesData,
  });

  calculateDifference({
    dispatch,
    setDifference,
    maxLimit,
    previousTotalExpenses,
  });

  calculateNotPartOfBudgetTotalSpending({
    dispatch,
    setNotPartOfBudgetTotalSpending,
    expensesData,
  });

  calculatePartOfBudgetTotalSpending({
    dispatch,
    setPartOfBudgetTotalSpending,
    expensesData,
  });

  calculateCriticalExpensesValue({
    dispatch,
    setCalculatedCriticalExpenses,
    maxLimit,
    previousTotalExpenses,
    difference,
    notPartOfBudgetTotalSpending,
  });
};

/**
 * Calculate Current Total Expenses
 * @param {*} param0
 * @returns
 */
const calculateCurrenTotalExpense = ({
  dispatch,
  setCurrentTotalExpenses,
  expensesData,
}) => {
  let total = 0;

  if (expensesData.length > 0) {
    expensesData.map((data, index) => {
      const { amount } = data;
      const aaa = amount;

      const newAmount = parseFloat(formatNumberRemoveComma(aaa));

      total += newAmount;
    });
  }

  dispatch(setCurrentTotalExpenses(total));
};

/**
 * Calculate difference (MaxLimit - Current Total Expenses)
 * @param {*} param0
 */
const calculateDifference = ({
  dispatch,
  setDifference,
  maxLimit,
  previousTotalExpenses,
}) => {
  const loggerClass = "[StaticMethod.js]";
  let difference = 0;
  let ml = parseFloat(formatNumberRemoveComma(maxLimit));
  let cte = parseFloat(formatNumberRemoveComma(previousTotalExpenses));
  difference = ml - cte;

  // //--> Logging Purposes
  // console.log();
  // console.log(loggerClass, "calculateDifference(){}:");
  // console.log(loggerClass, "maxLimit: ", maxLimit);
  // console.log(loggerClass, "difference: ", difference);

  dispatch(setDifference(difference));
};

/**
 * NOT part of budget Total Spending
 * @param {*} param0
 */
const calculateNotPartOfBudgetTotalSpending = ({
  dispatch,
  setNotPartOfBudgetTotalSpending,
  expensesData,
}) => {
  const loggerClass = "[StaticMethod.js]";
  let total = 0;

  if (expensesData.length > 0) {
    expensesData.map((data, index) => {
      const { amount, isPartOfBudget } = data;
      const aaa = amount;

      if (!isPartOfBudget) {
        const newAmount = parseFloat(formatNumberRemoveComma(aaa));
        total += newAmount;
      }
    });
  }
  dispatch(setNotPartOfBudgetTotalSpending(total));
};

/**
 * PART of budget Total Spending
 * @param {*} dispatch
 * @param {*} setPartOfBudgetTotalSpending
 * @param {*} expensesData
 */
const calculatePartOfBudgetTotalSpending = ({
  dispatch,
  setPartOfBudgetTotalSpending,
  expensesData,
}) => {
  const loggerClass = "[StaticMethod.js]";
  let total = 0;

  if (expensesData.length > 0) {
    expensesData.map((data, index) => {
      const { amount, isPartOfBudget } = data;
      const aaa = amount;

      if (isPartOfBudget) {
        const newAmount = parseFloat(formatNumberRemoveComma(aaa));
        total += newAmount;
      }
    });
  }
  dispatch(setPartOfBudgetTotalSpending(total));
};

/**
 * Calculate the critical expenses value
 * @param {*} param0
 */
const calculateCriticalExpensesValue = ({
  dispatch,
  setCalculatedCriticalExpenses,
  maxLimit,
  previousTotalExpenses,
  difference,
  notPartOfBudgetTotalSpending,
}) => {
  let value = 0;
  const loggerClass = "[StaticMethod.js]";

  // // --> LOgging Purposes
  // console.log();
  // console.log(loggerClass, " calculateCriticalExpensesValue(){}:");
  // console.log(loggerClass, " maxLimit: ", maxLimit);
  // console.log(loggerClass, " previousTotalExpenses: ", previousTotalExpenses);
  // console.log(loggerClass, " difference: ", difference);
  // console.log(
  //   loggerClass,
  //   " notPartOfBudgetTotalSpending: ",
  //   notPartOfBudgetTotalSpending
  // );

  let ml = parseFloat(formatNumberRemoveComma(maxLimit));
  let pe = parseFloat(formatNumberRemoveComma(previousTotalExpenses));
  let d = parseFloat(formatNumberRemoveComma(difference));
  let npbts = parseFloat(formatNumberRemoveComma(notPartOfBudgetTotalSpending));

  let temp = 0;
  if (difference < 0) {
    d *= -1;
    value = npbts + d;
  } else {
    value = difference - npbts;
  }

  // //--> Logging Purposes
  // console.log(loggerClass, " ml: ", ml);
  // console.log(loggerClass, " pe: ", pe);
  // console.log(loggerClass, " d: ", d);
  // console.log(loggerClass, " npbts: ", npbts);
  // console.log(loggerClass, " value: ", value);

  dispatch(setCalculatedCriticalExpenses(value));
};

export {
  isAreWeInAddExpenseScreen,
  isAreWeInExpenseScreen,
  isAreWeInHomeScreen,
  convertScreenModeToReadable,
  formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces,
  formatNumberRemoveComma,
  calculateCurrenTotalExpense,
  calculateDifference,
  clearOrSetToDefaultValuesAfterSaved,
  calculateNotPartOfBudgetTotalSpending,
  calculatePartOfBudgetTotalSpending,
  calculateCriticalExpensesValue,
  doCalculation,
};
