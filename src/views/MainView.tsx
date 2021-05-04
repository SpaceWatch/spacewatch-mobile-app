import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';


import { scheduleNotification, registerForPushNotificationsAsync, useNotificationSubscription, initNotifications} from '../common/pushNotifications';
import { registerBackgroundTask} from '../common/backgroundTasks';
import {printExchangeRate, sendLuna} from "../common/testApi";


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
    }
    init();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Button
        title="HELP"
        onPress={async () => {
          await scheduleNotification();
        }}
      />
        <Button
            title="Transfer to Lai Wei wallet"
            onPress={async () => {
                await scheduleNotification('Trasnfer Success', await sendLuna());
            }}
        />
    </View>
  );
}
