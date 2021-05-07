import { LCDClient, MnemonicKey, RawKey } from "@terra-money/terra.js";
import * as SecureStore from "expo-secure-store";
import { decrypt } from "@terra-money/key-utils";
import sha256 from "crypto-js/sha256";

export const tequilaConfig = {
    URL: 'https://tequila-lcd.terra.dev',
    chainID: 'tequila-0004',
}

export const terra = new LCDClient(tequilaConfig);

const mk = new MnemonicKey({mnemonic: 'balance attitude unveil maximum february sunny fresh learn minute arrange song media squirrel sail judge dance immune core asset sample escape talent donate hood'})
export const wallet = terra.wallet(mk);

//function to convert string to ArrayBuffer
const str2ab = (string: string) => {
    const buf = new ArrayBuffer(string.length*2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i=0, strLen=string.length; i<strLen; i++) {
        bufView[i] = string.charCodeAt(i);
    }
    return buf;
}

export const getWalletFromPassword = async (password: string) => {
    //hash input password
    const hashedPassword = JSON.stringify(sha256(password));

    //fetch pk and password from keychain
    const retrievedEncryptedPK = await SecureStore.getItemAsync("encryptedPK");
    const retrievedHashedPassword = await SecureStore.getItemAsync("hashedPassword");

    if (retrievedHashedPassword === hashedPassword) {
        //convert types to decrypt pk
      const decryptedPK = decrypt(retrievedEncryptedPK, password);
      const abDecryptedPK = str2ab(decryptedPK);
      const bDecryptedPK = Buffer.from(new Uint16Array(abDecryptedPK));

      //create wallet with raw key
      const rk = new RawKey(bDecryptedPK);
      const walletRK = terra.wallet(rk);
      console.log('Logged into wallet, wallet address is ', walletRK.key.accAddress);
    } else {
       throw new Error('Cannot fetch wallet, wrong password input');
    }
}

export const getWalletFromPrivateKey = (privateKey: Buffer) => {
    const rk = new RawKey(privateKey);
    const walletRK = terra.wallet(rk);
    console.log('Accessed wallet, wallet address is ', walletRK.key.accAddress);
}

// export const ghostWallet = terra.wallet(new MnemonicKey());
// console.log(ghostWallet.accountNumber());