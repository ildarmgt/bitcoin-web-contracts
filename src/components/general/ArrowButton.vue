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
    font-size: var(--s3);
    margin: 0 auto;
    margin-top: var(--s5);
    width: max-content;
    height: var(--s5);
    line-height: var(--s5);
    text-align: center;
    padding: 0 var(--s3) 0 var(--s2);
    color: var(--color-disabled, gray);
    background-color: var(--background, white);
    opacity: 0.75;
    position: relative;
    display: block;
    border-radius: var(--s1) var(--s2) var(--s2) var(--s1);
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
    right: calc(-1.37 * var(--s));
    top: 0;
    content: "";
    width: var(--s5);
    height: var(--s5);
    background-color: inherit;
    border-radius: var(--s2) calc(1.3 * var(--s)) var(--s1) calc(1.3 * var(--s));
    transform: rotate(-45deg) scale(0.707);
    z-index: 0;
  }
  .ArrowButton:hover {
    opacity: 1;
  }
  .ArrowButton:active {
    transform: translateY(var(--s0-2));
  }
  .noselect {
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
