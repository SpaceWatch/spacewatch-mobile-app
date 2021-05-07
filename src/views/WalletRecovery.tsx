import { useHistory } from "react-router-native";
import { Button, View, TextInput, Text } from "react-native";
import React, { useState } from "react";
import Routes from "../routes";
import { validateMnemonic, encrypt, } from "@terra-money/key-utils";
import { MnemonicKey } from "@terra-money/terra.js";
import { Colors, FontSize, FontWeight } from "../common/styles/styles";
import * as SecureStore from "expo-secure-store";
import sha256 from "crypto-js/sha256";

const WalletRecovery = () => {
  const history = useHistory();
  const [mnemonicInput, setMnemonicInput] = useState("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const isMnemonicValid = () => {
    if (validateMnemonic(mnemonicInput) || mnemonicInput.length === 0) {
      return true;
    }
    return false;
  }

  const recoverAndSave = async (mk: MnemonicKey) => {
    if (validateMnemonic(mnemonicInput) &&
      newPassword === confirmNewPassword &&
      newPassword.length >= 10
    ) {
      //hash password
      const hashedPassword = JSON.stringify(sha256(newPassword));

      //encrypt private key
      const pkToEncrypt = String.fromCharCode(...Uint8Array.from(mk.privateKey));
      const encryptedPK = encrypt(pkToEncrypt, newPassword);

      //if SecureStore exits, save in keychain, otherwise cannot proceed
      if (await SecureStore.isAvailableAsync()) {
        await SecureStore.setItemAsync("encryptedPK", encryptedPK);
        await SecureStore.setItemAsync("hashedPassword", hashedPassword);
        history.push(Routes.LIST_ALL_ALERTS);
        console.log("Wallet imported, saved data in keychain")
      } else {
        throw Error('SecureStore does not exist on this device.. cannot proceed further')
      }

    } else {
      console.log('PASSWORD INPUT INCORRECT')
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: Colors.GRAY_100,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.BLUE_100,
          justifyContent: "center",
          width: '100%',
          alignItems: 'center',
          height: '20%',
        }}
      >
        <Text style={{
          fontSize: FontSize.LG,
          fontWeight: FontWeight.BOLD,
          color: Colors.GRAY_700
        }}>
          Recover Wallet
        </Text>
      </View>
      <View>
        <TextInput
          numberOfLines={10}
          style={{
            width: 300,
            height: 50,
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

      <View
        style={{
          flex: 1 / 4,
          height: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <TextInput
          numberOfLines={1}
          style={{
            width: 300,
            height: 30,
            borderRadius: 20,
            borderColor: newPassword === confirmNewPassword ? "gray" : "red",
            borderStyle: "solid",
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          secureTextEntry={true}
          onChangeText={setNewPassword}
          placeholder="New Password"
        />

        {(newPassword.length > 0 && newPassword.length < 10) &&
        <Text
          style={{
            color: "red",
          }}
        >
          Password must be longer than 10 characters
        </Text>
        }

        <TextInput
          numberOfLines={1}
          style={{
            width: 300,
            height: 30,
            borderRadius: 20,
            borderColor: newPassword === confirmNewPassword ? "gray" : "red",
            borderStyle: "solid",
            borderWidth: 1,
            marginTop: 5,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          secureTextEntry={true}
          onChangeText={setConfirmNewPassword}
          placeholder="Confirm New Password"
        />

        {newPassword !== confirmNewPassword &&
        <Text
          style={{
            color: "red",
          }}
        >
          Passwords does not match!
        </Text>
        }

      </View>

      <Button
        title="Recover Wallet"
        onPress={async () => {
            try {
              const mk = new MnemonicKey({ mnemonic: mnemonicInput })
              await recoverAndSave(mk);
            } catch (error) {
              console.error(error);
            }
        }}
      />
      <Button
        title="Back To Home"
        onPress={async () => {
          history.goBack();
        }}
      />
    </View>
  );
};

export default WalletRecovery;
