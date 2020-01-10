<template>
  <div>
    <div class="q fa">
      <div class="q__strong">
        <div class="q__strong_text">
          Your transaction is going to
        </div>
        <div class="q__strong_info">
          send
          {{ this.getContractValues.toAmount }}
          {{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }}
          <br>
          to {{ this.getContractValues.toAddress }}
          <br><br>
          and pay a fee of
          {{ this.getContractValues.feeAmount }}
          {{ getContractValues.networkChoice === 'testnet' ? 'tBTC' : 'BTC' }}
        </div>
        <RoundButton
          class="btnSend"
          textContent="Send via blockstream.info"
          textColor="var(--background, white)"
          @click="btnBroadcast"
        />
        <RoundButton
          class="btnCopy"
          textContent="Copy it to clipboard"
          textColor="var(--background, white)"
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
    margin: 0 var(--s2);
  }
  .q__strong {
    display: block;
    text-align: center;
    font-size: var(--s3);
    color: var(--background, white);
    margin-right: var(--s3);
    margin-left: 5%;
    font-weight: bold;
  }
  .q__strong_text {
    text-align: left;
    margin-bottom: var(--s2);
  }
  .q__strong_info {
    font-size: var(--s2-5);
    font-weight: normal;
    text-align: right;
    margin: var(--s3);
    word-wrap: break-word;
    word-break: break-all;
  }
  .txHex {
    font-size: var(--s2);
    font-weight: normal;
    width: 80%;
    word-wrap: break-word;
    display: inline-block;
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    border-radius: var(--s2);
    padding: var(--s2);
    text-align: left;
    user-select: text;
  }
  .txHex div {
    margin-bottom: var(--s1);
  }
  .btnSend {
    display: inline-block;
  }
  .hex {
    color: var(--color-info, rgb(173, 255, 47));
  }
  .apiResponse {
    color: var(--bitcoin-orange, orange);
    font-weight: bold;
    font-size: var(--s2-5);
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    padding: var(--s1);
    text-align: center;
    width: 80%;
    word-wrap: break-word;
    display: inline-block;
    user-select: text;
    margin-top: var(--s2);
  }
  .details {
    margin-top: var(--s2);
    font-size: var(--s2);
    font-weight: normal;
  }
  .txid {
    color: var(--color-info, rgb(173, 255, 47));
    text-decoration: none;
    font-size: var(--s2);
    word-wrap: break-word;
    word-break: break-all;
  }
  .txid:hover {
    opacity: 0.9;
  }
  .pushInfo {
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    border-radius: var(--s2);
    padding: var(--s2);
    text-align: left;
    user-select: text;
    line-height: var(--s3);
  }
</style>
