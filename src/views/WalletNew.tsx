import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-native";
import { Button, View, TextInput, Text, TouchableOpacity } from "react-native";
import Clipboard from 'expo-clipboard';
import Routes from "../routes";
import { MnemonicKey, Wallet } from "@terra-money/terra.js";
import wordList from "../wordlist.json";
import _ from "lodash";
import { terra } from "../common/testWallet";
import { encrypt, decrypt } from "@terra-money/key-utils";
import sha256 from "crypto-js/sha256";
import * as SecureStore from 'expo-secure-store';
import { deleteItemAsync } from "expo-secure-store";

const WalletNew = () => {
  const history = useHistory();
  const [mnemonicString, setMnemonicString] = useState<string>("");
  const [newWallet, setNewWallet] = useState<Wallet>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const generateMnemonic = () => {
    const MNEMONIC_NUM_WORDS = 24;
    const newMnemonicString = _.sampleSize(wordList, MNEMONIC_NUM_WORDS).join(
      " "
    );
    setMnemonicString(newMnemonicString);
  };

  const copyToClipboard = () => {
    if (mnemonicString) {
      Clipboard.setString(mnemonicString);
    }
  }

  const saveToKeyChain = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  }

  const getValueFromKeyChain = async (key: string) => {
    try {
      const result = await SecureStore.getItemAsync(key);
      if (result) {
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const createAndSaveWallet = async () => {
    if (password === confirmPassword && password.length >= 10) {
      //hash password
      const hashedPassword = JSON.stringify(sha256(password));
      console.log(`Hashed password is ${hashedPassword}`);

      //get private key
      const mk = new MnemonicKey({ mnemonic: mnemonicString });
      Uint8Array.from(mk.privateKey);
      const pkToEncrypt = String.fromCharCode(...Uint8Array.from(mk.privateKey));

      //encrypt private key
      const encryptedPK = encrypt(pkToEncrypt, password);
      // console.log("Encrypted private key is", encryptedPK);
      // const decryptedPK = decrypt(encryptedPK, password);
      // console.log("decrypted private key", decryptedPK);
      // console.log("are both keys equal? ", pkToEncrypt === decryptedPK);

      //save in keychain
      if (await SecureStore.isAvailableAsync()) {
        await saveToKeyChain("encryptedPK", encryptedPK);
        await saveToKeyChain("hashedPassword", hashedPassword);
      }

      const wallet = terra.wallet(mk);
      console.log('Created new wallet, wallet address is ', wallet.key.accAddress);
    }
  };

  const getStoredData = async () => {
    const hashedPassword = await getValueFromKeyChain("hashedPassword");
    const encryptedKey = await getValueFromKeyChain("encryptedPK");

    // logs to test
    console.log("----------");
    console.log("getting keychain data....");
    console.log("obtained hashed password: ", hashedPassword);
    console.log("obtained encrypted key: ", encryptedKey);

    const hashedTestPassword = JSON.stringify(sha256("password11"));
    console.log("hashed password matches sha256(`password')? ", hashedTestPassword === hashedPassword);
  }

  const wipedStoredData = async () => {
    await deleteItemAsync("hashedPassword");
    await deleteItemAsync("encryptedPK");
    console.log("wiped stored data");
  }


  useEffect(() => {
    generateMnemonic();
    const newWallet = terra.wallet(
      new MnemonicKey({ mnemonic: mnemonicString })
    );
    setNewWallet(newWallet);
  }, []);

  // console.log(mnemonic)
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          height: 35,
          alignItems: "center",
          justifyContent: "space-around"
        }}
      />

      <View
        style={{
          flex: 1/3,
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <Text> Seed Phrase </Text>

        <Text
          style={{
            color: "red"
          }}
        >
          If you lose your seed phrase it's gone forever, this app doesn't store any data.
        </Text>

        <Text
          style={{
            width: 300,
            height: 100,
            borderRadius: 10,
            borderColor: "gray",
            borderStyle: "solid",
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
        >
          {mnemonicString}
        </Text>

        <TouchableOpacity
          onPress={() => copyToClipboard()}
          style={{ marginBottom: 10 }}
        >
          <Text style={{color: "blue"}}>Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={generateMnemonic}
          style={{
            marginBottom: 10,
          }}
        >
          <Text style={{color: "blue"}}>Generate New Key</Text>
        </TouchableOpacity>

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
            borderColor: password === confirmPassword ? "gray" : "red",
            borderStyle: "solid",
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          secureTextEntry={true}
          onChangeText={setPassword}
          placeholder="Password"
        />

        {(password.length > 0 && password.length < 10) &&
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
            borderColor: password === confirmPassword ? "gray" : "red",
            borderStyle: "solid",
            borderWidth: 1,
            marginTop: 5,
            marginBottom: 10,
            paddingLeft: 10,
          }}
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
        />

        {password !== confirmPassword &&
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
        title="Create Wallet"
        onPress={async () => {
          if (password === confirmPassword) {
            await createAndSaveWallet();
          }
        }}
      />

      <Button
        title="Get Keychain Data"
        onPress={async () => {
          await getStoredData();
        }}
      />

      <Button
        title="Wipe Keychain Data"
        onPress={async () => {
          await wipedStoredData();
        }}
      />

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
