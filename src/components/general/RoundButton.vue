<template>
  <div
    class="RoundButton noselect"
    :style="{ color: textColor, 'border-color': textColor }"
    @click="$emit('click')"
    :class="{ pushedIn: isPushedIn }"
  >
    {{ textContent }}
  </div>
</template>

<script>
export default {
  name: 'RoundButton',
  components: {},
  data: () => ({}),
  props: {
    textColor: { type: String, default: '' },
    textContent: { type: String, default: '' },
    isPushedIn: { type: Boolean, default: false }
  },
  computed: {},
  mounted () {},
  methods: {}
};

</script>

<style scoped>
  .RoundButton {
    font-weight: normal;
    display: inline-block;
    text-decoration: none;
    font-size: var(--s2-5);
    line-height: var(--s2-5);
    color: var(--background, white);
    background-color: var(--transparent, rgba(255, 255, 255, 0));
    border: var(--s0-2) solid var(--background, white);
    border-radius: var(--s1-5);
    padding: calc(0.4 * var(--s)) var(--s2);
    padding-bottom: calc(0.6 * var(--s));
    padding-top: calc(0.6 * var(--s));
    cursor: pointer;
    margin: var(--s1);
    transition: background-color 0.05s linear;
    text-align: center;
  }
  .RoundButton:hover {
    background-color: var(--darker1, rgba(0, 0, 0, 0.1));
  }
  .RoundButton:active {
    transform: translateY(var(--s0-2));
  }
  .pushedIn,
  .pushedIn:hover {
    background-color: var(--background, white);
  }
  .noselect {
  -webkit-user-select: none;
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  user-select: none;
  }
</style>
