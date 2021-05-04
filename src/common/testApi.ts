import {Coin, MsgSend} from "@terra-money/terra.js";
import {terra, wallet} from "./testWallet";

require('node-libs-react-native/globals');



// prints exchange rate
const offerCoin = new Coin('uusd', '1000000');
export const printExchangeRate = async () => {
    try {
        const swapRate = await terra.market.swapRate(offerCoin, 'usgd');
        return `${offerCoin.toString()} can be swapped for ${swapRate.toString()}`;
    } catch(e) {
        throw e;
    }
};


// transfers 10 luna to lai wei's wallet
const amount = 10000000;
const receivingAddress = 'terra19nxz35c8f7t3ghdxrxherym20tux8eccar0c3k'
const sendLunaTx = new MsgSend('terra1mzu08xf3gm04lnsh90aklr2xfqhqsn2n3ty6wf',
    receivingAddress, {uluna: amount});

export const sendLuna = async () => {
    try {
        const signedTx = await wallet.createAndSignTx({
            msgs: [sendLunaTx],
            memo: ''
        });
        await terra.tx.broadcast(signedTx);
        return `Transferred ${amount/1000000} luna to ${receivingAddress}`;
    } catch(error) {
        return `Error: Unable to send luna to ${receivingAddress}`
    }
}
