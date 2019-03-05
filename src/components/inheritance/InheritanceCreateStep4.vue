<template>
  <div>
    <div class="q">
      <!-- main page q -->
      <div class="q__lbl1">
        Contract address calculated:
      </div>
      <div class="q__backup">
        <a
          ref="backup"
          class="q__backup__link"
        >
          backup file
        </a>
        <div class="q__backup__note1">
          Important! Keep private. Lose it, lose access.
        </div>
      </div>
      <div class="q__contract">
        <div class="q__contract__lbl2">
          Fund this address to initialize it
        </div>
        <img
          class="q__contract__qr"
          ref="q__contract__qr"
        >
        <div class="q__contract__addy">
          {{ address }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'; // state
import qrimage from 'qr-image';

export default {
  name: 'InheritanceCreateStep4',
  data: () => ({
    address: '3Gbtesttestsd8f79sd7f9sd87f9s8d7f9s8d7f9sd87f9s8d7f9sd8fest'
  }),
  mounted () {
    // create backup link
    this.updateBackup();
    this.updateQR(this.address);
  },
  updated () {
    this.updateBackup();
    this.updateQR(this.address);
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions([]),
    // create backup element
    updateBackup () {
      // assemble all the data to back up

      const testJson = { banana: 'is good', vegetable: 'is bad' };
      const data = 'text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(testJson, null, 2));
      // const a = document.createElement('a');
      const a = this.$refs.backup;
      a.href = 'data:' + data;
      a.download = 'backup_inheritance.json';
      // let container = this.$refs.backup;
      // container.appendChild(a);
      // this.$forceUpdate();
    },
    updateQR (text) {
      // generate qr png image buffer
      const qr = qrimage.imageSync(text).toString('base64');
      // add the qr image at source for img element
      this.$refs.q__contract__qr.src = 'data:image/png;base64,' + qr;
    }
  }
};
</script>

<style scoped>
  .q {
    text-align: left;
    margin: 0vmin 2vmin;
  }
  .q__lbl1 {
    display: block;
    font-size: 3vmin;
    color: white;
    margin-right: 3vmin;
    margin-left: 5%;
    font-weight: bold;
  }
  .q__backup {
    margin-top: 6vmin;
    margin-bottom: 6vmin;
    text-align: center;
  }
  .q__backup__link {
    display: inline-block;
    /* margin: 0 auto; */
    /* width: auto; */
    text-decoration: none;
    font-size: 3vmin;
    line-height: 3vmin;
    color: white;
    background-color: orange;
    border: 0.3vmin solid white;
    border-radius: 3vmin;
    padding: 0.5vmin 2vmin;
  }
  .q__backup__note1 {
    display: block;
    font-size: 2vmin;
    color: white;
    margin-top: 1vmin;
    line-height: 2vmin;
  }
  .q__contract {
    text-align: center;
  }
  .q__contract__lbl2 {
    margin: 0 auto;
    display: block;
    font-size: 3vmin;
    color: white;
  }
  .q__contract__addy {
    /* background-color: white; */
    display: block;
    margin: 0 auto;
    color: white;
    display: block;
    width: 70%;
    word-wrap: break-word;
    margin-top: 1vmin;

  }
  .q__contract__qr {
    display: block;
    margin: 0 auto;
    margin-top: 1vmin;
  }
</style>
