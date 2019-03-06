<template>
  <div
    class="expander fa"
    ref="animate_this"
  >
    <slot />
  </div>
</template>

<script>
// visual bug on chrome (not ff) in rare instances where
// text is invisible until highlighted or updated in any
// manner. appeares for elements with opacity < 1
// when undergoing this type of animation & some other times.
// currently using css animation to animate z-index for
// affected elements to idelaly force css refresh.

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
        }, ANIMATION_SECONDS * 1000 * 1.2);
      });
    },
    autoHeight () {
      const element = this.$refs.animate_this;
      element.style.height = 'auto';
    }
  }
};
</script>

<style>
  .expander {
    overflow: hidden;
    height: auto;
    transform: translateZ(0);
    -webkit-transform: translate3d(0,0,0);
  }

  /* force animation of text if visual bug */
  .fa {
    animation: fa 1s 0.1s infinite alternate;
  }
  @keyframes fa {
    from {opacity: 1;}
    to {opacity: 0.999;}
  }
</style>
