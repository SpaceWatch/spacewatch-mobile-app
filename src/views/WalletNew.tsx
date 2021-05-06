import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-native";
import { Button, View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import Routes from "../routes";
import { MnemonicKey, Wallet } from "@terra-money/terra.js";
import wordList from "../wordlist.json";
import _ from "lodash";
import { terra } from "../common/testWallet";
import { encrypt, decrypt } from "@terra-money/key-utils";
import sha256 from "crypto-js/sha256";
import * as SecureStore from 'expo-secure-store';

const WalletNew = () => {
  const history = useHistory();
  const [mnemonicString, setMnemonicString] = useState<string>("");
  const [newWallet, setNewWallet] = useState<Wallet>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


  const generateMnemonic = () => {
    const WORD_LIST_NUM_WORDS = 2048;
    const MNEMONIC_NUM_WORDS = 24;
    const newMnemonicString = _.sampleSize(wordList, MNEMONIC_NUM_WORDS).join(
      " "
    );
    setMnemonicString(newMnemonicString);
  };

  const saveToKeyChain = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  }

  const getValueFor = async (key: string) => {
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
    //hash password
    const hashedPassword = JSON.stringify(sha256(password));
    console.log(`Hashed password is ${hashedPassword}`);

    //get and encrypt private key
    const mk = new MnemonicKey({ mnemonic: mnemonicString });
    Uint8Array.from(mk.privateKey);
    const pkToEncrypt = String.fromCharCode(...Uint8Array.from(mk.privateKey));
    const encryptedPK = encrypt(pkToEncrypt, password);
    // console.log("Encrypted private key is", encryptedPK);

    // const decryptedPK = decrypt(encryptedPK, password);
    // console.log("decrypted private key", decryptedPK);
    // console.log("are both keys equal? ", pkToEncrypt === decryptedPK);

    //save in keychain
    await saveToKeyChain("encryptedPK", encryptedPK);
    await saveToKeyChain("hashedPassword", hashedPassword);
  };

  const getStoredData = async () => {
    const hashedPassword = await getValueFor("hashedPassword");
    const encryptedKey = await getValueFor("encryptedPK");

    // // logs to test
    // console.log("----------");
    // console.log("getting keychain data....");
    // console.log("obtained hashed password: ", hashedPassword);
    // console.log("obtained encrypted key: ", encryptedKey);
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
          Store Seed Phrase in a secure place bla bla bla
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
        title="Back To Home (Wallet New)"
        onPress={async () => {
          history.push(Routes.BASE);
        }}
      />
    </View>
  );
};

export default WalletNew;
