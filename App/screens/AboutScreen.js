import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { styles } from "../stylesheets/AboutScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { APP_VERSION } from "../constants/StaticVariable";

const AboutScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with button screen name and edit and check icon */}
      <View style={styles.headerPanelWrapper}>
        <View style={styles.backBtnAboutScreenLabelPanelWrapper}>
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
          <Text style={styles.aboutScreenLabelTextWrapper}>About </Text>
        </View>
      </View>

      {/* CENTER TEXT MESSAGE*/}
      <View style={styles.centerMessageTextLabelWrapper}>
        <Text
          style={[
            styles.textLabelWrapper,
            { fontSize: 30, textAlign: "center", marginHorizontal: 12 },
          ]}
        >
          Building more features soon...
        </Text>
      </View>

      {/* App Version Text Lavel */}
      <View style={styles.appVersionTextLabelWrapper}>
        <Text style={styles.textLabelWrapper}>Developed by: pACEdor</Text>
        <Text style={styles.textLabelWrapper}>{APP_VERSION}</Text>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;
