import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';


import { initNotifications } from '../common/pushNotifications';
import { registerBackgroundTask } from '../common/backgroundTasks';
import MainRouter from "../MainRouter";


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
    <MainRouter />
  );
}
