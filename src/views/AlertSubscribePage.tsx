import { useHistory } from "react-router-native";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
import {
  Colors,
  FontSize,
  FontWeight,
  Position,
  Spacing,
} from "../common/styles/styles";
import { Alerts } from "../common/alerts";
import React, { useState } from "react";
import { AlertField, AlertFieldValue } from "../types/models";

const AlertSubscribePage = () => {
  const history = useHistory();
  const alertFields = Alerts.TERRA__ANCHOR__LTV_RATIO.fields;
  const [alertFieldValues, setAlertFieldValues] = useState<AlertFieldValue[]>(
    alertFields.map((alertField: AlertField) => ({ ...alertField, value: "" }))
  );


  return (
    <>
      <View style={{ position: Position.RELATIVE }}>
        <Text style={{ fontSize: FontSize.MD, textAlign: "center" }}>
          Subscribe to {Alerts.TERRA__ANCHOR__LTV_RATIO.name}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          paddingTop: Spacing.SM,
        }}
      >
        <View
          style={{ width: "90%", marginLeft: "5%", paddingTop: Spacing.MD }}
        >
          {alertFields.map((field: AlertField) => {
            return (
              <View key={field.key} style={{ marginTop: Spacing.LG }}>
                <Text
                  style={{
                    fontSize: FontSize.LG,
                    fontWeight: FontWeight.SEMI_BOLD,
                    color: Colors.GRAY_700,
                  }}
                >
                  {field.name}
                </Text>
                <TextInput
                  style={{
                    fontSize: FontSize.MD,
                    fontWeight: FontWeight.THIN,
                    color: Colors.GRAY_700,
                    paddingTop: Spacing.XS,
                  }}
                  placeholder={field.description}
                  placeholderTextColor={Colors.GRAY_500}
                  multiline={true}
                  autoCapitalize={false}
                  textAlignVertical={"top"}
                  value={alertFieldValues.find(
                    (fieldInput: FieldInputValue) => fieldInput.value ?? ""
                  )}
                  onChangeText={(newText: string) => {
                    setAlertFieldValues(
                      alertFieldValues.map((fieldValue: AlertFieldValue) => {
                        if (fieldValue.key === field.key) {
                          return {
                            ...fieldValue,
                            value: newText,
                          };
                        } else {
                          return fieldValue;
                        }
                      })
                    );
                  }}
                ></TextInput>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Button
        title="Confirm"
        onPress={() => console.log(" confirm subscribed")}
      />
      <Button
        title="Back"
        onPress={async () => {
          history.goBack();
        }}
      />
    </>
  );
};

export default AlertSubscribePage;
