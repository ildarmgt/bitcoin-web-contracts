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
      <!-- address hidden at first -->
      <ArrowButton
        class="btnShow"
        textContent="Backup done. Show contract!"
        textColor="var(--bitcoin-orange, orange)"
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
      <Details
        class="detailsPlaintext"
        buttonText="How does it have an address already?"
        :showAtStart="false"
      >
        <div class="q__lbl2 lbl3">
          Contract addresses for pay-to-script-hash (p2sh, p2wsh) can be derived from the contract script itself, which depends on your (public) keys, timer setting, and network - all of which are known and represented with a short unique representative address. <br><br>
          Spending funds from contract requires you to submit the actual script used which has to match the short address digest for it to work. Once contract receives your transaction outputs, everything necessary to spend those should be included in the backup file above and other pages of this app.
        </div>
      </Details>
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
import sjcl from 'sjcl'; // Stanford Javascript Crypto Library

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
    margin: 0 var(--s2);
  }
  .q__lbl1 {
    display: block;
    font-size: var(--s3);
    color: var(--background, white);
    margin-right: var(--s3);
    margin-left: 5%;
    font-weight: bold;
    text-align: left;
    margin-bottom: var(--s3);
  }
  .q__lblWho {
    display: inline-block;
    vertical-align: middle;
    width: 28%;
    font-size: var(--s2-5);
    color: var(--background, white);
    text-align: right;
    margin-right: 5%;
    margin-bottom: var(--s3);
    margin-top: var(--s2);
  }
  .q__backup {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    color: var(--background, white);
    font-size: var(--s2-5);
    line-height: var(--s5);
    width: 50%;
    left: 30%;
    margin-bottom: var(--s3);
    margin-top: var(--s2);
  }
  .q__backup__link {
    display: inline-block;
    text-decoration: none;
    font-size: var(--s2-5);
    line-height: var(--s2-5);
    color: var(--background, white);
    background-color: var(--bitcoin-orange, orange);
    border: var(--s0-3) solid var(--background, white);
    border-radius: var(--s3);
    padding: var(--s0-5) var(--s2);
    cursor: pointer;
    margin-left: var(--s0-5);
    margin-right: var(--s0-5);
  }
  .q__backup__link:hover {
    background-color: var(--darker2, rgba(0, 0, 0, 0.2));
  }
  .q__backup__link:active {
    transform: translateY(var(--s0-1));
  }
  .q__note1 {
    display: block;
    font-size: var(--s2);
    color: var(--background, white);
    margin-top: var(--s1);
    line-height: var(--s3);
    text-align: left;
    margin-left: 10%;
  }
  .q__contract {
    text-align: center;
    margin-top: var(--s3);
  }
  .q__contract__text {
    display: inline-block;
    text-align: left;
    vertical-align: top;
    margin-top: var(--s1);
    margin-left: var(--s2);
  }
  .q__contract__lbl2 {
    margin: 0 auto;
    display: block;
    font-size: var(--s3);
    color: var(--background, white);
    text-align: left;
  }
  .q__contract__addy {
    display: inline-block;
    margin: 0 auto;
    color: var(--background, white);
    display: inline-block;
    word-break: break-all;
    margin-top: var(--s1);
    margin-bottom: var(--s2);
    text-decoration: none;
    text-align: left;
    margin-left: var(--s2);
    margin-right: var(--s2);
  }
  .q__contract__qr {
    display: inline-block;
    margin: 0 auto;
    margin-top: var(--s1);
    width: calc(20 * var(--s));
    height: auto;
  }
  .btnShow {
    margin-top: var(--s1);
  }
  .btnCopy {
    display: block;
    border-radius: var(--s3);
    border: var(--background, white) calc(0.15 * var(--s)) solid;
    height: var(--s3);
    width: var(--s3);
    padding: var(--s1);
    margin-left: calc(6 * var(--s));
    text-align: center;
    cursor: pointer;
  }
  .btnCopy svg {
    fill: var(--background, white);
    height: var(--s3);
    width: var(--s3);
    vertical-align: top;
  }
  .btnCopy:hover {
    background-color: var(--darker2, rgba(0, 0, 0, 0.2));
  }
  .btnCopy:active {
    transform: translateY(var(--s0-2));
  }
  .owner {
    font-weight: bold;
    color: var(--color-owner, rgba(0, 0, 255, 0.6));
    white-space: nowrap;
    text-shadow:
      calc(-0.1 * var(--s)) calc(-0.1 * var(--s)) calc(0.05 * var(--s)) var(--background, white),
      var(--s0-1)           calc(-0.1 * var(--s)) calc(0.05 * var(--s)) var(--background, white),
      calc(-0.1 * var(--s)) var(--s0-1)           calc(0.05 * var(--s)) var(--background, white),
      var(--s0-1)           var(--s0-1)           calc(0.05 * var(--s)) var(--background, white);

  }
  .heir {
    font-weight: bold;
    color: var(--color-heir, rgb(0, 134, 0));
    white-space: nowrap;
    text-shadow:
      calc(-0.1 * var(--s)) calc(-0.1 * var(--s)) calc(0.05 * var(--s)) var(--background, white),
      var(--s0-1)           calc(-0.1 * var(--s)) calc(0.05 * var(--s)) var(--background, white),
      calc(-0.1 * var(--s)) var(--s0-1)           calc(0.05 * var(--s)) var(--background, white),
      var(--s0-1)           var(--s0-1)           calc(0.05 * var(--s)) var(--background, white);
  }
  .faucet {
    display: inline-block;
    text-decoration: none;
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    border-radius: var(--s2);
    padding: var(--s0-3) var(--s1);
    font-size: var(--s2);
    color: var(--background, white);
    margin: var(--s2);
  }
  .faucet:hover {
    background-color: var(--darker2, rgba(0, 0, 0, 0.2));
  }
  .q__lbl2 {
    display: block;
    font-size: var(--s2-5);
    font-weight: normal;
    color: var(--background, white);
    text-align: center;
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    padding: var(--s3);
    border-radius: var(--s1);
  }
  .lbl3 {
    text-align: left;
    font-size: var(--s2);
  }
  .txtKey {
    display: inline-block;
    color: var(--bitcoin-orange, orange);
    vertical-align: middle;
    width: 70%;
    margin-top: var(--s1);
    margin-bottom: var(--s1);
  }
  .detailsEncryption {
    color: var(--background, white);
    text-align: right;
    margin-top: var(--s1);
  }
  .detailsPlaintext {
    color: var(--background, white);
    text-align: right;
    margin-top: var(--s1);
  }
  .detailsPlaintext pre {
    color: var(--background, white);
    font-size: var(--s2);
    font-family: 'Montserrat';
    margin-top: 0;

    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    border-radius: var(--s1);
    padding: var(--s1);
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
