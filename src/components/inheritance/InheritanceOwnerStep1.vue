<template>
  <div>
    <div class="q fa">
      <!-- main question -->
      <div class="q__strong">
        First, load the backup access info:
      </div>
      <!-- if uploading -->
      <div v-if="showUpload">
        <div class="dropper">
          <input
            type="file"
            id="file"
            enctype="multipart/form-data"
            @change="fileSubmitted($event.target.files[0])"
          >
          submit backup file
        </div>
        <Details
          buttonText="Not an upload. Your browser only."
          class="detailsSubmit"
        >
          <div>
            This app is designed to read your backup directly via only your browser.<br>
            Its contents are not coded to be sent anywhere by the app w/o permission.<br><br>
            The app provides convinience buttons to allow use of API endpoints for fee estimates, scanning confirmed funds by contract's address, and broadcasting the finished transaction.<br>
            Fees and unspent outputs in address can be filled out offline manually.<br>
            Raw transaction can also be copied to be broadcast later somewhere else.<br><br>
            Cautious users could use the app in a clean browser instance, via incognito/private mode with no 3rd party extensions, and even offline.<br>
          </div>
        </Details>
        <div>
          or
          <RoundButton
            textContent="manually fill out"
            textColor="white"
            @click="manuallyClicked"
          />
        </div>
      </div>
      <!-- if manually filling in or not uploading -->
      <div v-else>
        <div
          class="fileInfo"
          @click="{ showUpload = true }"
        >
          {{ fileName ? fileName : 'not a file submission' }}
        </div>
        <InheritanceOwnerStep1Form
          class="form"
          @input="formEdited"
          :showDetails="showDetails"
        />
      </div>
      <!-- next button  -->
      <ArrowButton
        textContent="Next"
        textColor="var(--color-owner-solid, rgb(102, 102, 255))"
        @click="onNextButtonClick"
        v-if="getPagesInfo[1].usable"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state
import Vue from 'vue';
import ArrowButton from './../general/ArrowButton';
import RoundButton from './../general/RoundButton';
import InheritanceOwnerStep1Form from './InheritanceOwnerStep1Form';
import InputPrompt from './../general/InputPrompt';
import Details from './../general/Details';

import sjcl from './../../library/sjcl'; // Stanford Javascript Crypto Library

export default {
  name: 'InheritanceOwnerStep1',
  components: {
    ArrowButton,
    RoundButton,
    InheritanceOwnerStep1Form,
    Details
  },
  data: () => ({
    showUpload: true,
    showDetails: false,
    fileName: ''
  }),
  computed: {
    ...mapGetters('inheritanceOwner', [
      'getFile',
      'getContractValues',
      'getPagesInfo'
    ])
  },
  mounted () {
    // if filename used, show it again as loaded
    const file = this.getFile;
    if (file) {
      this.fileName = file.name;
      this.showUpload = false;
    }
    // if contract data exists, show form filled out from start
    const { address, ownerPrivateKeyWIF, scriptHex } = this.getContractValues;
    if (address && ownerPrivateKeyWIF && scriptHex) {
      this.showUpload = false;
    }
    // otherwise it will show upload dialogue as default
  },
  methods: {
    ...mapActions('inheritanceOwner', [
      'changePage',
      'changeFile'
    ]),
    // next button event
    onNextButtonClick () {
      // now change page to step 2
      this.changePage(2);
    },
    // writes submitted file to vuex
    async fileSubmitted (file) {
      // waits until read
      const result = await new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsText(file);
      });
      let decryptedResult;
      // try blank encryption, otherwise ask for info
      try {
        decryptedResult = sjcl.decrypt('', result);
        this.fileName = file.name;
        this.showUpload = false;
        this.changeFile({ data: decryptedResult, name: this.fileName });
        console.log('Blank encryption key (default) worked');
      } catch (e) {
        console.log('Blank encryption key (default) did not work');
        // prompt user for pin
        // https://stackoverflow.com/questions/50306236/render-a-vue-app-using-a-promise-and-await-user-input
        const askForPin = () => {
          return new Promise(resolve => {
            const InputUIVue = Vue.extend(InputPrompt);
            const inputUI = new InputUIVue();
            inputUI.$once('submit', value => {
              inputUI.$destroy();
              inputUI.$el.remove();
              resolve(value);
            });
            inputUI.$mount();
            document.body.appendChild(inputUI.$el);
          });
        };
        const resultOfTheAwait = await askForPin();
        try {
          decryptedResult = sjcl.decrypt(resultOfTheAwait, result);
          this.fileName = file.name;
          this.showUpload = false;
          this.changeFile({ data: decryptedResult, name: this.fileName });
          console.log('User provided a working pin to decrypt backup');
        } catch (e) {
          console.log('Error decrypting file');
          this.fileName = 'Error reading file. Wrong pin?';
          this.showUpload = false;
        }
      }
    },
    manuallyClicked () {
      this.showUpload = false;
      this.showDetails = true;
    },
    // if form emits that it has been edited
    formEdited () {
      this.fileName = '';
      this.changeFile(undefined);
    }
  }
};
</script>

<style scoped>
  .q {
    text-align: center;
    margin: 0 var(--s2);
    color: var(--background, white);
    font-size: var(--s2-5);
  }
  .q__strong {
    display: block;
    text-align: left;
    font-size: var(--s3);
    color: var(--background, white);
    margin-right: var(--s3);
    margin-left: 5%;
    font-weight: bold;
    margin-bottom: var(--s3);
  }
  .q__light {
    display: block;
    font-size: var(--s2);
    color: var(--background, white);
    margin-top: var(--s2);
    line-height: var(--s3);
    margin-left: 15%;
  }
  .dropper {
    display: inline-block;
    width: 50%;
    height: calc(15 * var(--s));
    border: var(--s0-5) dotted var(--text-lighterondark, rgba(255, 225, 225, 0.6));
    border-radius: var(--s5);

    line-height: calc(15 * var(--s));
    position: relative;
    color: var(--background, white);
    margin: var(--s1);
  }
  .dropper:hover {
    background-color: var(--brighter1, rgba(255, 255, 255, 0.1));
  }
  #file {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
  .fileInfo {
    border: var(--s0-5) dotted var(--text-lighterondark, rgba(255, 225, 225, 0.6));
    border-radius: var(--s3);
    line-height: var(--s3);
    display: block;
    padding: var(--s0-3);
    padding-right: var(--s5);
    padding-left: calc(1.3 * var(--s));
    position: relative;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 50%;
    cursor: pointer;
    opacity: 0.65;
    margin: auto;
  }
  .fileInfo:hover {
    background-color: var(--brighter1, rgba(255, 255, 255, 0.1));
  }
  .fileInfo:after {
    line-height: 0;
    font-size: var(--s5);
    content: "×";
    color: var(--text-lighterondark, rgba(255, 225, 225, 0.6));
    height: var(--s0-1);
    width: var(--s0-1);
    border-radius: var(--s3);
    right: calc(3.5 * var(--s));
    top: calc(1.8 * var(--s));
    position: absolute;
  }
  .form {
    width: 85%;
    display: block;
    margin: auto;
  }
  .detailsSubmit {
    text-align: right;
    margin: var(--s2);
  }
  .detailsSubmit div {
    font-size: var(--s2);
    font-weight: normal;
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
    border-radius: var(--s1);
    padding: var(--s2) var(--s3);
    margin: var(--s2);
    margin-top: 0;
    text-align: left;
    display: inline-block;
    opacity: 0.7;
  }
</style>
