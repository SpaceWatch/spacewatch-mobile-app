import { useHistory } from "react-router-native";
import { Button, View, TextInput, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Routes from "../routes";
import { validateMnemonic, getMnemonicKeys } from "@terra-money/key-utils";
import { tequilaConfig } from "../common/testWallet";
import { MnemonicKey } from "@terra-money/terra.js";

const WalletNew = () => {
  const history = useHistory();
  // const [mnemonicString, setMnemonicString] = useState<string>('');
  //
  // useEffect(() => {
  //   const mnemonic: MnemonicKey  = new MnemonicKey();
  //   setMnemonicString(mnemonic.mnemonic)
  // }, [])



  // console.log(mnemonic)
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {/*<Text>{mnemonicString}</Text>*/}

      <Button
        title="Back To Home (Wallet New)"
        onPress={async () => {
          history.push(Routes.BASE);
        }}
      />
    </View>
  );
};

export default WalletNew;
