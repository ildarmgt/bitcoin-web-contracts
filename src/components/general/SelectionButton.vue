<template>
  <div
    @click="onButtonClick"
    class="selectionButton"
    :style="determineStyle"
  >
    {{ buttonText }}
  </div>
</template>

<script>
export default {
  name: 'SelectionButton',
  props: {
    // background color of the button
    color: { type: String, default: '' },

    // text to display on the button
    buttonText: { type: String, default: 'OK' },

    // meaning it has & emits when clicked
    meaning: { type: String, default: 'OK' },

    // meaning necessary for this button to consider itself to be selected
    meaningSelected: { type: String, default: '' }
  },
  computed: {
    // if selected, style it opaque, otherwise style custom color
    determineStyle () {
      if (this.meaning === this.meaningSelected) {
        return {
          'background-color': 'rgba(17, 17, 51, 0.65)',
          transform: 'translateY(0.2vmin)'
        };
      } else {
        return {
          'background-color': this.color
        };
      }
    }
  },
  methods: {
    // on click, if not already selected, emit it selected,
    // otherwise emit no selection
    onButtonClick () {
      if (this.meaning === this.meaningSelected) {
        this.$emit('selectionChoice', '');
      } else {
        this.$emit('selectionChoice', this.meaning);
      }
    }
  }
};
</script>

<style scoped>
  .selectionButton {
    display: inline-block;

    padding: 1vmin 2vmin;
    margin: 1vmin 1vmin;
    font-size: 2.5vmin;
    border-radius: 3vmin;
    background-color: rgba(17, 17, 51, 0.65);
    color: white;

    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    user-select: none;

    cursor: pointer;

    /* transition: transform 0.1s; */
  }
  .selectionButton:hover {
    transform: translateY(-0.1vmin);
  }
  .selectionButton:active {
    transform: translateY(0.1vmin);
  }
</style>
