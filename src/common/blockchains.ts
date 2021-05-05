import { Blockchain } from "../types/models";

export const Blockchains: Record<string, Blockchain> = {
  Terra: {
    blockchainId: "Terra",
    name: "Terra",
    imgUrl: require("../../assets/logos/Terra-Logo_50x50.jpeg"),
    protocols: {
      Anchor: {
        protocolId: "Anchor",
        name: "Anchor",
        imgUrl: require("../../assets/logos/ANC-Logo_50x50.png"),
      },
      Mirror: {
        protocolId: "Mirror",
        name: "Mirror",
        imgUrl: require("../../assets/logos/Mirror-Logo_50x50.png"),
      },
    },
  },
};
