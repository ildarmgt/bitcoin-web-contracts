<template>
  <div>
    <div class="q fa">
      <!-- main question -->
      <div class="q__strong">
        Where to send the funds to?
      </div>
      <div
        class="arrowButton"
        @click="onNextButtonClick"
      >
        Next
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state

export default {
  name: 'InheritanceOwnerStep2',
  data: () => ({}),
  mounted () {},
  computed: {
    ...mapGetters('inheritanceOwner', [])
  },
  methods: {
    ...mapActions('inheritanceOwner', [
      'changePage'
    ]),
    // next button event
    onNextButtonClick () {
      // now change page to step 3
      this.changePage(3);
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
    font-size: 3vmin;
    color: white;
    margin-right: 3vmin;
    margin-left: 5%;
    font-weight: bold;
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
  input:focus{
    outline: none;
  }
  .arrowButton {
      font-size: 3vmin;
      margin: 0 auto;
      margin-top: 5vmin;
      width: max-content;
      height: 5vmin;
      line-height: 5vmin;
      text-align: center;
      padding: 0 3vmin 0 2vmin;
      color: rgb(102, 102, 255);
      background-color: rgb(255, 255, 255);
      opacity: 0.75;
      position: relative;
      display: block;
      border-radius: 1vmin 2vmin 2vmin 1vmin;
      z-index: 1;
      -webkit-user-select: none;
      -moz-user-select: -moz-none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      transition: opacity 0.15s;
  }
  .arrowButton:after{
      position: absolute;
      right: -1.37vmin;
      top: 0;
      content: "";
      width: 5vmin;
      height: 5vmin;
      background-color: inherit;
      border-radius: 2vmin 1.3vmin 1vmin 1.3vmin;
      transform: rotate(-45deg) scale(0.707);
      z-index: 0;
  }
  .arrowButton:hover {
    opacity: 1;
  }
  .arrowButton:active {
    transform: translateY(0.2vmin);
  }
</style>
