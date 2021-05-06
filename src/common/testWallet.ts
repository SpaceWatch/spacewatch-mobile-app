import {LCDClient, MnemonicKey} from "@terra-money/terra.js";

export const tequilaConfig = {
    URL: 'https://tequila-lcd.terra.dev',
    chainID: 'tequila-0004',
}

export const terra = new LCDClient(tequilaConfig);

const mk = new MnemonicKey({mnemonic: 'balance attitude unveil maximum february sunny fresh learn minute arrange song media squirrel sail judge dance immune core asset sample escape talent donate hood'})
export const wallet = terra.wallet(mk);

// export const ghostWallet = terra.wallet(new MnemonicKey());
// console.log(ghostWallet.accountNumber());