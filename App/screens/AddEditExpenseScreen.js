import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../stylesheets/AddEditExpenseScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import Colors from "../constants/Color";
import ModalPopUp from "../components/ModalPopUp";
import {
  formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces,
  isAreWeInAddExpenseScreen,
} from "../constants/StaticMethod";
import {
  ADD_EXPENSE_SCREEN,
  EXPENSE_SCREEN,
  HOME_SCREEN,
  MODAL_POP_CLEAR_EXPENSE,
  MODAL_POP_UP_SAVE,
} from "../constants/StaticVariable";
import {
  getExpensesFromUserDevice,
  saveExpensesToUserDevice,
} from "../database/AsyncStorageDB";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAmount,
  selectChecked,
  selectDescription,
  selectExpensesData,
  selectExpensesDataCounter,
  selectIsPartOfBudget,
  setAmount,
  setChecked,
  setDescription,
  setPartOfBudget,
} from "../slices/navSlice";
import moment from "moment-timezone";

const AddEditExpenseScreen = ({ route }) => {
  const [loggerClass, setLoggerClass] = useState("[AddEditExpenseScreen.js]");

  const { screenHeaderText, screenMode } = route.params;
  const expensesData = useSelector(selectExpensesData);
  const expensesDataCounter = useSelector(selectExpensesDataCounter);

  const [isShowModal, setShowModal] = useState(false);
  const [isShowSaveModal, setSaveShowModal] = useState(false);
  const navigation = useNavigation();
  const checked = useSelector(selectChecked);
  const amount = useSelector(selectAmount);
  const description = useSelector(selectDescription);
  const isPartOfBudget = useSelector(selectIsPartOfBudget);

  const dispatch = useDispatch();

  const expenseDataToSave = {
    id:
      screenMode == ADD_EXPENSE_SCREEN
        ? expensesDataCounter
        : route.params.expenseId,
    amount:
      amount == ""
        ? "0.00"
        : formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces(amount),
    description: description,
    isPartOfBudget: isPartOfBudget,
    dateMonthDay: moment().format("MMM DD"),
    dateYear: moment().format("YYYY"),
  };

  // Logging Purpoese
  console.log("");
  console.log("");
  console.log("");
  console.log("");
  console.log(
    loggerClass,
    " ************************************************************************************"
  );
  console.log(loggerClass, " expensesData: ", expensesData);
  console.log(loggerClass, " id: ", expenseDataToSave.id);
  console.log(loggerClass, " amount: ", expenseDataToSave.amount);
  console.log(loggerClass, " description: ", expenseDataToSave.description);
  console.log(
    loggerClass,
    " isPartOfBudget: ",
    expenseDataToSave.isPartOfBudget
  );
  console.log(loggerClass, " dateMonthDay: ", expenseDataToSave.dateMonthDay);
  console.log(loggerClass, " dateYear: ", expenseDataToSave.dateYear);
  console.log(loggerClass, " screenHeaderText: ", screenHeaderText);
  console.log(
    loggerClass,
    " isAreWeInAddExpenseScreen ",
    isAreWeInAddExpenseScreen(screenMode)
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with button screen name and check icon */}
      <View style={styles.headerPanelWrapper}>
        <View style={styles.backBtnAddExpenseLabelPanelWrapper}>
          {/* Back Button */}
          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="chevron-back" type="ionicon" size={30} color="white" />
          </TouchableOpacity>

          {/* Add Expense Header Label */}
          <Text style={styles.addExpenseLabelTextWrapper}>
            {screenHeaderText}
          </Text>
        </View>

        {/*  delete button  */}
        {screenMode == EXPENSE_SCREEN && (
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
              style={{ marginHorizontal: 5, marginRight: 10 }}
            />
          </TouchableOpacity>
        )}

        {/* Check button, save button */}
        <TouchableOpacity
          style={{ marginRight: 11 }}
          onPress={() => {
            setSaveShowModal(true);
          }}
        >
          <Icon name="check" type="font-awesome-5" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Amount Input field */}
      <Input
        placeholder="0.00"
        keyboardType="numeric"
        type="text"
        leftIcon={
          <Icon
            name="money-bill"
            type="font-awesome-5"
            size={28}
            color="white"
            style={{ marginRight: 6 }}
          />
        }
        inputContainerStyle={styles.amountInputFieldPanelWrapper}
        inputStyle={{
          fontFamily: "Grandstander-Regular",
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
        }}
        value={amount}
        onChangeText={(number) => {
          // console.log(loggerClass, " number: ", number);
          dispatch(setAmount(number));
        }}
      />

      {/* Enter Description Field */}
      <Input
        placeholder="Enter a description "
        type="text"
        leftIcon={
          <Icon
            name="newspaper"
            type="font-awesome-5"
            size={28}
            color="white"
            style={{ marginRight: 6 }}
          />
        }
        multiline={true}
        inputContainerStyle={styles.enterDescriptionFieldPanelWrapper}
        inputStyle={{ fontFamily: "Grandstander-Regular", color: "white" }}
        value={description}
        onChangeText={(text) => {
          dispatch(setDescription(text));
        }}
      />

      {/* Radio Button Panel  */}
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View>
          {/* Part of Budget */}
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              dispatch(setChecked("first"));
              dispatch(setPartOfBudget(true));
            }}
          >
            <RadioButton
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => {
                dispatch(setChecked("first"));
                dispatch(setPartOfBudget(true));
              }}
              color="white"
            />
            <Icon
              name="check"
              type="font-awesome-5"
              size={18}
              color={Colors.green_v1}
            />
            <Text
              style={{
                marginLeft: 5,
                color: "white",
                fontFamily: "Grandstander-Regular",
              }}
            >
              part of budget
            </Text>
          </TouchableOpacity>

          {/* NOT Part of Budget */}
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              dispatch(setChecked("second"));
              dispatch(setPartOfBudget(false));
            }}
          >
            <RadioButton
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => {
                dispatch(setChecked("second"));
                dispatch(setPartOfBudget(false));
              }}
              color="white"
            />
            <Icon
              name="cross"
              type="entypo"
              size={25}
              color={Colors.red_v1}
              style={{ marginLeft: -5 }}
            />
            <Text
              style={{
                color: "white",
                fontFamily: "Grandstander-Regular",
              }}
            >
              NOT part of budget
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Clear Expense Modal PopUp */}
      <ModalPopUp
        modelPopUpMode={MODAL_POP_CLEAR_EXPENSE}
        screenMode={EXPENSE_SCREEN}
        questionLabel="Are you sure you want to delete this expense? "
        setShowModal={setShowModal}
        isShowModal={isShowModal}
        expenseDataToSave={expenseDataToSave}
      />

      {/* Save Modal PopUp */}
      <ModalPopUp
        screenMode={screenMode}
        modelPopUpMode={MODAL_POP_UP_SAVE}
        questionLabel={
          screenMode == EXPENSE_SCREEN
            ? "Are you sure you want to save this expense? "
            : "Are you sure you want to save the changes to this expense? "
        }
        setShowModal={setSaveShowModal}
        isShowModal={isShowSaveModal}
        expenseDataToSave={expenseDataToSave}
      />

      {/*  */}
    </SafeAreaView>
  );
};

export default AddEditExpenseScreen;
