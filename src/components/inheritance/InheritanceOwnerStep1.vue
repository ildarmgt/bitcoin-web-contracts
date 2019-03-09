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
        <InheritanceOwnerForm
          class="form"
          @input="formEdited"
        />
      </div>
      <!-- next button  -->
      <ArrowButton
        textContent="Next"
        textColor="rgb(102, 102, 255)"
        @click="onNextButtonClick"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state

import ArrowButton from './../general/ArrowButton';
import RoundButton from './../general/RoundButton';
import InheritanceOwnerForm from './InheritanceOwnerForm';

export default {
  name: 'InheritanceOwnerStep1',
  components: {
    ArrowButton,
    RoundButton,
    InheritanceOwnerForm
  },
  data: () => ({
    showUpload: true,
    fileName: ''
  }),
  mounted () {
    // (TODO) put in check if contract values are already filled out to determine what to display
  },
  computed: {
    ...mapGetters('inheritanceOwner', [])
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
      this.changeFile(result);
    },
    manuallyClicked () {
      this.showUpload = false;
    },
    formEdited () {
      this.fileName = '';
      this.changeFile('');
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
  .q__time {
    display: block;
    margin-top: 4vmin;
    margin-bottom: 3vmin;
    text-align: left;
    margin-left: 10%;
  }
  .q__time__input {
    font-size: 3vmin;
    height: 4vmin;
    width: 10vmin;
    text-align: center;
    border: none;
    background-color: white;
    color: orange;
    display: inline-block;
    transition: background-color 0.15s;
  }
  .q__time__input:focus,.q__time__input:hover {
    background: white;
  }
  .q__time__label {
    font-size: 3vmin;
    color: white;
    margin-left: 1vmin;
    display: inline-block;
    font-weight: bold;
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
    display: inline-block;
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
    display: inline-block;
  }
</style>
