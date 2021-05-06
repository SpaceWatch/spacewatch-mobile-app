import { useHistory } from "react-router-native";
import { Button, View, TextInput, Text } from "react-native";
import React, { useState } from "react";
import Routes from "../routes";
import { validateMnemonic, getMnemonicKeys } from "@terra-money/key-utils";
import { tequilaConfig } from "../common/testWallet";
import { MnemonicKey } from "@terra-money/terra.js";

const WalletRecovery = () => {
  const history = useHistory();
  const [mnemonicInput, setMnemonicInput] = useState("");

  const isMnemonicValid = () => {
    if (validateMnemonic(mnemonicInput) || mnemonicInput.length === 0) {
      return true;
    }
    return false;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View>
        <TextInput
          numberOfLines={10}
          style={{
            width: 300,
            height: 300,
            borderRadius: 20,
            borderColor: isMnemonicValid() ? "gray" : "red",
            borderStyle: "solid",
            borderWidth: 2,
            justifyContent: "center",
            paddingLeft: 10,
            marginTop: 50
          }}
          onChangeText={setMnemonicInput}
          placeholder="Enter Seed Phrase"
        />

        {!isMnemonicValid() &&
          <Text>
            Invalid Seed Phrase
          </Text>
        }
      </View>

      <Button
        title="Recover Wallet"
        onPress={async () => {
          if(validateMnemonic(mnemonicInput)) {
            try {
              //not sure which one to use
              const mk330 = new MnemonicKey({ mnemonic: mnemonicInput, coinType: 330 })
              const mk118 = new MnemonicKey({ mnemonic: mnemonicInput, coinType: 118 })
              console.log('current mk118 wallet address is ', mk118.accAddress);
              console.log('current mk330 wallet address is ', mk330.accAddress);
              history.push(Routes.LIST_ALL_ALERTS);
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
