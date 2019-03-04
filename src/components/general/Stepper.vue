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
        @click="stepClicked(eaTitle, index + 1)"
        :class="setNavClasses(eaTitle).step"
      >
        <!-- created for each step -->
        <div
          class="nav__steps__step__number noselect"
          :class="setNavClasses(eaTitle).stepNumber"
        >
          <!-- number of step -->
          {{ index + 1 }}
        </div>
        <div
          class="nav__steps__step__title noselect"
          :class="setNavClasses(eaTitle).stepTitle"
        >
          <!-- title of step -->
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
    lastSelection: 'none',
    pageList: []
  }),
  props: {
    stepperName: { type: String, default: '' },
    pageWanted: { type: Number, default: 0 }
  },
  methods: {
    // return array of step titles
    titles () {
      // convert internal vnodes's attributes into array of titles
      const res = this.$slots.default.reduce((reducer, value) => {
        return [...reducer, value.data.attrs.pageTitle];
      }, []);

      // if pageWanted prop is 0 or not defined, select first page by default
      // otherwise select pageWanted
      this.lastSelection = this.pageWanted ? res[this.pageWanted - 1] : res[0];

      // store it in data for book keeping
      this.pageList = res;

      return res;
    },
    stepClicked (inTitle, inPageNum) {
      // emit page change in case parent listening
      this.$emit('newPageClicked', inPageNum);
      this.lastSelection = inTitle;
    },
    // returns an array of classes for the bottom steps nav bar
    setNavClasses (inTitle) {
      if (this.lastSelection === inTitle) {
        // if this is the selected step
        return {
          step: ['stepSelected'],
          stepNumber: ['stepNumberSelected'],
          stepTitle: ['stepTitleSelected']
        };
      } else {
        // if this is a non selected step
        return [];
      }
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
    color: rgba(255, 225, 225, 0.6);
    padding-top: 1vmin;
    padding-bottom: 2vmin;
    margin-top: 3vmin;
    font-size: 3vmin;
    text-align: center;
  }
  .nav__view {
    padding: 2vmin 2vmin;
    margin-bottom: 4vmin;
    margin-top: 4vmin
    /* background-color: rgba(255, 255, 255, 0.8); */
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
    margin: 0 2vmin;
    margin-bottom: 1vmin;
    /* border-radius: 3vmin; */
    padding-top: 1vmin;
    cursor: pointer;
  }
  .nav__steps__step:hover {
    transform: translateY(-0.2vmin);
  }
  .nav__steps__step:active {
    transform: translateY(0.2vmin);
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
    cursor: pointer;
    margin-bottom: 1vmin;
  }
  .nav__steps__step__title {
    display: inline-block;
    margin: 0 2vmin;
    color: rgba(255, 225, 225, 0.7);
    font-size: 2.5vmin;
    cursor: pointer;
    /* white-space: nowrap; */
  }
  .stepNumberSelected {
    border: 0.15vmin solid white;
    color: white;
    background-color: orange;
  }
  .stepTitleSelected {
    color: white;
  }
  .noselect {
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
