<template>
  <div class="fadebackground">
    <div class="divInput">
      <input
        v-model="value"
        spellcheck="false"
        type="password"
        ref="inputPin"
        @keyup.enter="$emit('submit', value)"
        autofocus
      >
      <div
        @click="$emit('submit', value)"
      >
        Submit Pin
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InputPrompt',
  data: () => {
    return {
      value: ''
    };
  },
  mounted () {
    // put the input box into focus every time
    this.$nextTick(() => this.$refs.inputPin.focus());
  }
};
</script>

<style scoped>
  .fadebackground {
    position: fixed;
    display: block;
    background-color: rgba(0, 0, 0, 0.93);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .divInput {
    position: relative;
    top: 40%;
  }
  .divInput input {
    font-family: 'Montserrat';
    display: inline-block;
    font-size: var(--s5);
    font-weight: bold;
    padding: var(--s0-2) var(--s1);
    height: var(--s5);
    text-align: center;
    background-color: white;
    color: black;
    border: var(--s0-1) solid white;
    border-right: var(--s0-3) solid white;
    border-left: var(--s0-3) solid white;
    border-top: var(--s0-5) solid white;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    cursor: default;
    vertical-align: middle;
    width: 50%;
  }
  .divInput div {
    display: block;
    font-size: var(--s5);
    font-family: 'Montserrat';
    color: var(--background, white);
    border: var(--background, white);
    border-radius: var(--s2);
    padding: var(--s1);
    background-color: var(--brighter1, rgba(255, 255, 255, 0.1));
    width: 50%;
    margin: auto;
    margin-top: var(--s2);
    cursor: pointer;
  }
  .divInput div:hover {
    background-color: var(--brighter2, rgba(255, 255, 255, 0.2));
  }
</style>
