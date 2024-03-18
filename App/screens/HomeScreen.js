import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useDebugValue, useEffect, useState } from "react";
import { styles } from "../stylesheets/HomeScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Color";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Icon } from "@rneui/themed";
import ExpenseRowItem from "../components/ExpenseRowItem";
import tempData from "../constants/TempData";
import ModalPopUp from "../components/ModalPopUp";
import { useNavigation } from "@react-navigation/native";
import {
  getExpensesDataFromUserDeviceAsyncDB,
  saveExpensesDataToUserDeviceAsyncDB,
  saveExpensesDataCounterToUserDeviceAsyncDB,
  getExpensesDataCounterFromUserDeviceAsyncDB,
  saveMaxLimitToUserDeviceAsyncDB,
  getMaxLimitFromUserDeviceAsyncDB,
  savePreviousTotalExpensesToUserDeviceAsyncDB,
  getPreviousTotalExpensesFromUserDeviceAsyncDB,
} from "../database/AsyncStorageDB";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentTotalExpenses,
  selectExpensesData,
  selectMaxLimit,
  setAmount,
  setChecked,
  setCurrentTotalExpenses,
  setDescription,
  setPartOfBudget,
  setDifference,
  setNotPartOfBudgetTotalSpending,
  setPartOfBudgetTotalSpending,
  selectNotPartOfBudgetTotalSpending,
  selectPreviousTotalExpenses,
  setCalculatedCriticalExpenses,
  selectDifference,
  selectCalculatedCriticalExpenses,
  setExpensesData,
  setExpensesDataCounter,
  selectExpensesDataCounter,
  setMaxLimit,
  setPreviousTotalExpenses,
} from "../slices/navSlice";
import {
  ADD_EXPENSE_SCREEN,
  EXPENSE_SCREEN,
  HOME_SCREEN,
  MODAL_POP_CLEAR_ALL_EXPENSES,
} from "../constants/StaticVariable";
import moment from "moment";
import {
  calculateCriticalExpensesValue,
  calculateCurrenTotalExpense,
  calculateDifference,
  calculateNotPartOfBudgetTotalSpending,
  calculatePartOfBudgetTotalSpending,
  clearOrSetToDefaultValuesAfterSaved,
  formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces,
} from "../constants/StaticMethod";

export default function HomeScreen() {
  const [loggerClass, setLoggerClass] = useState("[HomeScreen.js]");

  const expensesData = useSelector(selectExpensesData);
  const maxLimit = useSelector(selectMaxLimit);
  const notPartOfBudgetTotalSpending = useSelector(
    selectNotPartOfBudgetTotalSpending
  );
  const previousTotalExpenses = useSelector(selectPreviousTotalExpenses);
  const calculatedCriticalExpenses = useSelector(
    selectCalculatedCriticalExpenses
  );
  const difference = useSelector(selectDifference);
  const expensesDataCounter = useSelector(selectExpensesDataCounter);

  const [isShowModal, setShowModal] = useState(false);
  const [fontsLoaded] = useFonts({
    "Grandstander-Bold": require("../assets/fonts/Grandstander-Bold.ttf"),
    "Grandstander-Regular": require("../assets/fonts/Grandstander-Regular.ttf"),
    "Grandstander-SemiBold": require("../assets/fonts/Grandstander-SemiBold.ttf"),
    "Grandstander-Medium": require("../assets/fonts/Grandstander-Medium.ttf"),
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // ************************************* USE EFFECT () **********************************
  //--> ExpensesData Async DB
  useEffect(() => {
    getExpensesDataFromUserDeviceAsyncDB({ dispatch, setExpensesData });
  }, []);

  useEffect(() => {
    saveExpensesDataToUserDeviceAsyncDB({ expensesData });
  }, [expensesData]);

  //--> ExpensesDataCounter Async DB
  useEffect(() => {
    getExpensesDataCounterFromUserDeviceAsyncDB({
      dispatch,
      setExpensesDataCounter,
    });
  }, []);

  useEffect(() => {
    saveExpensesDataCounterToUserDeviceAsyncDB({
      expensesDataCounter,
    });
  }, [expensesDataCounter]);

  //--> MaxLimit Async DB
  useEffect(() => {
    getMaxLimitFromUserDeviceAsyncDB({
      dispatch,
      setMaxLimit,
    });
  }, []);

  useEffect(() => {
    saveMaxLimitToUserDeviceAsyncDB({
      maxLimit,
    });
  }, [maxLimit]);

  //--> PreviousTotalExpenses Async DB
  useEffect(() => {
    getPreviousTotalExpensesFromUserDeviceAsyncDB({
      dispatch,
      setPreviousTotalExpenses,
    });
  }, []);

  useEffect(() => {
    savePreviousTotalExpensesToUserDeviceAsyncDB({
      previousTotalExpenses,
    });
  }, [previousTotalExpenses]);

  // ************************************* CALCULATE () **********************************
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

  // ************************************* Fonts **********************************
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      {/* Header */}
      <View style={styles.headerPanelWrapper}>
        <Text style={styles.titleWrapper}>Budget Wise</Text>

        {/* part and not part of budget legend image */}
        <View style={styles.legendPanelWrapper}>
          {/* Part of Budget Wrapper */}
          <View style={[styles.partOfBudgetPanelWrapper]}>
            <Icon
              name="check"
              type="font-awesome-5"
              size={18}
              color="green"
              style={{ marginHorizontal: 5 }}
            />
            <Text style={styles.partOfBudgetTextWrapper}>part of budget</Text>
          </View>

          {/* NOT Part of Budget Wrapper */}
          <View style={[styles.partOfBudgetPanelWrapper]}>
            <Icon
              name="cross"
              type="entypo"
              size={18}
              color="red"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.partOfBudgetTextWrapper}>
              NOT part of budget
            </Text>
          </View>
          <View></View>
        </View>
      </View>

      {/* Total Not Part of Budget Label and clear all button */}
      <View
        style={[
          styles.totalNotPartOfBudgetLabelClearBtnPanelWrapper,
          { marginBottom: 0 },
        ]}
      >
        <View style={[styles.totalNotPartOfBudgetLabelPanelWrapper]}>
          <View>
            {/*  Calculated Critical Expenses Value */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text style={styles.totalNotPartOfBudgetLabelTextWrapper}>
                  Calculated Critical
                </Text>
                <Text style={styles.totalNotPartOfBudgetLabelTextWrapper}>
                  Expenses Value:
                </Text>
              </View>
              <Text
                style={[
                  styles.totalNotPartOfBudgetLabelTextWrapper,
                  {
                    color: "red",
                    marginLeft: 5,
                    fontWeight: 900,
                    fontSize: 18,
                  },
                ]}
              >
                {difference < 0
                  ? "- (" +
                    formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces(
                      calculatedCriticalExpenses
                    ) +
                    ")"
                  : calculatedCriticalExpenses < 0
                  ? "- (" +
                    formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces(
                      -1 * calculatedCriticalExpenses
                    ) +
                    ")"
                  : formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces(
                      calculatedCriticalExpenses
                    )}
              </Text>
            </View>
            {/*  Total Not Part of Budget Label */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                // backgroundColor: "green",
              }}
            >
              <Text style={styles.totalNotPartOfBudgetLabelTextWrapper}>
                Total Not Part Of Budget:
              </Text>
              <Text
                style={[
                  styles.totalNotPartOfBudgetLabelTextWrapper,
                  { color: "red", marginLeft: 5 },
                ]}
              >
                {formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces(
                  notPartOfBudgetTotalSpending
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Clear all button */}
      <View
        style={{
          // backgroundColor: "green",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowModal(true);
          }}
        >
          <Icon
            name="trash"
            type="font-awesome-5"
            size={22}
            color="white"
            style={{ marginHorizontal: 5, marginRight: 13 }}
          />
        </TouchableOpacity>
      </View>

      {/* Line Separator */}
      <View style={styles.separator} />

      {/* Expense List */}
      <FlatList
        // style={{ backgroundColor: "red" }}
        data={expensesData}
        renderItem={({ item }) => (
          //--> ADD DESIGN HERE
          <>
            {console.log("---------------------------")}
            {console.log(loggerClass, " item.id: ", item.id)}
            {console.log(loggerClass, " item.amount: ", item.amount)}
            <ExpenseRowItem expense={item} />
          </>
          // <></>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Add  button */}
      <View style={styles.addButtonPanelWrapper}>
        <TouchableOpacity
          style={styles.addButtonWrapper}
          onPress={() => {
            clearOrSetToDefaultValuesAfterSaved({
              dispatch,
              setChecked,
              setAmount,
              setDescription,
              setPartOfBudget,
            });
            console.log("[HomeScreen.js] Navigate to AddEditExpenseScreen");
            navigation.navigate("AddEditExpenseScreen", {
              screenHeaderText: "Add Expense",
              screenMode: ADD_EXPENSE_SCREEN,
            });
          }}
        >
          <Icon name="plus" type="font-awesome-5" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {/* Clear All Modal PopUp */}
      <ModalPopUp
        screenMode={HOME_SCREEN}
        modelPopUpMode={MODAL_POP_CLEAR_ALL_EXPENSES}
        questionLabel="Are you sure you want to delete ALL expenses? "
        setShowModal={setShowModal}
        isShowModal={isShowModal}
        expenseDataToSave={null}
      />
    </SafeAreaView>
  );
}
