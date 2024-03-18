import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// Create initial state
const initialState = {
  notPartOfBudgetAmount: null,
  expensesData: [],
  expensesDataCounter: 0,
  checked: "first",
  amount: "",
  description: "",
  isPartOfBudget: true,
  maxLimit: "0.00",
  currentTotalExpenses: "0.00",
  difference: "0.00",
  notPartOfBudgetTotalSpending: "0.00",
  partOfBudgetTotalSpending: "0.00",
  previousTotalExpenses: "0.00",
  calculatedCriticalExpenses: "0.00",
};

// use createSlice()
const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setNotPartOfBudgetAmount: (state, action) => {
      state.notPartOfBudgetAmount = action.payload;
    },
    setExpensesData: (state, action) => {
      state.expensesData = action.payload;
    },
    setExpensesDataCounter: (state, action) => {
      state.expensesDataCounter = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPartOfBudget: (state, action) => {
      state.isPartOfBudget = action.payload;
    },

    setMaxLimit: (state, action) => {
      state.maxLimit = action.payload;
    },
    setCurrentTotalExpenses: (state, action) => {
      state.currentTotalExpenses = action.payload;
    },
    setDifference: (state, action) => {
      state.difference = action.payload;
    },
    setNotPartOfBudgetTotalSpending: (state, action) => {
      state.notPartOfBudgetTotalSpending = action.payload;
    },
    setPartOfBudgetTotalSpending: (state, action) => {
      state.partOfBudgetTotalSpending = action.payload;
    },

    setPreviousTotalExpenses: (state, action) => {
      state.previousTotalExpenses = action.payload;
    },

    setCalculatedCriticalExpenses: (state, action) => {
      state.calculatedCriticalExpenses = action.payload;
    },
  },
});

// export all actions
export const {
  setNotPartOfBudgetAmount,
  setExpensesData,
  setExpensesDataCounter,
  setChecked,
  setAmount,
  setDescription,
  setPartOfBudget,
  setMaxLimit,
  setCurrentTotalExpenses,
  setDifference,
  setNotPartOfBudgetTotalSpending,
  setPartOfBudgetTotalSpending,
  setPreviousTotalExpenses,
  setCalculatedCriticalExpenses,
} = navSlice.actions;

// Selectors
export const selectNotPartOfBudgetAmount = (state) =>
  state.nav.notPartOfBudgetAmount;
export const selectExpensesData = (state) => state.nav.expensesData;
export const selectExpensesDataCounter = (state) =>
  state.nav.expensesDataCounter;
export const selectChecked = (state) => state.nav.checked;
export const selectAmount = (state) => state.nav.amount;
export const selectDescription = (state) => state.nav.description;
export const selectIsPartOfBudget = (state) => state.nav.isPartOfBudget;
export const selectMaxLimit = (state) => state.nav.maxLimit;
export const selectCurrentTotalExpenses = (state) =>
  state.nav.currentTotalExpenses;
export const selectDifference = (state) => state.nav.difference;
export const selectNotPartOfBudgetTotalSpending = (state) =>
  state.nav.notPartOfBudgetTotalSpending;
export const selectPartOfBudgetTotalSpending = (state) =>
  state.nav.partOfBudgetTotalSpending;
export const selectPreviousTotalExpenses = (state) =>
  state.nav.previousTotalExpenses;
export const selectCalculatedCriticalExpenses = (state) =>
  state.nav.calculatedCriticalExpenses;

// Export reducer
export default navSlice.reducer;
