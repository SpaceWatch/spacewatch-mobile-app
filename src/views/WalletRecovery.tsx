import { useHistory } from "react-router-native";
import { Button, View } from "react-native";
import React from "react";
import Routes from "../routes";

const WalletRecovery = () => {
  const history = useHistory();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Button
        title="Back To Home (Wallet Recovery)"
        onPress={async () => {
          history.push(Routes.BASE);
        }}
      />
    </View>
  );
};

export default WalletRecovery;
