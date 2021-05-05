import { useHistory } from "react-router-native";
import { Button, View, TextInput, Text } from "react-native";
import React, { useState } from "react";
import Routes from "../routes";
import { validateMnemonic, getMnemonicKeys } from "@terra-money/key-utils";
import { tequilaConfig } from "../common/testWallet";
import { MnemonicKey } from "@terra-money/terra.js";

const WalletRecovery = () => {
  const history = useHistory();
  const [mnemonic, setMnemonic] = useState("");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <TextInput
        numberOfLines={10}
        style={{
          width: 300,
          height: 300,
          borderRadius: 20,
          borderColor: "gray",
          borderStyle: "solid",
          borderWidth: 1,
          justifyContent: "center",
        }}
        onChangeText={setMnemonic}
        placeholder="Enter Seed Phrase"
      />

      <Text>
        {}
      </Text>

      <Button
        title="Recover Wallet"
        onPress={async () => {
          if(validateMnemonic(mnemonic)) {
            try {
              const mk118 = new MnemonicKey({ mnemonic, coinType: 118 })
              const mk330 = new MnemonicKey({ mnemonic, coinType: 330 })
              console.log(mk330.accAddress);
              //route to next page
              history.push(Routes.BASE);
            } catch (error) {
              console.error(error);
            }
          };
        }}
      />
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
