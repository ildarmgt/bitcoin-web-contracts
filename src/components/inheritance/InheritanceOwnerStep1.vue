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
        textColor="rgb(102, 102, 255)"
        @click="onNextButtonClick"
        v-if="getPagesInfo[1].usable"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state

import ArrowButton from './../general/ArrowButton';
import RoundButton from './../general/RoundButton';
import InheritanceOwnerStep1Form from './InheritanceOwnerStep1Form';

export default {
  name: 'InheritanceOwnerStep1',
  components: {
    ArrowButton,
    RoundButton,
    InheritanceOwnerStep1Form
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
      this.fileName = file.name;
      this.showUpload = false;
      this.changeFile({ data: result, name: this.fileName });
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
    margin: 0vmin 2vmin;
    color: white;
    font-size: 2.5vmin;
  }
  .q__strong {
    display: block;
    text-align: left;
    font-size: 3vmin;
    color: white;
    margin-right: 3vmin;
    margin-left: 5%;
    font-weight: bold;
    margin-bottom: 3vmin;
  }
  .q__light {
    display: block;
    font-size: 2vmin;
    color: white;
    margin-top: 2vmin;
    line-height: 3vmin;
    margin-left: 15%;
  }
  .dropper {
    display: inline-block;
    width: 50%;
    height: 15vmin;
    border: 0.5vmin dotted rgba(255, 255, 255, 0.534);
    border-radius: 5vmin;

    line-height: 15vmin;
    position: relative;
    color: white;
    margin: 1vmin;
  }
  .dropper:hover {
    background-color: rgba(238, 238, 238, 0.13);
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
    border: 0.5vmin dotted rgba(255, 255, 255, 0.534);
    border-radius: 3vmin;
    line-height: 3vmin;
    display: block;
    padding: 0.3vmin;
    padding-right: 5vmin;
    padding-left: 1.3vmin;
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
    background-color: rgba(238, 238, 238, 0.13);
  }
  .fileInfo:after {
    line-height: 0;
    font-size: 5vmin;
    content: "×";
    color: rgba(255, 255, 255, 0.534);
    height: 0.1vmin;
    width: 0.1vmin;
    border-radius: 3vmin;
    right: 3.5vmin;
    top: 1.8vmin;
    position: absolute;
  }
  .form {
    width: 85%;
    display: block;
    margin: auto;
  }
</style>
