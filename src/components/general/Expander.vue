<template>
  <div
    class="expander"
    ref="animate_this"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Expander',
  data: () => ({
    lastTimer: null
  }),
  mounted () {
    // necessary to ensure window is auto resized
    window.addEventListener('resize', this.windowResize);

    // animate
    this.animate();
  },
  beforeDestroy () {
    // clean up resizing listener
    window.removeEventListener('resize', this.windowResize);
  },

  updated () {
    this.animate();
  },
  methods: {
    // expands element to final height
    animate () {
      this.$nextTick(function () {
        // clean up previous animation
        clearTimeout(this.lastTimer);

        // length of animation
        const ANIMATION_SECONDS = 0.5;

        // reset & then measure height of this element
        const element = this.$refs.animate_this;
        element.style.height = 'auto';
        const maxHeight = element.clientHeight;

        // resize imagine to 0 height w/o animations
        element.style.transition = 'none';
        element.style.height = 0 + 'px';

        // turn animation back on
        element.style.transition = ANIMATION_SECONDS + 's height ease-in-out';

        // changing height to original (after small delay 1/10th of ANIMATION_SECONDS)
        this.lastTimer = setTimeout(() => {
          element.style.height = maxHeight + 'px';
        }, ANIMATION_SECONDS * 100);
      });
    },
    windowResize () {
      const element = this.$refs.animate_this;
      element.style.height = 'auto';
    }
  }
};
</script>

<style scoped>
  .expander {
    overflow: hidden;
    height: auto;
  }
</style>
