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
    window.addEventListener('resize', this.autoHeight);

    // animate
    this.animate();
  },
  beforeDestroy () {
    // clean up resizing listener
    window.removeEventListener('resize', this.autoHeight);
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
        }, ANIMATION_SECONDS * 1000 * 0.1);

        this.lastTimer = setTimeout(() => {
          this.autoHeight();
          // visual bug on chrome (not ff) in rare instances where
          // text is invisible until highlighted or updated in any
          // manner. attempting to force refresh on slot components
          // at the end of the animation to show the text automatically.
          // has also appeared before for elements with opacity < 1
          // when undergoing this type of animation
          try {
            this.$slots.default.forEach(item => {
              item.componentInstance.$forceUpdate();
            });
          } catch (e) {}
        }, ANIMATION_SECONDS * 1000 * 1.1);
      });
    },
    autoHeight () {
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
