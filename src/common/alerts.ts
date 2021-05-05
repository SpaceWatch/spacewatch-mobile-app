import {
  AlertConfig,
  AlertField,
  AlertFieldKey,
  AlertKey,
} from "../types/models";
import { Blockchains } from "./blockchains";

export const Alerts: Record<string, AlertConfig> = {
  TERRA__ANCHOR__LTV_RATIO: {
    key: AlertKey.TERRA__ANCHOR__LTV_RATIO,
    blockchain: Blockchains.Terra.blockchainId,
    protocol: Blockchains.Terra.protocols.Anchor.protocolId,
    method: "isHighLtv",

    name: "Anchor LTV is too high",
    description: "Send an alert when my Anchor LTV is above x%",

    fields: [
      {
        key: "walletAddress",
        name: "Wallet Address",
        description: "Wallet Address",
        validationRegex: "terra\\S*",
      },
      {
        key: "ltvRatio",
        name: "LTV Ratio",
        description: "Notify me when my LTV ratio reaches a certain percantage",
        validationRegex: "[0-9][0-9]%",
      },
    ],
  },
};
