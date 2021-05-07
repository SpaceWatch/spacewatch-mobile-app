import { useHistory, useParams } from 'react-router-native';
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Colors,
  FontSize,
  FontWeight,
  Position,
  Spacing,
} from '../common/styles/styles';
import { Alerts } from '../common/alerts';
import React, { useState } from 'react';
import {
    AlertField,
    SubscriptionFieldValue,
    Subscription, AlertKey,
} from '../types/models';
import Asteroid from '../common/Asteroid';
import { LCDClient, MnemonicKey, Wallet } from '@terra-money/terra.js';
import Routes from '../routes';
import {registerBackgroundTask} from "../common/backgroundTasks";
import {scheduleNotification} from "../common/pushNotifications";

const AlertSubscribePage = () => {
  const history = useHistory();
  const { alertKey } = useParams();
  const alertFields = Alerts.TERRA__ANCHOR__LTV_RATIO.fields;
  const [alertFieldValues, setAlertFieldValues] = useState<
    SubscriptionFieldValue[]
  >(
    alertFields.map((alertField: AlertField) => ({ ...alertField, value: '' })),
  );

  // TODO: Replace this placeholder wallet with actual wallet address from KEY CHAIN?
  const asteroid = Asteroid(
    new LCDClient({
      URL: 'https://tequila-lcd.terra.dev',
      chainID: 'tequila-0004',
    }).wallet(new MnemonicKey()),
  );

  return (
    <>
      <View style={{ position: Position.RELATIVE }}>
        <Text style={{ fontSize: FontSize.MD, textAlign: 'center' }}>
          {Alerts.TERRA__ANCHOR__LTV_RATIO.name}
        </Text>
      </View>
        <TouchableOpacity
            style={{
                position: 'absolute',
                left: 12,
                top: 12,
                zIndex: 2,
                width: 100,
                height: 36,
            }}
            onPress={() => history.goBack()}>
            <Text style={{ fontSize: FontSize.SM }}>{'< Back'}</Text>
        </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          paddingTop: Spacing.SM,
        }}>
        <View
          style={{ width: '90%', marginLeft: '5%', paddingTop: Spacing.MD }}>
          {alertFields.map((field: AlertField) => {
            return (
              <View key={field.fieldKey} style={{ marginTop: Spacing.LG }}>
                <Text
                  style={{
                    fontSize: FontSize.LG,
                    fontWeight: FontWeight.SEMI_BOLD,
                    color: Colors.GRAY_700,
                  }}>
                  {field.name}
                </Text>
                <TextInput
                  style={{
                    fontSize: FontSize.MD,
                    fontWeight: FontWeight.THIN,
                    color: Colors.GRAY_700,
                    paddingTop: Spacing.XS,
                  }}
                  placeholder={field.description}
                  placeholderTextColor={Colors.GRAY_500}
                  multiline={true}
                  autoCapitalize={'none'}
                  textAlignVertical={'top'}
                  value={alertFieldValues.find(
                    (fieldInput: SubscriptionFieldValue) =>
                      fieldInput.value ?? '',
                  )}
                  onChangeText={(newText: string) => {
                    setAlertFieldValues(
                      alertFieldValues.map(
                        (fieldValue: SubscriptionFieldValue) => {
                          if (fieldValue.fieldKey === field.fieldKey) {
                            return {
                              ...fieldValue,
                              value: newText,
                            };
                          } else {
                            return fieldValue;
                          }
                        },
                      ),
                    );
                  }}></TextInput>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{paddingBottom: Spacing.LG}}
        onPress={async () => {
          // const a = async () => await asteroid.subscribeAlert(Alerts.TERRA__ANCHOR__LTV_RATIO.alertKey, alertFieldValues);

          const subscription: Subscription = {
            alertKey: Alerts.TERRA__ANCHOR__LTV_RATIO.alertKey,
            blockchain: Alerts.TERRA__ANCHOR__LTV_RATIO.blockchain,
            protocol: Alerts.TERRA__ANCHOR__LTV_RATIO.protocol,
            method: Alerts.TERRA__ANCHOR__LTV_RATIO.method,
            name: Alerts.TERRA__ANCHOR__LTV_RATIO.name,
            description: Alerts.TERRA__ANCHOR__LTV_RATIO.description,
            fields: alertFieldValues,
          };
          console.log(subscription);
            // const subscription: Subscription = {
            //     alertKey: AlertKey.TERRA__ANCHOR__LTV_RATIO,
            //     blockchain: "Terra",
            //     description: "Send an alert when my Anchor LTV is above x%",
            //     fields: [
            //         {
            //             description: "Address of your Terra wallet starting with 'terra'",
            //             fieldKey: "walletAddress",
            //             name: "Wallet Address",
            //             validationRegex: "terra\\S*",
            //             value: "terra1mzu08xf3gm04lnsh90aklr2xfqhqsn2n3ty6wf",
            //         },
            //         {
            //             description: "LTV % to notify me at",
            //             fieldKey: "ltvRatio",
            //             name: "LTV Ratio",
            //             validationRegex: "[0-9][0-9]%",
            //             value: "45",
            //         },
            //     ],
            //     method: "isHighLtv",
            //     name: "Anchor LTV Alert",
            //     protocol: "Anchor",
            // }
            console.log('test')
            await scheduleNotification(subscription.name, `Your Anchor LTV ratio has hit ${subscription.fields[1].value}%`);
          history.push(Routes.ALERTS_PAGE_WITH_UNSUBSCRIBE);
          return true;
        }}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: FontSize.MD,
            textAlign: 'center',
            color: Colors.EMERALD_500,
          }}>
          Confirm
        </Text>
      </TouchableOpacity>
      {/*<Button*/}
      {/*  title="Confirm"*/}
      {/*  onPress={async () => {*/}

      {/*      // const a = async () => await asteroid.subscribeAlert(Alerts.TERRA__ANCHOR__LTV_RATIO.alertKey, alertFieldValues);*/}

      {/*      const subscription: Subscription = {*/}
      {/*          alertKey: Alerts.TERRA__ANCHOR__LTV_RATIO.alertKey,*/}
      {/*          blockchain: Alerts.TERRA__ANCHOR__LTV_RATIO.blockchain,*/}
      {/*          protocol: Alerts.TERRA__ANCHOR__LTV_RATIO.protocol,*/}
      {/*          method: Alerts.TERRA__ANCHOR__LTV_RATIO.method,*/}
      {/*          name: Alerts.TERRA__ANCHOR__LTV_RATIO.name,*/}
      {/*          description: Alerts.TERRA__ANCHOR__LTV_RATIO.description,*/}
      {/*          fields: alertFieldValues,*/}
      {/*      };*/}
      {/*      console.log(subscription);*/}
      {/*      history.push(Routes.ALERTS_PAGE_WITH_UNSUBSCRIBE);*/}
      {/*      return true;*/}
      {/*  }}*/}
      {/*/>*/}
    </>
  );
};

export default AlertSubscribePage;
