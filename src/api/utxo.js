import axios from 'axios';

const MAIN_PATH = 'https://blockstream.info/api/address/';
const TEST_PATH = 'https://blockstream.info/testnet/api/address/';

export default async function getUTXO (address, networkChoice) {
  try {
    const apiRoot = (networkChoice === 'bitcoin') ? MAIN_PATH : TEST_PATH;
    const apiPath = apiRoot + address + '/utxo';
    const res = await axios.get(apiPath);
    return res.data;
  } catch (e) {
    console.error('Error getting utxo for address from blockstream.info:', e);
    throw new Error('API call failed');
  }
}
