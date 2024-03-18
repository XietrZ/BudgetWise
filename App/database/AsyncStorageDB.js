import { Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loggerClass = "[AsyncStorageDB.js]";

//--> ExpensesData Async DB ***********************************************
/**
 * Save the expesnes data to Async Storage DB
 * @param {*} expenses
 */
const saveExpensesDataToUserDeviceAsyncDB = async ({ expensesData }) => {
  try {
    if (expensesData != null) {
      //--> Logging Purposes
      console.log(loggerClass, "");
      console.log(loggerClass, " saveExpensesDataToUserDeviceAsyncDB(){}");
      console.log(loggerClass, " expensesData: ", expensesData);

      const stringify = JSON.stringify(expensesData);

      //--> Logging Purposes
      console.log(loggerClass, " stringify: ", stringify);

      await AsyncStorage.setItem("expensesData", stringify);
    }
  } catch (error) {
    console.log("[AsyncStorageDB] saveExpenseToUserDevice error: ", error);
  }
};

/**
 * Get the data from Async Storage DB
 * @param {*} param0
 */
const getExpensesDataFromUserDeviceAsyncDB = async ({
  dispatch,
  setExpensesData,
}) => {
  try {
    const values = await AsyncStorage.getItem("expensesData");
    if (values != null) {
      //--> Logging Purposes
      console.log(loggerClass, "");
      console.log(loggerClass, " getExpensesDataFromUserDeviceAsyncDB(){}");
      console.log(loggerClass, " values: ", values);

      dispatch(setExpensesData(JSON.parse(values)));
    }
  } catch (error) {
    console.log("[AsyncStorageDB.js] getExpensesFromUserDevic error: ", error);
  }
};

//--> ExpensesDataCounter Async DB ***********************************************
const saveExpensesDataCounterToUserDeviceAsyncDB = async ({
  expensesDataCounter,
}) => {
  try {
    if (expensesDataCounter != null) {
      const stringify = JSON.stringify(expensesDataCounter);

      await AsyncStorage.setItem("expensesDataCounter", stringify);
    }
  } catch (error) {
    console.log("[AsyncStorageDB] saveExpenseToUserDevice error: ", error);
  }
};

const getExpensesDataCounterFromUserDeviceAsyncDB = async ({
  dispatch,
  setExpensesDataCounter,
}) => {
  try {
    const values = await AsyncStorage.getItem("expensesDataCounter");
    if (values != null) {
      dispatch(setExpensesDataCounter(JSON.parse(values)));
    }
  } catch (error) {
    console.log("[AsyncStorageDB.js] getExpensesFromUserDevic error: ", error);
  }
};

//--> MaxLimit Async DB ***********************************************
const saveMaxLimitToUserDeviceAsyncDB = async ({ maxLimit }) => {
  try {
    if (maxLimit != null) {
      const stringify = JSON.stringify(maxLimit);

      await AsyncStorage.setItem("maxLimit", stringify);
    }
  } catch (error) {
    console.log("[AsyncStorageDB] saveExpenseToUserDevice error: ", error);
  }
};

const getMaxLimitFromUserDeviceAsyncDB = async ({ dispatch, setMaxLimit }) => {
  try {
    const values = await AsyncStorage.getItem("maxLimit");
    if (values != null) {
      dispatch(setMaxLimit(JSON.parse(values)));
    }
  } catch (error) {
    console.log("[AsyncStorageDB.js] getExpensesFromUserDevic error: ", error);
  }
};

//--> PreviousTotalExpenses Async DB ***********************************************
const savePreviousTotalExpensesToUserDeviceAsyncDB = async ({
  previousTotalExpenses,
}) => {
  try {
    if (previousTotalExpenses != null) {
      const stringify = JSON.stringify(previousTotalExpenses);

      await AsyncStorage.setItem("previousTotalExpenses", stringify);
    }
  } catch (error) {
    console.log("[AsyncStorageDB] saveExpenseToUserDevice error: ", error);
  }
};

const getPreviousTotalExpensesFromUserDeviceAsyncDB = async ({
  dispatch,
  setPreviousTotalExpenses,
}) => {
  try {
    const values = await AsyncStorage.getItem("previousTotalExpenses");
    if (values != null) {
      dispatch(setPreviousTotalExpenses(JSON.parse(values)));
    }
  } catch (error) {
    console.log("[AsyncStorageDB.js] getExpensesFromUserDevic error: ", error);
  }
};

export {
  saveExpensesDataToUserDeviceAsyncDB,
  getExpensesDataFromUserDeviceAsyncDB,
  saveExpensesDataCounterToUserDeviceAsyncDB,
  getExpensesDataCounterFromUserDeviceAsyncDB,
  saveMaxLimitToUserDeviceAsyncDB,
  getMaxLimitFromUserDeviceAsyncDB,
  savePreviousTotalExpensesToUserDeviceAsyncDB,
  getPreviousTotalExpensesFromUserDeviceAsyncDB,
};
