import React from 'react';
import { Button, View } from 'react-native';
import { scheduleNotification } from '../common/pushNotifications';
import { sendLuna } from '../common/testApi';
import { useHistory } from 'react-router-native';
import Routes from '../routes';
import { LCDClient, MnemonicKey } from '@terra-money/terra.js';
import Asteroid from '../common/Asteroid';
import { Subscription, Alert } from '../types/models';

const Home = () => {
  const history = useHistory();
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
        title="Call the blokchain"
        onPress={async () => {
          const tequilaConfig = {
            URL: 'https://tequila-lcd.terra.dev',
            chainID: 'tequila-0004',
          };
          const terra = new LCDClient(tequilaConfig);
          const mk = new MnemonicKey({
            mnemonic:
              'balance attitude unveil maximum february sunny fresh learn minute arrange song media squirrel sail judge dance immune core asset sample escape talent donate hood',
          });
          const wallet = terra.wallet(mk);

          const asteroid = Asteroid(wallet);
          console.log(await asteroid.getSubscriptions());
          // const alerts: Alert[] = await asteroid.getAlerts();
          // console.log(alerts);

          await asteroid.subscribeAlert('TERRA.ANCHOR.LTV_ALERT', [
            { fieldKey: 'walletAddress', value: 'abcd1234' },
          ]);
          console.log(await asteroid.getSubscriptions());
          await asteroid.unsubscribeAlert('TERRA.ANCHOR.LTV_ALERT');
          console.log(await asteroid.getSubscriptions());
          //

          // console.log(await asteroid.getSubscriptions());
        }}
      />
      <Button
        title="Transfer to Lai Wei wallet"
        onPress={async () => {
          await scheduleNotification('Transfer Success', await sendLuna());
        }}
      />
      <Button
        title="See All Alerts"
        onPress={() => {
          history.push(Routes.LIST_ALL_ALERTS);
        }}
      />
    <Button
        title="My Subscriptions"
        onPress={() => {
            history.push(Routes.SUBSCRIPTION_LIST);
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
