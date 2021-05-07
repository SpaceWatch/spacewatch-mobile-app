import {
  Alert,
  AlertField,
  AlertFieldKey,
  AlertKey,
} from "../types/models";
import { Blockchains } from "./blockchains";

export const Alerts: Record<string, Alert> = {
  TERRA__ANCHOR__LTV_RATIO: {
    alertKey: AlertKey.TERRA__ANCHOR__LTV_RATIO,
    blockchain: Blockchains.Terra.blockchainId,
    protocol: Blockchains.Terra.protocols.Anchor.protocolId,
    method: "isHighLtv",

    name: "Anchor LTV Alert",
    description: "Send an alert when my Anchor LTV is above x%",

    fields: [
      {
        fieldKey: "walletAddress",
        name: "Wallet Address",
        description: "Wallet Address Description",
        validationRegex: "terra\\S*",
      },
      {
        fieldKey: "ltvRatio",
        name: "LTV Ratio",
        description: "LTV % to notify me at",
        validationRegex: "[0-9][0-9]%",
      },
    ],
  },
};
