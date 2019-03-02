<template>
  <div>
    <div class="nav">
      <div class="nav__name">
        {{ name }}
      </div>
      <slot />
      <div class="nav__steps">
        <div
          class="nav__steps__step"
          v-for="(title, index) in titles()"
          :key="title"
        >
          <div class="nav__steps__step__number">
            {{ index + 1 }}
          </div>
          <div class="nav__steps__step__title">
            {{ title }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Stepper',
  props: [
    'name'
  ],
  methods: {
    titles () {
      // console.log(this.$slots);
      // convert internal divs/vnodes into array of titles
      const res = this.$slots.default.reduce((reducer, value) => {
        return [...reducer, value.data.attrs.title];
      }, []);
      return res;
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
    padding-bottom: 2vmin;
    margin-top: 3vmin;
    font-size: 3vmin;
  }
  .nav__steps {
    margin-top: 2vmin;
    margin-left: 1vmin;
    margin-right: 1vmin;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
  }
  .nav__steps__step {
    display: inline-block;
    white-space: nowrap;
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
