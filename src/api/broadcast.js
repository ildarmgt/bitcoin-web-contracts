import axios from 'axios';

export async function blockstreamPush (content) {
  // https://github.com/Blockstream/esplora/blob/esplora_v2.00/API.md
  // https://github.com/Blockstream/esplora/blob/master/API.md#post-tx
  const API_PATH = 'https://blockstream.info/testnet/api/broadcast';
  try {
    const res = await axios.get(API_PATH, {
      params: {
        tx: content
      }
    });
    // console.log(res);
    return res; // txid on success
  } catch (e) {
    console.log('failed push', e);
    // console.log(e.response.data);
    return e;
  }
}

export async function blockexplorerPush (content) {
  // possibly segwit incompatible in 2019?
  const API_PATH = 'https://testnet.blockexplorer.com/api/tx/send';
  try {
    const res = await axios.post(API_PATH, {
      rawtx: content
    });
    // console.log(res);
    return res.data;
  } catch (e) {
    console.error('failed push', e);
  }
}

// no segwit
export async function blockcypherPush (content) {
  const API_PATH = 'https://api.blockcypher.com/v1/btc/test3/txs/push';
  try {
    const res = await axios.post(API_PATH, JSON.stringify({
      tx: content
    }));
    // console.log(res);
    return res.data;
  } catch (e) {
    console.error('failed push', e);
  }
}

// no segwit
export async function blockcypherDecode (content) {
  const API_PATH = 'https://api.blockcypher.com/v1/btc/test3/txs/decode';
  try {
    const res = await axios.post(API_PATH, JSON.stringify({
      tx: content
    }));
    // console.log(res);
    return res.data;
  } catch (e) {
    console.error('failed push', e);
  }
}
