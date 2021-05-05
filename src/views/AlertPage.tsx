import { useHistory } from "react-router-native";
import AlertList from "./AlertList";
import { Button, View } from "react-native";
import Routes from "../routes";
import React from "react";

const AlertPage = () => {
  const history = useHistory();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>

      <Button
        title="Back"
        onPress={async () => {
          history.goBack();
        }}
      />
    </View>
  );
};

export default AlertPage;