<template>
  <div
    class="nav"
    :style="primaryColor"
  >
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
        :class="setNavClasses(eaTitle, index).step"
      >
        <!-- created for each step -->
        <div
          class="nav__steps__step__number noselect"
          :class="setNavClasses(eaTitle, index).stepNumber"
        >
          <!-- number of step -->
          {{ index + 1 }}
        </div>
        <div
          class="nav__steps__step__title noselect"
          :class="setNavClasses(eaTitle, index).stepTitle"
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
    pageList: [],
    color: ''
  }),
  props: {
    stepperName: { type: String, default: '' },
    pageWanted: { type: Number, default: 0 },
    pageInfo: { type: Array, default: () => [] },
    primaryColor: {
      type: Object,
      default () { return {}; }
    }
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
    setNavClasses (inTitle, inIndex) {
      // { what-this-is-for: [array-of-classes-for-styling-that] }
      let style = {
        step: [],
        stepNumber: [],
        stepTitle: []
      };
      // if valid
      if (!this.pageInfo[inIndex].valid) {
        style = {
          ...style,
          stepNumber: ['stepNumberInvalid'],
          stepTitle: ['stepTitleInvalid']
        };
      }
      // if usable
      if (!this.pageInfo[inIndex].usable) {
        style = {
          ...style,
          step: ['stepLocked'],
          stepNumber: ['stepNumberLocked'],
          stepTitle: ['stepTitleLocked']
        };
      }
      // if selected or not
      if (this.lastSelection === inTitle) {
        style = {
          ...style,
          stepNumber: ['stepNumberSelected'],
          stepTitle: ['stepTitleSelected']
        };
      }
      return style;
    }
  }
};
</script>

<style scoped>
  .nav {
    background-color: var(--primaryColor, grey);
  }
  .nav__name {
    display: block;
    background-color: var(--primaryColor, grey);
    color: var(--text-lighterondark, rgba(255, 225, 225, 0.6));
    padding-top: var(--s1);
    padding-bottom: var(--s2);
    margin: 0 calc(10 * var(--s));
    margin-top: var(--s3);
    font-size: var(--s3);
    text-align: center;
  }
  .nav__view {
    padding: var(--s2) var(--s2);
    margin-bottom: var(--s4);
    margin-top: var(--s4)
  }
  .nav__steps {
    margin-left: var(--s1);
    margin-right: var(--s1);
    white-space: normal;
    display: flex;
    justify-content: space-between;
  }
  .nav__steps__step {
    display: inline-block;
    margin: 0 var(--s2);
    margin-bottom: var(--s1);
    padding-top: var(--s1);
    cursor: pointer;
  }
  .nav__steps__step__number {
    display: inline-block;
    height: var(--s3);
    width: var(--s3);
    padding: var(--s0-5);
    line-height: var(--s3);
    background-color: var(--text-lighterondark, rgba(255, 225, 225, 0.6));
    color: var(--primaryColor, grey);
    border-radius: var(--s3);
    font-size: var(--s2-5);
    cursor: pointer;
    margin-bottom: var(--s1);
  }
  .nav__steps__step__title {
    display: inline-block;
    margin: 0 var(--s2);
    color: var(--text-lighterondark, rgba(255, 225, 225, 0.6));
    font-size: var(--s2-5);
    cursor: pointer;
  }
  .stepNumberSelected {
    box-shadow: 0 0 0 calc(0.15 * var(--s)) var(--background, white);
    color: var(--background, white);
    background-color: var(--primaryColor, grey);
  }
  .stepTitleSelected {
    color: var(--background, white);
  }
  .noselect {
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    user-select: none;
  }
  .stepNumberInvalid {
    background-color: var(--color-error-light, rgba(141, 70, 70, 0.314));
  }
  .stepNumberLocked {
    background-color: var(--primaryColor, grey);
    color: var(--text-lighterondark, rgba(255, 225, 225, 0.6));
  }
  .stepLocked {
    cursor: default;
  }
  .stepNumberLocked {
    cursor: default;
  }
  .stepTitleLocked {
    cursor: default;
  }
</style>
