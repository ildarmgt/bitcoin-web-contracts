<template>
  <div class="inheritance__intro">
    <h1>Inheritance Contract dApp</h1>
    <div class="description">
      <div class="contractTitle">
        A digital will based on inactivity time and enforced by the Bitcoin network:
      </div>
      <ul>
        <li>
          The key of party <span class="key_blue">"Owner"</span> can access the funds at any time.
        </li>
        <li>
          The key of party <span class="key_green">"Heir"</span> is allowed access to the funds
          only if the funds don't move for a specified length of time.
        </li>
      </ul>
      <span class="text_light example">
        Example: I will spend Bitcoin using my "Owner" key, moving them at least once a year to a new contract. But if something happens to me and I don't move them within 1 year, my sister can then also spend the funds with just her "Heir" key.
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InheritanceIntro'
};
</script>

<style scoped>
  .description {
    display: block;
    width: 90%;
    margin: 0 auto;
    text-align: justify;;
  }

  .key_blue {
    /* font-weight: bold; */
    background-color: blue;
    opacity: 0.6;
    color: white;
    white-space:nowrap;
    margin: 0.4vmin;
    padding: 0.3vmin 2vmin;
    /* border-radius: 3vmin; */
    vertical-align: middle;
  }

  .key_green {
    /* font-weight: bold; */
    background-color: green;
    opacity: 0.6;
    color: white;
    white-space:nowrap;
    margin: 0.4vmin;
    padding: 0.3vmin 2vmin;
    /* border-radius: 3vmin; */
    vertical-align: middle;
  }

  .example {
    width: 90%;
    display: block;
    margin: 0 auto;
    margin-bottom: 2vmin;
  }

  .contractTitle {
    background-color: orange;
    padding: 0.3vmin 2vmin;
    display: inline-block;
  }

  .inheritance__intro {
    display: inline-block;
  }
</style>
