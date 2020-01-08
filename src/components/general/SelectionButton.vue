<template>
  <div
    @click="onButtonClick"
    class="selectionButton"
    :style="determineStyle"
  >
    <div class="darken">
      {{ buttonText }}
    </div>
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
          'background-color': 'var(--bitcoin-blue, rgb(17, 17, 51))'
          // 'background-color': 'rgba(17, 17, 51, 0.65)'
          // transform: 'translateY(0.2vmin)'
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
      // scroll to the top to avoid bouncing effect from resizing animation
      window.scrollTo(0, 0);
      // let parent know of choice
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
    margin: 1vmin 1vmin;
    margin: var(--s1) var(--s1);
    font-size: 2.5vmin;
    font-size: calc(2.5 * var(--s));
    border-radius: 0.7vmin;
    border-radius: var(--s0-7);
    background-color: var(--bitcoin-blue, rgb(17, 17, 51));
    color: white;

    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    user-select: none;

    cursor: pointer;
  }
  .darken {
    padding: 1vmin 2vmin;
    padding: var(--s1) var(--s2);
    border-radius: 0.7vmin;
    border-radius: var(--s0-7);
    transition: background-color 0.05s linear;
    cursor: pointer;
  }
  .darken:hover {
    background-color: var(--darker2, rgba(0, 0, 0, 0.2));
  }
  .selectionButton:active {
    transform: translateY(0.1vmin);
    transform: translateY(var(--s0-1));
  }
</style>
