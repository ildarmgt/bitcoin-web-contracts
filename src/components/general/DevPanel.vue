<template>
  <div>
    <div
      v-if="this.show"
      class="devpanel"
    >
      Dev Panel
      <div
        class="devButton"
        @click="outlineClicked"
      >
        outline
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DevPanel',
  data: () => ({
    show: false
  }),
  created () {
    // hide/show dev panel
    window.addEventListener('keydown', (e) => {
      if (e.key === '`') {
        this.show = !this.show;
      }
    });
  },
  methods: {
    // add or remove outlines globally
    outlineClicked () {
      const id = 'outliner';
      const sheet = document.getElementById(id);
      if (!sheet) {
        const outlineCss = '* {border: 1px solid red !important;}';
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'outliner';
        style.appendChild(document.createTextNode(outlineCss));
        document.head.appendChild(style);
      } else {
        sheet.disabled = true;
        sheet.parentNode.removeChild(sheet);
      }
    }
  }
};
</script>

<style scoped>
  .devpanel {
    font-size: 12px;
    display: block;
    position: fixed;
    left: 1vw;
    top: 93vh;
    /* background-color: yellow; */
  }
  .devButton {
    background-color: white;
    border: 1px black solid;
    border-radius: 12px;
  }
</style>
