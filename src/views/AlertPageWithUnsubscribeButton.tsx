import { useHistory, useParams } from 'react-router-native';
import { Button, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Alerts } from '../common/alerts';
import Routes from '../routes';
import React from 'react';
import {
  Colors,
  FontSize,
  FontWeight,
  Position,
  Spacing,
} from '../common/styles/styles';

const AlertPageWithUnSubscribe = () => {
  const history = useHistory();
  const { alertKey } = useParams();

  return (
    <>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 12,
          top: 12,
            zIndex: 2,
            width: 100,
            height: 36,
        }}
        onPress={() => history.push(Routes.LIST_ALL_ALERTS)}>
        <Text style={{ fontSize: FontSize.SM }}>{'< Back'}</Text>
      </TouchableOpacity>
      <View style={{ position: Position.RELATIVE }}>
        <Text style={{ fontSize: FontSize.MD, textAlign: 'center' }}>
          {Alerts.TERRA__ANCHOR__LTV_RATIO.name}
        </Text>
        <Text style={{ fontSize: FontSize.XS, textAlign: 'center' }}>
          Subscribed
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          paddingTop: Spacing.SM,
        }}>
        <View
          style={{ width: '90%', marginLeft: '5%', paddingTop: Spacing.MD }}>
          {/*<Text style={{ fontSize: FontSize.MD, fontWeight: FontWeight.SEMI_BOLD, color: Colors.GRAY_700 }}>*/}
          {/*  {Alerts.TERRA__ANCHOR__LTV_RATIO.name}*/}
          {/*</Text>*/}
          <Text
            style={{
              fontSize: FontSize.MD,
              fontWeight: FontWeight.THIN,
              color: Colors.GRAY_700,
              paddingTop: Spacing.SM,
            }}>
            Protocol: {Alerts.TERRA__ANCHOR__LTV_RATIO.blockchain}-
            {Alerts.TERRA__ANCHOR__LTV_RATIO.protocol}
          </Text>
          <Text
            style={{
              fontSize: FontSize.SM,
              fontWeight: FontWeight.LIGHT,
              color: Colors.GRAY_700,
              paddingTop: Spacing.SM,
            }}>
            {Alerts.TERRA__ANCHOR__LTV_RATIO.description}
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={{              paddingBottom: Spacing.LG,
      }}
        onPress={() => history.push(`${Routes.ALERTS_PAGE}/${alertKey}`)}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: FontSize.MD,
            textAlign: 'center',
            color: 'red',
          }}>
          Unsubscribe
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default AlertPageWithUnSubscribe;
