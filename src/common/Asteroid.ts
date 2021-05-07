import {
  BlockTxBroadcastResult,
  CreateTxOptions,
  MsgExecuteContract,
  StdTx,
  Wallet,
} from '@terra-money/terra.js';
import {
  SubscriptionFieldValue,
  Subscription,
  Alert,
  AlertField, QuerySubscriptionsResponse
} from "../types/models";

/**
 * Usage:
 * const asteroid = Asteroid(wallet);
 * asteroid.getAlerts();
 * asteroid.getSubscriptions();
 * asteroid.subscribeAlert(alertKey: string, fieldValues: AlertFieldValue);
 * asteroid.unsubscribeAlert(alertKey: string);
 */
const Asteroid = (wallet: Wallet) => {
  const lcdClient = wallet.lcd;
  const walletAddress = wallet.key.accAddress;
  console.log('my wallet address is ', walletAddress)
  const ALERT_CONTRACT_ADDRESS = 'terra1j9rtku20p68yxhw0ltygau5y2nflxs50mkuypg';

  const getAlerts = async (): Promise<Alert[]> => {
    return await lcdClient.wasm.contractQuery(ALERT_CONTRACT_ADDRESS, {
      get_alerts: {},
    });
  };

  const getSubscriptions = async (): Promise<Subscription[]> => {
    console.log('noob')
    // const alerts: Alert[] = await getAlerts();
    const querySubscriptionsRes: QuerySubscriptionsResponse[] = await lcdClient.wasm.contractQuery(
      ALERT_CONTRACT_ADDRESS,
      {
        get_subscriptions_for_address: {
          subscriber_addr: walletAddress,
        },
      },
    );
    return querySubscriptionsRes;

    // // Merge alerts and subscriptions on client side for now -- TODO: Shift this to smart contract
    // const subscriptions: Subscription[] = querySubscriptionsRes.map((subscriptionRes) => {
    //   const alert = alerts.find(
    //     (alert: Alert) => alert.alertKey === subscriptionRes.alertKey,
    //   );
    //   return {
    //     ...alert,
    //     ...subscriptionRes,
    //     fields: alert.fields.map((alertField: AlertField) => ({
    //       ...alertField,
    //       value: subscriptionRes.fields.find(
    //         (fieldValue: SubscriptionFieldValue) =>
    //           fieldValue.fieldKey === alertField.fieldKey,
    //       ).value,
    //     })),
    //   };
    // });
    // return subscriptions;
  };

  // TODO: Let user know bout gas fees before actually broadcasting the transaction
  const subscribeAlert = async (
    alertKey: string,
    fieldValues: SubscriptionFieldValue[],
  ) => {
    const subscribeAlertMsg: MsgExecuteContract = new MsgExecuteContract(
      walletAddress,
      ALERT_CONTRACT_ADDRESS,
      {
        subscribe_alert: {
          alert_key: alertKey,
          field_values: fieldValues,
        },
      },
    );
    const signedTx: StdTx = await wallet.createAndSignTx({
      msgs: [subscribeAlertMsg],
    });
    console.log(signedTx);
    const result: BlockTxBroadcastResult = await lcdClient.tx.broadcast(
      signedTx,
    );
    console.log(result.txhash);
  };

  // TODO: Let user know bout gas fees before actually broadcasting the transaction
  const unsubscribeAlert = async (alertKey: string) => {
    const subscribeAlertMsg: MsgExecuteContract = new MsgExecuteContract(
      walletAddress,
      ALERT_CONTRACT_ADDRESS,
      {
        unsubscribe_alert: {
          alert_key: alertKey,
        },
      },
    );
    const signedTx: StdTx = await wallet.createAndSignTx({
      msgs: [subscribeAlertMsg],
    });
    console.log(signedTx);
    const result: BlockTxBroadcastResult = await lcdClient.tx.broadcast(
      signedTx,
    );
    console.log(result.txhash);
  };
  return {
    getAlerts,
    getSubscriptions,
    subscribeAlert,
    unsubscribeAlert,
  };
};

export default Asteroid;
