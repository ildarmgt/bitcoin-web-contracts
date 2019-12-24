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
    font-size: 2.5vmin;
    line-height: 2.5vmin;
    color: white;
    background-color: rgba(255, 255, 255, 0);
    border: 0.2vmin solid white;
    border-radius: 1.5vmin;
    padding: 0.4vmin 2vmin;
    padding-bottom: 0.6vmin;
    padding-top: 0.6vmin;
    cursor: pointer;
    margin: 1vmin;
    transition: background-color 0.1s linear;
    text-align: center;
  }
  .RoundButton:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .RoundButton:active {
    transform: translateY(0.2vmin);
  }
  .pushedIn,
  .pushedIn:hover {
    background-color: rgba(255, 255, 255, 1);
  }
  .noselect {
  -webkit-user-select: none;
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  user-select: none;
  }
</style>
