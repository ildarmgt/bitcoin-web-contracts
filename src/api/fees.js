// https://b10c.me/A-list-of-public-feerate-estimator-APIs/
// for starters just 1, can expand to multiple options later
// will only check for bitcoin

import axios from 'axios';

const API_PATH = 'https://blockstream.info/api/fee-estimates';
// https://github.com/Blockstream/esplora/blob/master/API.md#fee-estimates
// The available confirmation targets are 2, 3, 4, 6, 10, 20, 144, 504 and 1008 blocks.
// estimate fee rate in sat/vByte
// e.g. {"504":1.0,"20":1.0,"10":1.0,"4":3.021,"2":5.371,"6":1.02,"3":5.371,"144":1.0,"1008":1.0}

export default async function fees () {
  try {
    const res = await axios.get(API_PATH);
    console.log('fees data from blockstream.info', res);
    return res.data;
  } catch (e) {
    console.error('fees.js', e);
  }
}
