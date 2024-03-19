import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Color";
import { styles } from "../stylesheets/ModalPopUp.style";
import {
  clearOrSetToDefaultValuesAfterSaved,
  convertScreenModeToReadable,
  doCalculation,
  formatNumberRemoveComma,
  formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces,
  isAreWeInAddExpenseScreen,
} from "../constants/StaticMethod";
import {
  ADD_EXPENSE_SCREEN,
  EXPENSE_SCREEN,
  MODAL_POP_CLEAR_ALL_EXPENSES,
  MODAL_POP_CLEAR_EXPENSE,
  MODAL_POP_UP_SAVE,
  TOTAL_SCREEN,
} from "../constants/StaticVariable";
import {
  getExpensesFromUserDevice,
  saveExpensesToUserDevice,
} from "../database/AsyncStorageDB";
import { useDispatch, useSelector } from "react-redux";
import {
  selectExpensesData,
  selectExpensesDataCounter,
  selectMaxLimit,
  selectPreviousTotalExpenses,
  setAmount,
  setChecked,
  setDescription,
  setDifference,
  setExpensesData,
  setExpensesDataCounter,
  setMaxLimit,
  setPartOfBudget,
  setPreviousTotalExpenses,
  setCurrentTotalExpenses,
  selectDifference,
  selectNotPartOfBudgetTotalSpending,
  setNotPartOfBudgetTotalSpending,
  setPartOfBudgetTotalSpending,
  setCalculatedCriticalExpenses,
  selectCurrentTotalExpenses,
  selectPartOfBudgetTotalSpending,
  selectCalculatedCriticalExpenses,
} from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const ModalPopUp = ({
  screenMode,
  modelPopUpMode,
  questionLabel,
  isShowModal,
  setShowModal,
  expenseDataToSave,
  setEdit,
}) => {
  const [loggerClass, setLoggerClass] = useState("[ModalPopUp.js]");

  const dispatch = useDispatch();
  const expensesData = useSelector(selectExpensesData);
  const expensesDataCounter = useSelector(selectExpensesDataCounter);
  const maxLimit = useSelector(selectMaxLimit);
  const previousTotalExpenses = useSelector(selectPreviousTotalExpenses);
  const difference = useSelector(selectDifference);
  const notPartOfBudgetTotalSpending = useSelector(
    selectNotPartOfBudgetTotalSpending
  );
  const currentTotalExpenses = useSelector(selectCurrentTotalExpenses);
  const partOfBudgetTotalSpending = useSelector(
    selectPartOfBudgetTotalSpending
  );
  const calculatedCriticalExpenses = useSelector(
    selectCalculatedCriticalExpenses
  );

  const navigation = useNavigation();

  // LOGGING PURPOSES ONLY
  if (
    isShowModal &&
    modelPopUpMode == MODAL_POP_UP_SAVE &&
    (screenMode == EXPENSE_SCREEN || screenMode == ADD_EXPENSE_SCREEN)
  ) {
    console.log("");
    console.log(
      loggerClass,
      " ************************************************************************************"
    );
    console.log(loggerClass, " expensesData: ", expensesData);
    console.log(loggerClass, " expenseDataToSave: ", expenseDataToSave);
    console.log(loggerClass, " id: ", expenseDataToSave.id);
    console.log(loggerClass, " amount: ", expenseDataToSave.amount);
    console.log(loggerClass, " description: ", expenseDataToSave.description);
    console.log(
      loggerClass,
      " isPartOfBudget: ",
      expenseDataToSave.isPartOfBudget
    );
    console.log(loggerClass, " date: ", expenseDataToSave.date);
    console.log(
      loggerClass,
      " screenMode: ",
      convertScreenModeToReadable(screenMode)
    );
    console.log(
      loggerClass,
      " isAreWeInAddExpenseScreen ",
      isAreWeInAddExpenseScreen(screenMode)
    );
  }

  return (
    <Modal animationType="fade" transparent={true} visible={isShowModal}>
      <View style={styles.container}>
        <View style={styles.modalPanelWrapper}>
          {/* Question */}
          <Text style={styles.questionTextWrapper}>{questionLabel}</Text>

          {/* Options */}
          <View style={styles.optionPanelWrapper}>
            {/* OK and SAVE button */}
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);

                try {
                  if (MODAL_POP_UP_SAVE == modelPopUpMode) {
                    if (ADD_EXPENSE_SCREEN == screenMode) {
                      const { description } = expenseDataToSave;
                      if (description == "" || description == null) {
                        alert("Please add description.");
                      } else {
                        dispatch(
                          setExpensesData(
                            [...expensesData, expenseDataToSave].sort(
                              (a, b) => b.id - a.id
                            )
                          )
                        );

                        clearOrSetToDefaultValuesAfterSaved({
                          dispatch,
                          setChecked,
                          setAmount,
                          setDescription,
                          setPartOfBudget,
                        });

                        dispatch(
                          setExpensesDataCounter(expensesDataCounter + 1)
                        );

                        doCalculation({
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
                        });

                        alert("Saved New Expense Successfully!");
                      }
                    } else if (EXPENSE_SCREEN == screenMode) {
                      const { id, amount, date, description, isPartOfBudget } =
                        expenseDataToSave;
                      const newExpensesData = expensesData.map((item) => {
                        console.log(loggerClass, " id: ", id);
                        console.log(loggerClass, " item.id: ", item.id);
                        if (id == item.id) {
                          return {
                            ...item,
                            amount: amount,
                            description: description,
                            isPartOfBudget: isPartOfBudget,
                          };
                        }
                        return item;
                      });
                      console.log(
                        loggerClass,
                        " newExpensesData: ",
                        newExpensesData
                      );
                      dispatch(setExpensesData(newExpensesData));

                      doCalculation({
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
                      });

                      alert("Saved New Values of Expense Successfully!");
                    } else if (TOTAL_SCREEN == screenMode) {
                      setEdit(false);

                      dispatch(
                        setMaxLimit(
                          formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces(
                            maxLimit
                          )
                        )
                      );

                      dispatch(
                        setPreviousTotalExpenses(
                          formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces(
                            previousTotalExpenses
                          )
                        )
                      );

                      doCalculation({
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
                      });

                      alert("Max Limit and Total Expenses Saved Successfully!");
                    }
                  } else if (MODAL_POP_CLEAR_EXPENSE == modelPopUpMode) {
                    const { id } = expenseDataToSave;
                    const newExpensesData = expensesData.filter(
                      (item) => item.id != id
                    );
                    dispatch(
                      setExpensesData(
                        [...newExpensesData].sort((a, b) => b.id - a.id)
                      )
                    );

                    doCalculation({
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
                    });
                    alert("Expense is Deleted Successfully!");

                    navigation.goBack();
                  } else if (MODAL_POP_CLEAR_ALL_EXPENSES == modelPopUpMode) {
                    dispatch(setExpensesData([]));
                    dispatch(setExpensesDataCounter(0));

                    doCalculation({
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
                    });

                    alert("ALL EXPENSES are Deleted Successfully!");
                  }
                } catch (error) {
                  alert("Error!: " + error);
                  console.log(loggerClass, " Error: ", error);
                }
              }}
            >
              <Text style={[styles.optionTextWrapper]}>Ok</Text>
            </TouchableOpacity>

            {/* CANCEL Button */}
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                if (TOTAL_SCREEN == screenMode) {
                  dispatch(setMaxLimit(formatNumberRemoveComma(maxLimit)));
                  setEdit(true);

                  doCalculation({
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
                  });
                }
              }}
            >
              <Text style={styles.optionTextWrapper}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPopUp;
