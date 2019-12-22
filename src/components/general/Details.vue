<template>
  <div class="wrapper noselect">
    <div
      class="btnExpand"
      @click="onClickExpand"
    >
      {{ buttonText }}
      <div
        class="arrow"
        :class="{ down: showDetails }"
      />
    </div>
    <!-- v-show used so dom still exists for important data, just not visible if off -->
    <div
      v-show="showDetails"
      class="divDetails"
    >
      <slot />
    </div>
  </div>
</template>

<script>
/**
 * This component starts collapsed and let's user expand to reveal internals
 */
export default {
  name: 'Details',
  components: {},
  data: () => ({
    showDetails: false
  }),
  props: {
    buttonText: { type: String, default: 'Details...' },
    showAtStart: { type: Boolean, default: false }
  },
  computed: {},
  mounted () {
    // set initial state based on prop, but then independent
    this.showDetails = this.showAtStart;
  },
  methods: {
    onClickExpand () {
      this.showDetails = !this.showDetails;
    }
  }
};
</script>

<style scoped>
  .arrow {
    width: 2.2vmin;
    height: 2.2vmin;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    transform-origin: 50% 50%;
    transform: rotate(-90deg);
    transition: transform 0.3s linear;
  }
  .arrow:before {
    content: '';
    position: absolute;
    top: 0.5vmin;
    left: 0.35vmin;
    width: 0;
    height: 0;
    border-left: 0.7vmin solid transparent;
    border-right: 0.7vmin solid transparent;
    border-bottom: 0 solid transparent;
    border-top: 1.2vmin solid white;
  }
  .btnExpand {
    /* border: 1px solid white; */
    cursor: pointer;
    /* border: 0.15vmin solid white; */
    display: inline-block;
    margin-left: 5%;
    padding: 1vmin;
    /* background-color: rgba(0, 0, 0, 0.1); */
    opacity: 0.7;
    transition: background-color 0.1s linear;
    /* border-radius: 1.5vmin; */
    font-weight: normal;
    display: inline-block;
    text-decoration: none;
    font-size: 2.5vmin;
    line-height: 2.5vmin;
    padding: 0.7vmin 2vmin;
  }
  .btnExpand:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .divDetails {
    /* border: 1px solid white; */
    transition: background-color 0.1s linear;
    /* padding: 0.5vmin; */
  }
  .wrapper {
    text-align: right;
  }
  .down {
    transform: rotate(0deg);
  }
  /* .btnExpand:hover ~ .divDetails {
    background-color: rgba(0, 0, 0, 0.1);
  } */
</style>
