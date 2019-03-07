<template>
  <div
    class="RoundButton noselect"
    :style="{ color: textColor, border: '0.3vmin solid ' + textColor }"
    @click="$emit('click')"
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
    textContent: { type: String, default: '' }
  },
  computed: {},
  mounted () {},
  methods: {}
};

</script>

<style scoped>
  .RoundButton {
    display: inline-block;
    text-decoration: none;
    font-size: 3vmin;
    line-height: 3vmin;
    color: white;
    background-color: rgba(255, 255, 255, 0);
    border: 0.3vmin solid white;
    border-radius: 3vmin;
    padding: 0.5vmin 2vmin;
    cursor: pointer;
    margin: 1vmin;
  }
  .RoundButton:active {
    transform: translateY(0.2vmin);
  }
  .noselect {
  -webkit-user-select: none;
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  user-select: none;
  }
</style>
