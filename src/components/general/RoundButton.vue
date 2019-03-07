<template>
  <div
    class="RoundButton noselect"
    :style="{ color: textColor, 'border-color': textColor }"
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
    font-size: 2.5vmin;
    line-height: 2.5vmin;
    color: white;
    background-color: rgba(255, 255, 255, 0);
    border: 0.15vmin solid white;
    border-radius: 3vmin;
    padding: 0.4vmin 2vmin;
    padding-bottom: 0.6vmin;
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
