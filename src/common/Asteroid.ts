import { MsgExecuteContract, Wallet } from '@terra-money/terra.js';
import { Alert } from "react-native";
import { Subscription } from "../types/models";

const Asteroid = (wallet: Wallet) => {
  const lcdClient = wallet.lcd;
  const walletAddress = wallet.key.accAddress;
  const ALERT_CONTRACT_ADDRESS = 'terra1j9rtku20p68yxhw0ltygau5y2nflxs50mkuypg';

  const getAlerts = async (): Promise<Alert[]> => {
    return await lcdClient.wasm.contractQuery(ALERT_CONTRACT_ADDRESS, {
      get_alerts: {},
    });
  };

  const getSubscriptions = async (): Promise<Subscription[]> => {
    return await lcdClient.wasm.contractQuery(ALERT_CONTRACT_ADDRESS, {
      get_subscriptions_for_address: {
        subscriber_addr: walletAddress,
      },
    });
  };

  const subscribeAlert = async (alertKey: string) => {
    // new MsgExecuteContract()
    // wallet
    //   .createAndSignTx({
    //     msgs: [send],
    //     memo: 'test from terra.js!',
    //   })
    //   .then(tx => terra.tx.broadcast(tx))
    //   .then(result => {
    //     console.log(`TX hash: ${result.txhash}`);
    //   });
  };

  const unsubscribeAlert = async (alertKey: string) => {};
  return {
    getAlerts,
    getSubscriptions,
    subscribeAlert,
    unsubscribeAlert,
  };
};

export default Asteroid;
