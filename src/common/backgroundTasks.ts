
export const BACKGROUND_TASK_NAME = 'background-task';

import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from "expo-background-fetch";

import { scheduleNotification} from './pushNotifications';

/**
 * https://chafikgharbi.com/expo-background-task/
 */

TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    // 1. Fetch all subscriptions
    // 2. Run the alert subscription
    // 3. If returns true
    console.log('test')
    await scheduleNotification();
    const res = true;
    return res ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
  } catch (error) {
    return BackgroundFetch.Result.Failed;
  }
});

export const registerBackgroundTask = async() => {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
      // Inexact interval in seconds between subsequent repeats of the background fetch alarm.
      // The final interval may differ from the specified one to minimize wakeups and battery usage.
      // On Android it defaults to 15 minutes. On iOS it calls BackgroundFetch.setMinimumIntervalAsync behind the scenes
      // and the default value is the smallest fetch interval supported by the system (10-15 minutes).
      minimumInterval: 5, // seconds
      stopOnTerminate: false,
      startOnBoot: true,
    })
    console.log("Task registered")
  } catch (err) {
    console.log("Task Register failed:", err)
  }
}
