import axios from 'axios';

/**
 * Broadcasts content onto the blockchain
 * parameters: (content, network)
 * @param {string} content - raw hex content of transaction
 * @param {string} network - 'testnet' or 'bitcoin' to match bitcoinjs-lib
 * @returns {string} - Successful broadcast returns txid, otherwise error reason
 */
export async function blockstreamPush (content, network) {
  // https://github.com/Blockstream/esplora/blob/esplora_v2.00/API.md
  // https://github.com/Blockstream/esplora/blob/master/API.md#post-tx

  const API_PATH_TESTNET =
   'https://blockstream.info/testnet/api/broadcast';

  const API_PATH_BITCOIN =
    'https://blockstream.info/api/broadcast';

  const API_PATH =
    (network === 'testnet')
      ? API_PATH_TESTNET
      : API_PATH_BITCOIN;

  try {
    const res = await axios.get(API_PATH, {
      params: {
        tx: content
      }
    });

    // console.log(res);
    console.log('Broadcasted on', network);

    // returns txid on success
    return {
      txid: res.data
    };
  } catch (e) {
    console.log('Failed push', network, e);

    // console.log('error main message:', e.response.data);
    return { error: e.response.data };
  }
}

// export async function blockexplorerPush (content) {
//   // possibly segwit incompatible in 2019?
//   const API_PATH = 'https://testnet.blockexplorer.com/api/tx/send';
//   try {
//     const res = await axios.post(API_PATH, {
//       rawtx: content
//     });
//     // console.log(res);
//     return res.data;
//   } catch (e) {
//     console.error('failed push', e);
//   }
// }

// // no segwit
// export async function blockcypherPush (content) {
//   const API_PATH = 'https://api.blockcypher.com/v1/btc/test3/txs/push';
//   try {
//     const res = await axios.post(API_PATH, JSON.stringify({
//       tx: content
//     }));
//     // console.log(res);
//     return res.data;
//   } catch (e) {
//     console.error('failed push', e);
//   }
// }

// // no segwit
// export async function blockcypherDecode (content) {
//   const API_PATH = 'https://api.blockcypher.com/v1/btc/test3/txs/decode';
//   try {
//     const res = await axios.post(API_PATH, JSON.stringify({
//       tx: content
//     }));
//     // console.log(res);
//     return res.data;
//   } catch (e) {
//     console.error('failed push', e);
//   }
// }
