import { useHistory } from 'react-router-native';
import {
    SectionList,
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Alerts } from '../common/alerts';
import React from 'react';
import Routes from '../routes';
import { Blockchains } from '../common/blockchains';
import { FontSize, Position, Spacing } from '../common/styles/styles';
import { Alert, Blockchain } from '../types/models';
import _ from 'lodash';


const SubscriptionList = () => {
    const history = useHistory();

    return (
        <>
            <View style={{ position: Position.STICKY }}>
                <Text style={{ fontSize: FontSize.MD, textAlign: 'center' }}>
                    Your Alert Subscriptions
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}>
                <View style={styles.container}>
                    <SectionList
                        sections={[
                            {
                                title: `${Blockchains.Terra.name} - ${Blockchains.Terra.protocols.Anchor.name}`,
                                blockchainLogoPath: Blockchains.Terra.imgUrl,
                                protocolLogoPath: Blockchains.Terra.protocols.Anchor.imgUrl,
                                data: _(Alerts)
                                    .values()
                                    .filter(
                                        (alert: Alert) =>
                                            alert.blockchain === Blockchains.Terra.blockchainId &&
                                            alert.protocol ===
                                            Blockchains.Terra.protocols.Anchor.protocolId,
                                    )
                                    .map((categorizedAlert: Alert) => categorizedAlert.name)
                                    .value(),
                            },
                            // {
                            //   title: `${Blockchains.Terra.name} - ${Blockchains.Terra.protocols.Mirror.name}`,
                            //   blockchainLogoPath: Blockchains.Terra.imgUrl,
                            //   protocolLogoPath: Blockchains.Terra.protocols.Mirror.imgUrl,
                            //   data: [
                            //     'Airdrop Alert',
                            //     'Governance Poll Alert',
                            //     'Limit Buy/Sell Execution Alert',
                            //     'mETH-UST LP APR Alert',
                            //     'mGME-UST LP APR Alert',
                            //     'MIR-UST LP APR Alert',
                            //     'Mint Minimum Collateral Ratio Alert',
                            //   ],
                            // },
                        ]}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => history.push(Routes.ALERTS_PAGE)}>
                                <Text style={{ fontSize: 16 }}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        renderSectionHeader={({ section }) => (
                            <View style={styles.sectionHeader}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}>
                                    {section.title}
                                </Text>
                                <View style={styles.logoView}>
                                    <Image source={section.blockchainLogoPath} alt="" />
                                    <Image source={section.protocolLogoPath} alt="" />
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>

            <Button
                title="Back To Home"
                onPress={async () => {
                    history.push(Routes.BASE);
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        width: '100%',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(247,247,247,0.95)',
    },
    item: {
        padding: 10,
        height: 44,
    },
    logoView: {
        flexDirection: 'row',
    },
});


export default SubscriptionList;
