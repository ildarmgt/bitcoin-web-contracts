<template>
  <div
    class="ArrowButton noselect"
    :style="{ color: textColor }"
    @click="$emit('click')"
  >
    {{ textContent }}
  </div>
</template>

<script>
export default {
  name: 'ArrowButton',
  props: {
    textColor: { type: String, default: '' },
    textContent: { type: String, default: '' }
  }
};
</script>

<style scoped>
  .ArrowButton {
      font-size: 3vmin;
      margin: 0 auto;
      margin-top: 5vmin;
      width: max-content;
      height: 5vmin;
      line-height: 5vmin;
      text-align: center;
      padding: 0 3vmin 0 2vmin;
      color: gray;
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
  .ArrowButton:after{
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
  .ArrowButton:hover {
    opacity: 1;
  }
  .ArrowButton:active {
    transform: translateY(0.2vmin);
  }
  .noselect {
  -webkit-user-select: none;
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  user-select: none;
  }
</style>
