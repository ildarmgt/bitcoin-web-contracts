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
    font-size: 5vmin;
    font-weight: bold;
    padding: 0.2vmin 1vmin;
    height: 5vmin;
    text-align: center;
    background-color: white;
    color: black;
    border: 0.1vmin solid white;
    border-right: 0.3vmin solid white;
    border-left: 0.3vmin solid white;
    border-top: 0.5vmin solid white;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    cursor: default;
    vertical-align: middle;
    width: 50%;
  }
  .divInput div {
    display: block;
    font-size: 5vmin;
    font-family: 'Montserrat';
    color: white;
    border: white;
    border-radius: 2vmin;
    padding: 1vmin;
    background-color: rgba(255, 255, 255, 0.1);
    width: 50%;
    margin: auto;
    margin-top: 2vmin;
    cursor: pointer;
  }
  .divInput div:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
