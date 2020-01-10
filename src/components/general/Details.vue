<template>
  <div
    class="wrapper noselect"
    :style="cssVars"
  >
    <div
      class="btnExpand"
      @click="onClickExpand"
    >
      {{ buttonText }}
      <div
        class="arrow"
        :class="{ down: (showDetails) }"
      />
    </div>
    <div />
    <!-- v-show used so dom still exists for important data, just not visible if off -->
    <div
      v-show="(showDetails)"
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
    buttonText: { type: String, default: 'See details' },
    showAtStart: { type: Boolean, default: false },
    opacity: { type: Number, default: 0.7 },
    alignment: { type: String, default: 'right' }
  },
  computed: {
    cssVars () {
      return {
        '--opacity': this.opacity,
        '--alignment': this.alignment
      };
    }
  },
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
  .arrow:before {
    content: '';
    position: absolute;
    top: calc(0.5 * var(--s));
    left: calc(0.35 * var(--s));
    width: 0;
    height: 0;
    border-left: var(--s0-7) solid transparent;
    border-right: var(--s0-7) solid transparent;
    border-bottom: 0 solid transparent;
    border-top: calc(1.2 * var(--s)) solid white;
    margin: 0;
  }
  .arrow {
    width: calc(2.2 * var(--s));
    height: calc(2.2 * var(--s));
    position: relative;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    transform-origin: 50% 40%;
    transform: rotate(-90deg);
    transition: transform 0.1s linear;
    margin: 0;
  }
  .btnExpand {
    cursor: pointer;
    display: inline-block;
    padding: var(--s1);
    opacity: var(--opacity, 0.7);
    transition: background-color 0.1s linear;
    font-weight: normal;
    display: inline-block;
    text-decoration: none;
    font-size: var(--s2-5);
    line-height: var(--s2-5);
    padding: var(--s0-7) var(--s2);
    margin-bottom: var(--s1);
  }
  .btnExpand:hover {
    background-color: var(--darker2, rgba(0, 0, 0, 0.2));
  }
  .divDetails {
    transition: background-color 0.1s linear;
  }
  .wrapper {
    text-align: var(--alignment, 'right');
    display: block;
  }
  .down {
    transform: rotate(0deg);
  }
</style>
