import { useHistory } from "react-router-native";
import AlertList from "./AlertList";
import {Button, View, Text, ScrollView, TouchableOpacity} from "react-native";
import { Alerts } from "../common/alerts";
import Routes from "../routes";
import React from "react";
import {Colors, FontSize, FontWeight, Position, Spacing} from "../common/styles/styles";

const AlertPage = () => {
  const history = useHistory();

  return (
    <>
      <View style={{ position: Position.RELATIVE }}>
        <Text style={{ fontSize: FontSize.MD, textAlign: "center" }}>
          Alert Details
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          paddingTop: Spacing.SM,
        }}
      >
        <View style={{ width: "90%", marginLeft: "5%", paddingTop: Spacing.MD }}>
            <Text style={{ fontSize: FontSize.MD, fontWeight: FontWeight.SEMI_BOLD, color: Colors.GRAY_700 }}>
              {Alerts.TERRA__ANCHOR__LTV_RATIO.name}
            </Text>
            <Text style={{ fontSize: FontSize.MD, fontWeight: FontWeight.THIN, color: Colors.GRAY_700, paddingTop: Spacing.SM }}>
                {Alerts.TERRA__ANCHOR__LTV_RATIO.blockchain}-{Alerts.TERRA__ANCHOR__LTV_RATIO.protocol}
            </Text>
            <Text style={{ fontSize: FontSize.SM, fontWeight: FontWeight.LIGHT, color: Colors.GRAY_700, paddingTop: Spacing.SM }}>
                {Alerts.TERRA__ANCHOR__LTV_RATIO.description}
            </Text>
        </View>
      </ScrollView>
        <Button title="Subscribe" onPress={() => history.push(Routes.ALERTS_SUBSCRIBE_PAGE)}/>
      <Button
        title="Back"
        onPress={async () => {
          history.goBack();
        }}
      />
    </>
  );
};

export default AlertPage;
