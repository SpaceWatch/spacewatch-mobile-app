import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useHistory } from "react-router-native";
import Routes from "../routes";
import { getWalletFromPassword } from "../common/testWallet";

const WalletAuth = () => {
  const history = useHistory();
  const [password, setPassword] = useState<string>('');

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
          numberOfLines={1}
          style={{
            width: 300,
            height: 30,
            borderRadius: 20,
            borderColor: "gray",
            borderStyle: "solid",
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          secureTextEntry={true}
          onChangeText={setPassword}
          placeholder="Password"
        />

        <Button
          title="Enter dungeon"
          onPress={async () => {
            try {
              await getWalletFromPassword(password);
              history.push(Routes.LIST_ALL_ALERTS);
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </View>

    </View>
  );
};
export default WalletAuth;
