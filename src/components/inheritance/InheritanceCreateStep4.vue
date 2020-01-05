<template>
  <div>
    <div class="q noselect">
      <div class="q__lbl1 noselect">
        Backup the access data first!
      </div>
      <!-- owner -->
      <div class="q__lblWho noselect">
        for <span class="owner">Owner</span> :
      </div>
      <div class="q__backup noselect">
        <a
          ref="backupOwner"
          class="q__backup__link noselect"
        >
          save
        </a>
        or
        <div
          @click="copyBackupClicked(true)"
          class="q__backup__link noselect"
        >
          copy
        </div>
      </div>
      <br>
      <!-- heir -->
      <div class="q__lblWho noselect">
        for <span class="heir">Heir</span> :
      </div>
      <div class="q__backup noselect">
        <a
          ref="backupHeir"
          class="q__backup__link noselect"
        >
          save
        </a>
        or
        <div
          @click="copyBackupClicked(false)"
          class="q__backup__link noselect"
        >
          copy
        </div>
      </div>
      <div class="q__note1 noselect">
        Keep backup private! Lose it, lose access!<br>
        Give Heir their backup. It doesn't have your key.<br>
      </div>
      <br>
      <Details
        class="detailsEncryption"
        buttonText="Encrypt the backup? (Optional)"
        :showAtStart="false"
      >
        <div class="q__lbl2 noselect">
          An additional secret password can be used to hide (encrypt) the information inside the backup.<br><br>
          Please note that without knowing this secret password the backup is useless and all access and funds are equivalent to lost.<br><br>
          <textarea
            rows="1"
            class="txtKey"
            spellcheck="false"
            @input="updateEncryption"
            :value="cryptoKey"
            placeholder="no password used (blank)"
          />
        </div>
      </Details>
      <Details
        class="detailsPlaintext"
        buttonText="Details"
        :showAtStart="false"
      >
        <pre>{{ backupDataOwner }}</pre>
      </Details>
      <!-- address hidden at first -->
      <ArrowButton
        class="btnShow"
        textContent="My backup is ready. Show the contract!"
        textColor="orange"
        v-if="!showRest"
        @click="showClicked"
      />
      <div
        class="q__contract noselect"
        v-if="showRest"
      >
        <img
          class="q__contract__qr"
          ref="q__contract__qr"
        >
        <div class="q__contract__text">
          <div class="q__contract__lbl2">
            Sending to this address starts timer:
          </div>
          <a
            :href="`bitcoin:${this.address}`"
            target="_blank"
            class="q__contract__addy"
          >
            {{ address }}
          </a>
          <!-- svg from https://iconmonstr.com -->
          <div
            class="btnCopy"
            @click="btnCopyAddressClicked"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                class=""
                d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"
              />
            </svg>
          </div>
          <a
            href="https://bitcoinfaucet.uo1.net/"
            target="_blank"
            class="faucet"
            v-show="showFaucet"
          >
            Testnet-only faucet for free coins
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'; // state
import qrimage from 'qr-image'; // creates qr png
import { inhertianceContract } from './../../bitcoin';
import copyToClipboard from './../../helpers/copyToClipboard';
import ArrowButton from './../general/ArrowButton';
import Details from './../general/Details';
import sanitize from './../../helpers/sanitize';
import sjcl from './../../library/sjcl'; // Stanford Javascript Crypto Library

export default {
  name: 'InheritanceCreateStep4',
  components: {
    ArrowButton,
    Details
  },
  data: () => ({
    address: '',
    showRest: false,
    contract: {},
    showFaucet: false,
    cryptoKey: '',
    backupDataOwner: ''
  }),
  mounted () {
    this.redoPageContent();
  },
  updated () {
    this.redoPageContent();
  },
  computed: {
    ...mapGetters('inheritanceCreate', [
      'getContractValuesIC' // get all contract values
    ])
  },
  methods: {
    redoPageContent () {
      try {
        // calculate contract
        const contract = this.calculateContract();
        // create backup link
        this.updateBackup(contract);
        // update local state
        this.address = contract.address;
        this.contract = contract;
        // updateQR
        this.updateQR(this.address);
      } catch (e) {
        console.error(e);
      }
    },
    calculateContract () {
      const stored = this.getContractValuesIC;
      const contractParams = {
        days: stored.daysDelay,
        ownerPrivateKeyWIF: stored.ownerPrivateKeyWIF,
        heirPrivateKeyWIF: stored.heirPrivateKeyWIF,
        networkChoice: stored.networkChoice,
        addressType: stored.addressType
      };
      const res = inhertianceContract(contractParams);
      return res;
    },
    // downloads contract info as json in .txt
    updateBackup (contract) {
      // assemble owner data to back up (complete)
      const backupObjectOwner = contract;

      // encrypt data
      const backupDataOwner = JSON.stringify(backupObjectOwner, null, 2);
      this.backupDataOwner = backupDataOwner;
      const encryptedDataOwner = sjcl.encrypt(this.cryptoKey, backupDataOwner);

      // creates the right link for downloading the data
      const dataOwner = encodeURIComponent(encryptedDataOwner);
      const a1 = this.$refs.backupOwner;
      a1.href = 'data:text/json;charset=utf-8,' + dataOwner;
      a1.download = 'Inhertiance Owner Backup.txt';

      // assemble owner data to back up (no owner key)
      const backupObjectHeir = { ...backupObjectOwner, ownerPrivateKeyWIF: '' };

      // encrypt data
      const backupDataHeir = JSON.stringify(backupObjectHeir, null, 2);
      const encryptedDataHeir = sjcl.encrypt(this.cryptoKey, backupDataHeir);

      // creates the right link for downloading the data
      const dataHeir = encodeURIComponent(encryptedDataHeir);
      const a2 = this.$refs.backupHeir;
      a2.href = 'data:text/json;charset=utf-8,' + dataHeir;
      a2.download = 'Inhertiance Heir Backup.txt';
    },
    // qr refresh
    updateQR (text) {
      if (this.$refs.q__contract__qr) {
        // generate qr png image buffer
        const qr = qrimage.imageSync(text).toString('base64');
        // add the qr image at source for img element
        this.$refs.q__contract__qr.src = 'data:image/png;base64,' + qr;
      }
    },
    showClicked () {
      this.showRest = true;
      this.showFaucet = (this.getContractValuesIC.networkChoice === 'testnet');
      console.log(this.getContractValuesIC.networkChoice);
    },
    // copies contract address to clipboard
    btnCopyAddressClicked () {
      if (copyToClipboard(this.address)) {
      // notify user
        this.flash('Address copied to clipboard!', 'success', {
          timeout: 3000,
          important: true
        });
      }
    },
    copyBackupClicked (isOwner) {
      const filteredContract = isOwner
        ? this.contract
        : { ...this.contract, ownerPrivateKeyWIF: '' };

      const contractText = sjcl.encrypt(this.cryptoKey,
        JSON.stringify(filteredContract, null, 2)
      );
      if (copyToClipboard(contractText)) {
      // notify user
        this.flash('Contract info copied to clipboard!', 'success', {
          timeout: 3000,
          important: true
        });
      }
    },
    updateEncryption (event) {
      // encryption key changed
      let fixedKey = sanitize(event.target.value, 'oneline');
      event.target.value = fixedKey;
      this.cryptoKey = fixedKey;
    }
  }
};
</script>

<style scoped>
  .q {
    margin: 0vmin 2vmin;
  }
  .q__lbl1 {
    display: block;
    font-size: 3vmin;
    color: white;
    margin-right: 3vmin;
    margin-left: 5%;
    font-weight: bold;
    text-align: left;
    margin-bottom: 3vmin;
  }
  .q__lblWho {
    display: inline-block;
    vertical-align: middle;
    width: 28%;
    font-size: 3vmin;
    color: white;
    text-align: right;
    margin-right: 5%;
    margin-bottom: 3vmin;
    margin-top: 2vmin;
  }
  .q__backup {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    color: white;
    font-size: 3vmin;
    line-height: 5vmin;
    width: 50%;
    left: 30%;
    margin-bottom: 3vmin;
    margin-top: 2vmin;
  }
  .q__backup__link {
    display: inline-block;
    text-decoration: none;
    font-size: 3vmin;
    line-height: 3vmin;
    color: white;
    background-color: orange;
    border: 0.3vmin solid white;
    border-radius: 3vmin;
    padding: 0.5vmin 2vmin;
    cursor: pointer;
  }
  .q__backup__link:hover {
    background-color: rgb(230, 149, 0)
  }
  .q__backup__link:active {
    transform: translateY(0.1vmin);
  }
  .q__note1 {
    display: block;
    font-size: 2vmin;
    color: white;
    margin-top: 1vmin;
    line-height: 3vmin;
  }
  .q__contract {
    text-align: center;
    margin-top: 3vmin;
  }
  .q__contract__text {
    display: inline-block;
    text-align: left;
    vertical-align: top;
    margin-top: 1vmin;
    margin-left: 2vmin;
  }
  .q__contract__lbl2 {
    margin: 0 auto;
    display: block;
    font-size: 3vmin;
    color: white;
    text-align: left;
  }
  .q__contract__addy {
    display: inline-block;
    margin: 0 auto;
    color: white;
    display: inline-block;
    word-break: break-all;
    margin-top: 1vmin;
    margin-bottom: 2vmin;
    text-decoration: none;
    text-align: left;
    margin-left: 3vmin;
    margin-right: 3vmin;
  }
  .q__contract__qr {
    display: inline-block;
    margin: 0 auto;
  }
  .btnShow {
    margin-top: 1vmin;
  }
  .btnCopy {
    display: block;
    border-radius: 3vmin;
    border: white 0.15vmin solid;
    height: 3vmin;
    width: 3vmin;
    padding: 1vmin;
    margin-left: 6vmin;
    text-align: center;
    cursor: pointer;
  }
  .btnCopy svg {
    fill: white;
    height: 3vmin;
    width: 3vmin;
    vertical-align: top;
  }
  .btnCopy:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .btnCopy:active {
    transform: translateY(0.2vmin);
  }
  .owner {
    font-weight: bold;
    color: rgb(44, 44, 218);
    white-space: nowrap;
    text-shadow:
      -0.1vmin -0.1vmin 0.05vmin #FFF,
      0.1vmin -0.1vmin 0.05vmin #FFF,
      -0.1vmin 0.1vmin 0.05vmin #FFF,
      0.1vmin 0.1vmin 0.05vmin #FFF;

  }
  .heir {
    font-weight: bold;
    color: rgb(0, 134, 0);
    white-space: nowrap;
    text-shadow:
      -0.1vmin -0.1vmin 0.05vmin #FFF,
      0.1vmin -0.1vmin 0.05vmin #FFF,
      -0.1vmin 0.1vmin 0.05vmin #FFF,
      0.1vmin 0.1vmin 0.05vmin #FFF;
  }
  .faucet {
    display: inline-block;
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 2vmin;
    padding: 0.3vmin 1vmin;
    font-size: 2vmin;
    color: white;
    margin: 2vmin;
  }
  .faucet:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .detailsEncryption {
    color: white;
    text-align: center;
  }
  .q__lbl2 {
    display: block;
    font-size: 2.5vmin;
    font-weight: normal;
    color: white;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 3vmin;
    border-radius: 1vmin;
  }
  .txtKey {
    font-family: 'Montserrat';
    display: inline-block;
    resize: none;
    font-size: 2.3vmin;
    padding: 0.2vmin 1vmin;
    height: 3.6vmin;
    text-align: center;
    background-color: white;
    color: rgb(230, 149, 0);
    border: 0.1vmin solid white;
    border-right: 0.3vmin solid white;
    border-left: 0.3vmin solid white;
    border-top: 0.5vmin solid white;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    cursor: default;
    vertical-align: middle;
    width: 70%;
    margin-top: 1vmin;
    margin-bottom: 1vmin;
  }
  .detailsPlaintext {
    color: white;
    text-align: center;
    margin-top: 1vmin;
  }
  .detailsPlaintext pre {
    color: white;
    font-size: 2vmin;
    font-family: 'Montserrat';
    margin-top: 0;

    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 1vmin;
    padding: 1vmin;
    text-align: left;

    white-space: pre-wrap;       /* css-3 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;
    word-break: break-all;

    user-select: text;
  }
</style>
