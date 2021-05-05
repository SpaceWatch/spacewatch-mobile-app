import { useHistory } from "react-router-native";
import {
  SectionList,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import Routes from "../routes";
import { Blockchains } from "../common/blockchains";

const AlertList = () => {
  const history = useHistory();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View style={styles.container}>
        <SectionList
          sections={[
            {
              title: `${Blockchains.Terra.name} - ${Blockchains.Terra.protocols.Anchor.name}`,
              blockchainLogoPath: Blockchains.Terra.imgUrl,
              protocolLogoPath: Blockchains.Terra.protocols.Anchor.imgUrl,
              data: [ // Change this to _(Alerts).map((alert) => alert.blockchain === Blockchain.blockchainId &&
                      // alert.protocol === Blockchain.Terra.protocols.Anchor.protocolId)
                "ANC Token Staking Rewards Alert",
                "Borrow APR Alert",
                "Borrow LTV Ratio Alert",
                "Borrow Reward Alert",
                "Distribution APR Alert",
                "Earn Interest Alert",
                "LP Staking Rewards Alert",
                "Total ANC Staked Alert",
                "Total ANC-UST LP Staked Alert",
              ],
            },
            {
              title: `${Blockchains.Terra.name} - ${Blockchains.Terra.protocols.Mirror.name}`,
              blockchainLogoPath: Blockchains.Terra.imgUrl,
              protocolLogoPath: Blockchains.Terra.protocols.Mirror.imgUrl,
              data: [
                "Airdrop Alert",
                "Governance Poll Alert",
                "Limit Buy/Sell Execution Alert",
                "mETH-UST LP APR Alert",
                "mGME-UST LP APR Alert",
                "MIR-UST LP APR Alert",
                "Mint Minimum Collateral Ratio Alert",
              ],
            },
          ]}
          renderItem={({ item }) => (
            <Pressable
              style={styles.item}
              onPress={() => history.push(Routes.ALERTS_PAGE)}
            >
              <Text style={{ fontSize: 16 }}>{item}</Text>
            </Pressable>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
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
      <Button
        title="Back To Home"
        onPress={async () => {
          history.push(Routes.BASE);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    width: "100%",
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(247,247,247,0.95)",
  },
  item: {
    padding: 10,
    height: 44,
  },
  logoView: {
    flexDirection: "row",
  },
});

export default AlertList;
