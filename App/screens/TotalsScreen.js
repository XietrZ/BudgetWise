import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { styles } from "../stylesheets/TotalsScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import Colors from "../constants/Color";
import ModalPopUp from "../components/ModalPopUp";
import {
  EXPENSE_SCREEN,
  MODAL_POP_UP_SAVE,
  TOTAL_SCREEN,
} from "../constants/StaticVariable";
import {
  formatNumberRemoveComma,
  formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces,
} from "../constants/StaticMethod";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCalculatedCriticalExpenses,
  selectCurrentTotalExpenses,
  selectDifference,
  selectMaxLimit,
  selectNotPartOfBudgetTotalSpending,
  selectPartOfBudgetTotalSpending,
  selectPreviousTotalExpenses,
  setMaxLimit,
  setPreviousTotalExpenses,
} from "../slices/navSlice";

const TotalsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isEdit, setEdit] = useState(false);
  const [isShowSaveModal, setSaveShowModal] = useState(false);
  const maxLimit = useSelector(selectMaxLimit);
  const currentTotalExpenses = useSelector(selectCurrentTotalExpenses);
  const previousTotalExpenses = useSelector(selectPreviousTotalExpenses);
  const difference = useSelector(selectDifference);
  const partOfBudgetTotalSpending = useSelector(
    selectPartOfBudgetTotalSpending
  );
  const notPartOfBudgetTotalSpending = useSelector(
    selectNotPartOfBudgetTotalSpending
  );
  const calculatedCriticalExpenses = useSelector(
    selectCalculatedCriticalExpenses
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with button screen name and edit and check icon */}
      <View style={styles.headerPanelWrapper}>
        <View style={styles.backBtnAddExpenseLabelPanelWrapper}>
          {/* Back Button */}
          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
          >
            <Icon name="chevron-back" type="ionicon" size={30} color="white" />
          </TouchableOpacity>

          {/* Add Expense Header Label */}
          <Text style={styles.spendingSummaryLabelTextWrapper}>
            Spending Summary
          </Text>
        </View>

        {/* Edit button */}
        {!isEdit && (
          <TouchableOpacity
            style={{ marginRight: 11 }}
            onPress={() => {
              setEdit(true);
              setSaveShowModal(false);
              dispatch(setMaxLimit(formatNumberRemoveComma(maxLimit)));
              dispatch(
                setPreviousTotalExpenses(
                  formatNumberRemoveComma(previousTotalExpenses)
                )
              );
            }}
          >
            <Icon name="edit" type="font-awesome-5" size={22} color="white" />
          </TouchableOpacity>
        )}

        {/* Save button */}
        {isEdit && (
          <TouchableOpacity
            style={{ marginRight: 11 }}
            onPress={() => {
              // setEdit(false);
              setSaveShowModal(true);
            }}
          >
            <Icon name="check" type="font-awesome-5" size={22} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/*  Max Limit Panel && Current Expenses Panel && Differences Panel */}
      <View style={{ alignItems: "center", marginTop: 25 }}>
        <View>
          {/* Max Limit Panel */}
          <View style={styles.topPanelWrapper}>
            <Text style={styles.textLabelWrapper}>Max Limit:</Text>
            <TextInput
              editable={isEdit}
              placeholder="0.00"
              keyboardType="numeric"
              value={maxLimit}
              onChangeText={(number) => {
                dispatch(setMaxLimit(number));
              }}
              contentStyle={[
                styles.textLabelWrapper,
                { fontSize: 20, marginLeft: 5 },
              ]}
              style={{
                backgroundColor: Colors.backgroundBg,
                width: 130,
                borderBottomWidth: 1,
                borderBottomColor: "white",
                // borderStyle: "dotted",
              }}
            ></TextInput>
          </View>

          {/* Subtract Sign */}
          <View style={{ marginVertical: 5, marginLeft: -30 }}>
            <Icon name="minus" type="font-awesome-5" size={15} color="white" />
          </View>

          {/* Current Expenses Panel */}
          <View style={[styles.topPanelWrapper, { marginTop: -10 }]}>
            <View style={{ marginRight: 6 }}>
              <Text style={styles.textLabelWrapper}>Total</Text>
              <Text style={styles.textLabelWrapper}>Expenses</Text>
            </View>
            <TextInput
              editable={isEdit}
              placeholder="0.00"
              keyboardType="numeric"
              value={previousTotalExpenses}
              onChangeText={(number) => {
                dispatch(setPreviousTotalExpenses(number));
              }}
              contentStyle={[
                styles.textLabelWrapper,
                { fontSize: 20, marginLeft: 5 },
              ]}
              style={{
                backgroundColor: Colors.backgroundBg,
                width: 130,
                borderBottomWidth: 1,
                borderBottomColor: "white",
                // borderStyle: "dotted",
              }}
            ></TextInput>
          </View>

          {/* Differences Panel */}
          <View style={styles.topPanelWrapper}>
            <Text style={styles.textLabelWrapper}>Difference:</Text>
            <Text
              style={[
                styles.textLabelWrapper,
                {
                  backgroundColor: Colors.backgroundBg,
                  width: 130,
                  fontSize: 20,
                  marginLeft: 17,
                },
              ]}
            >
              {formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces(
                difference
              )}
            </Text>
          </View>
        </View>
      </View>

      {/* Total Spending NOT Part of Budget Panel && Total Spending Part of Budget Panel */}
      <View
        style={{
          // backgroundColor: "yellow",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <View style={{ marginTop: -25 }}>
          {/* Calculated Difference plus Not Part of Budget Expenses */}
          <View
            style={{
              marginTop: 10,
            }}
          >
            {/* FORMULA: Difference + Not Part of Budget, When difference is negative, add negative */}
            <Text style={styles.textLabelWrapper}>
              Calculated Critical Expenses Value
            </Text>

            <Text
              style={[
                styles.textLabelWrapper,
                {
                  backgroundColor: Colors.backgroundBg,
                  width: 130,
                  fontSize: 20,
                  fontWeight: 900,
                  color: "red",
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

          {/* Total Spending NOT Part of Budget Panel */}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabelWrapper}>
              Total Spending NOT Part of Budget
            </Text>
            <Text
              style={[
                styles.textLabelWrapper,
                {
                  backgroundColor: Colors.backgroundBg,
                  width: 130,
                  fontSize: 20,
                  color: Colors.red_v1,
                },
              ]}
            >
              {formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces(
                notPartOfBudgetTotalSpending
              )}
            </Text>
          </View>

          {/* Total Spending Part of Budget Panel */}
          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text style={styles.textLabelWrapper}>
              Total Spending Part of Budget
            </Text>
            <Text
              style={[
                styles.textLabelWrapper,
                {
                  backgroundColor: Colors.backgroundBg,
                  width: 130,
                  fontSize: 20,
                },
              ]}
            >
              {formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces(
                partOfBudgetTotalSpending
              )}
            </Text>
          </View>

          {/* CURRENT TOTAL EXPENSES */}
          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text style={styles.textLabelWrapper}>Current Total Expenses</Text>
            <Text
              style={[
                styles.textLabelWrapper,
                {
                  backgroundColor: Colors.backgroundBg,
                  width: 130,
                  fontSize: 20,
                },
              ]}
            >
              {formatNumberfromNormalNumberToCommaAndTwoDecimalPlaces(
                currentTotalExpenses
              )}
            </Text>
          </View>
        </View>
      </View>

      {/* Save Modal PopUp */}
      <ModalPopUp
        screenMode={TOTAL_SCREEN}
        modelPopUpMode={MODAL_POP_UP_SAVE}
        questionLabel="Do you want to save this Max Limit?"
        setShowModal={setSaveShowModal}
        isShowModal={isShowSaveModal}
        setEdit={setEdit}
      />

      {/*  */}
    </SafeAreaView>
  );
};

export default TotalsScreen;
