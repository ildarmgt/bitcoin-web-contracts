<template>
  <div>
    <div class="q">
      <div class="q__lbl1">
        Contract information calculated:
      </div>
      <div class="q__backup">
        <a
          ref="backup"
          class="q__backup__link noselect"
        >
          click for backup
        </a>
        <div class="q__backup__note1">
          Keep content private. Lose it, lose access.<br>
          Do not use without saving this text file!
        </div>
      </div>
      <div
        class="q__btnShow noselect"
        v-if="!showRest"
        @click="showClicked"
      >
        Show address
      </div>
      <div
        class="q__contract"
        v-if="showRest"
      >
        <img
          class="q__contract__qr"
          ref="q__contract__qr"
        >
        <div class="q__contract__text">
          <div class="q__contract__lbl2">
            Contract's address to fund:
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
            @click="btnCopyClicked"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state
import qrimage from 'qr-image'; // creates qr png
import { inhertianceContract } from './../../bitcoin';

export default {
  name: 'InheritanceCreateStep4',
  data: () => ({
    address: '',
    showRest: false
  }),
  mounted () {
    this.redoPageContent();
  },
  updated () {
    this.redoPageContent();
  },
  computed: {
    ...mapGetters([
      'getContractValuesIC' // get all contract values
    ])
  },
  methods: {
    ...mapActions([]),
    redoPageContent () {
      try {
        // calculate contract
        const contract = this.calculateContract();
        // create backup link
        this.updateBackup(contract);
        // update local state
        this.address = contract.contractAddress;
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
        ownerWIF: stored.ownerKey,
        heirWIF: stored.heirKey,
        networkChoice: stored.networkChoice,
        addressType: stored.addressType
      };
      const res = inhertianceContract(contractParams);
      return res;
    },
    updateBackup (contract) {
      // assemble all the data to back up
      const backupObject = contract;

      // back it up
      const data = 'text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(backupObject, null, 2));
      const a = this.$refs.backup;
      a.href = 'data:' + data;
      a.download = 'backup_inheritance.txt';
    },
    updateQR (text) {
      // generate qr png image buffer
      const qr = qrimage.imageSync(text).toString('base64');
      // add the qr image at source for img element
      this.$refs.q__contract__qr.src = 'data:image/png;base64,' + qr;
    },
    showClicked () {
      this.showRest = true;
    },
    btnCopyClicked () {
      // copy to clipboard
      (function (text) {
        var input = document.createElement('input');
        input.setAttribute('value', text);
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        return result;
      })(this.address);
      // notify user
      this.flash('Copied!', 'success', { timeout: 3000, important: true });
    }
  }
};
</script>

<style scoped>
  .q {
    /* text-align: left; */
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
  }
  .q__backup {
    margin-top: 6vmin;
    margin-bottom: 6vmin;
    text-align: center;
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
    transform: translateY(-0.1vmin);
  }
  .q__backup__link:active {
    transform: translateY(0.1vmin);
  }
  .q__backup__note1 {
    display: block;
    font-size: 2vmin;
    color: white;
    margin-top: 1vmin;
    line-height: 3vmin;
  }
  .q__contract {
    text-align: center;
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
  .q__btnShow {
    display: inline-block;
    position: relative;
    padding: 0.2vmin 2vmin;
    padding-left: 5vmin;
    margin-bottom: 1vmin;
    color: white;
    background-color: orange;
    border: 0.3vmin solid white;
    border-radius: 3vmin;
    cursor: pointer;
  }
  .q__btnShow:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left: 1.5vmin;
    top: 0.8vmin;
    border-top: 2vmin solid white;
    border-left: 1.2vmin solid transparent;
    border-right: 1.2vmin solid transparent;
  }
  .q__btnShow:hover {
    transform: translateY(-0.1vmin);
  }
  .q__btnShow:active {
    transform: translateY(0.1vmin);
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
  }
  .btnCopy svg {
    fill: white;
    height: 3vmin;
    width: 3vmin;
    vertical-align: top;
  }
  .btnCopy:hover {
    transform: translateY(-0.1vmin);
  }
  .btnCopy:active {
    transform: translateY(0.2vmin);
  }

</style>
