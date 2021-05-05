import React from "react";
import { Button, View } from "react-native";
import { scheduleNotification } from "../common/pushNotifications";
import { sendLuna } from "../common/testApi";
import { useHistory } from "react-router-native";
import Routes from "../routes";

const Home = () => {
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
        title="HELP"
        onPress={async () => {
          await scheduleNotification();
        }}
      />
      <Button
        title="Transfer to Lai Wei wallet"
        onPress={async () => {
          await scheduleNotification("Transfer Success", await sendLuna());
        }}
      />
      <Button
        title="See all watchers"
        onPress={() => {
          history.push(Routes.LIST_ALL_ALERTS);
        }}
      />
      <Button
        title="Create New Wallet"
        onPress={() => {
          history.push(Routes.WALLET_NEW);
        }}
      />
      <Button
        title="Recover Wallet"
        onPress={() => {
          history.push(Routes.WALLET_RECOVER);
        }}
      />
    </View>
  );
};
export default Home;
