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
          textContent="Copy to clipboard"
          textColor="white"
          @click="btnCopy"
        />
        <div
          class="apiResponse"
          v-show="bRes"
        >
          blockstream.info: <b>success!</b><br>
          txid: {{ bRes }}
        </div>
        <!-- overflowed to the right (TODO) -->
        <Details class="details">
          <div class="txHex">
            <div>
              Transaction in hex form - safe to broadcast to the Bitcoin network<br>
              (contains signatures and no private keys):
            </div>
            <span class="hex">{{ getContractValues.tx.toHex() }}</span>
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

export default {
  name: 'InheritanceOwnerStep4',
  components: {
    RoundButton,
    Details
  },
  data: () => ({
    bRes: ''
  }),
  mounted () {},
  computed: {
    ...mapGetters('inheritanceOwner', [
      'getContractValues'
    ])
  },
  methods: {
    ...mapActions('inheritanceOwner', [
      'changePage',
      'changeContractValues'
    ]),
    async btnBroadcast () {
      const txid = await blockstreamPush(this.getContractValues.tx.toHex());
      this.bRes = txid;
    },
    btnCopy () {
      // copy to clipboard text here (TODO)
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
    color: white;
    font-weight: normal;
    font-size: 2.5vmin;
    background-color:rgba(0, 0, 0, 0.1);
    padding: 1vmin;
    text-align: left;
    width: 80%;
    word-wrap: break-word;
    display: inline-block;
    user-select: text;
  }
  .details {
    margin-top: 2vmin;
  }
</style>
