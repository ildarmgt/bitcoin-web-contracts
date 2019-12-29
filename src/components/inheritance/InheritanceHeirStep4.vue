<template>
  <div>
    <div class="q fa">
      <div class="q__strong">
        <div class="q__strong_text">
          Transaction is ready
        </div>
        <RoundButton
          class="btnSend"
          textContent="Send via blockstream.info"
          textColor="white"
          @click="btnBroadcast"
        />
        <RoundButton
          class="btnCopy"
          textContent="Copy it to clipboard"
          textColor="white"
          @click="btnCopy"
        />
        <div
          class="apiResponse"
          v-show="bRes"
        >
          {{ bOk ? 'Success!' : 'Failure: ' + bRes }} <br>
          <a
            class="txid"
            :href="calcPath"
            target="_blank"
            v-show="bOk"
          >
            txid: {{ bRes }}
          </a>
        </div>
        <Details class="details">
          <div class="txHex">
            <div>
              Transaction in hex form - safe to broadcast to the Bitcoin network<br>
              (contains signatures and no private keys):
            </div>
            <div class="hex">
              {{ getContractValues.tx ? getContractValues.tx.toHex() : '' }}
            </div>
            <div>
              decode the transaction hex independently if desired via tools such as:
              https://testnet.smartbit.com.au/txs/decodetx
            </div>
          </div>
        </Details>
        <Details
          class="details"
          buttonText="Where to broadcast copied transaction"
        >
          <div class="pushInfo">
            https://www.smartbit.com.au/txs/pushtx & https://testnet.smartbit.com.au/txs/pushtx *<br>
            https://blockstream.info/tx/push & https://blockstream.info/testnet/tx/push *<br>
            https://testnet.blockexplorer.com/tx/send <br>
            https://live.blockcypher.com/btc/pushtx/<br>
            https://btc.com/tools/tx/publish<br>
            possibly more<br>
            (not all allow p2wsh transactions! supporting marked by *)<br>
          </div>
        </Details>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state
import RoundButton from './../general/RoundButton';
import { blockstreamPush } from './../../api/broadcast'; // api
import Details from './../general/Details';
import copyToClipboard from './../../helpers/copyToClipboard';

export default {
  name: 'InheritanceHeirStep4',
  components: {
    RoundButton,
    Details
  },
  data: () => ({
    bRes: '',
    bOk: false
  }),
  mounted () {},
  computed: {
    ...mapGetters('inheritanceHeir', [
      'getContractValues'
    ]),
    calcPath () {
      const networkChoice = this.getContractValues.networkChoice;
      const networkDependentPart = networkChoice === 'testnet' ? 'testnet/' : '';
      return 'https://blockstream.info/' + networkDependentPart + 'tx/' + this.bRes;
    }
  },
  methods: {
    ...mapActions('inheritanceHeir', [
      'changePage',
      'changeContractValues'
    ]),
    async btnBroadcast () {
      const res = await blockstreamPush(this.getContractValues.tx.toHex());
      if (res.status === 200) {
        this.bRes = res.data;
        this.bOk = true;
      } else {
        this.bRes = res.response.data;
        this.bOk = false;
      }
    },
    btnCopy () {
      const hex = this.getContractValues.tx.toHex();
      if (copyToClipboard(hex)) {
        this.flash('Transaction (hex) copied to clipboard!', 'success', {
          timeout: 3000,
          important: true
        });
      }
    }
  }
};
</script>

<style scoped>
  .q {
    text-align: left;
    margin: 0vmin 2vmin;
  }
  .q__strong {
    display: block;
    text-align: center;
    font-size: 3vmin;
    color: white;
    margin-right: 3vmin;
    margin-left: 5%;
    font-weight: bold;
  }
  .q__strong_text {
    text-align: left;
    margin-bottom: 2vmin;
  }
  .txHex {
    font-size: 2vmin;
    font-weight: normal;
    width: 80%;
    word-wrap: break-word;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 2vmin;
    padding: 2vmin;
    text-align: left;
    user-select: text;
  }
  .txHex div {
    margin-bottom: 1vmin;
  }
  .btnSend {
    display: inline-block;
  }
  .hex {
    color: greenyellow;
  }
  .apiResponse {
    color: rgb(255, 217, 93);
    font-weight: bold;
    font-size: 2.5vmin;
    background-color:rgba(0, 0, 0, 0.1);
    padding: 1vmin;
    text-align: center;
    width: 80%;
    word-wrap: break-word;
    display: inline-block;
    user-select: text;
    margin-top: 2vmin;
  }
  .details {
    margin-top: 2vmin;
    font-size: 2vmin;
    font-weight: normal;
  }
  .txid {
    color: rgb(121, 255, 150);
    text-decoration: none;
    font-size: 2vmin;
    word-wrap: break-word;
    word-break: break-all;
  }
  .txid:hover {
    color: yellow;
  }
  .pushInfo {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 2vmin;
    padding: 2vmin;
    text-align: left;
    user-select: text;
    line-height: 3vmin;
  }
</style>
