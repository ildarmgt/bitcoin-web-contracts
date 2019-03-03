<template>
  <div class="nav">
    <!-- overall name -->
    <div class="nav__name">
      {{ stepperName }}
    </div>
    <!-- embedded slot content  -->
    <div class="nav__view">
      <slot />
    </div>
    <!-- numbering & naming of the steps via title attributes -->
    <div class="nav__steps">
      <div
        class="nav__steps__step"
        v-for="(eaTitle, index) in titles()"
        :key="eaTitle"
      >
        <!-- created for each step -->
        <div
          class="nav__steps__step__number"
          @click="stepClicked(eaTitle)"
        >
          {{ index + 1 }}
        </div>
        <div class="nav__steps__step__title">
          {{ eaTitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stepper',
  data: () => ({
    lastSelection: 'none'
  }),
  props: {
    stepperName: { type: String, default: '' }
  },
  methods: {
    titles () {
      // convert internal vnodes's attributes into array of titles
      const res = this.$slots.default.reduce((reducer, value) => {
        return [...reducer, value.data.attrs.title];
      }, []);
      this.lastSelection = res[0];
      return res;
    },
    stepClicked (inTitle) {
      this.lastSelection = inTitle;
    }
  }
};
</script>

<style scoped>
  .nav {
    background-color: orange;
  }
  .nav__name {
    display: block;
    background-color: orange;
    color: white;
    padding-top: 1vmin;
    padding-bottom: 1vmin;
    margin-top: 3vmin;
    font-size: 3vmin;
    font-weight: bold;
  }
  .nav__view {
    padding: 2vmin 2vmin;
    background-color: rgba(255, 255, 255, 0.8);
  }
  .nav__steps {
    margin-left: 1vmin;
    margin-right: 1vmin;
    white-space: normal;
    display: flex;
    justify-content: space-between;
  }
  .nav__steps__step {
    display: inline-block;
    margin: 1vmin 2vmin;

  }
  .nav__steps__step__number {
    display: inline-block;
    height: 3vmin;
    width: 3vmin;
    padding: 0.5vmin;
    line-height: 3vmin;
    background-color: rgba(255, 225, 225, 0.6);
    color: orange;
    border-radius: 3vmin;
    font-size: 2.5vmin;

  }
  .nav__steps__step__title {
    display: inline-block;
    margin: 0 2vmin;
    color: rgba(255, 225, 225, 0.7);
    font-size: 2.5vmin;

  }
</style>
