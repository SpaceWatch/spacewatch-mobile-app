import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";

import { initNotifications } from "../common/pushNotifications";
import { registerBackgroundTask } from "../common/backgroundTasks";
import MainRouter from "../MainRouter";
import { View } from "react-native";
import { NativeRouter } from "react-router-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function MainView() {
  useEffect(() => {
    const init = async () => {
      await initNotifications();
      await registerBackgroundTask();
    };
    init();
  }, []);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <NativeRouter>
        <MainRouter />
      </NativeRouter>
    </View>
  );
}
