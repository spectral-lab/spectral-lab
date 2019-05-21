<template>
  <div id="utilities-container">
    <div id="playButtonContainer">
      <play-button />
    </div>
    <h1 id="songname" class="text">{{fileName}}</h1>
  </div>
</template>

<script>
import PlayButton from './PlayButton.vue'
export default {
  computed: {
    fileName () {
      return this.$store.state.fileName
    }
  },
  components: {
    PlayButton
  }
}
</script>

<style scoped>
  #utilities-container {
    display: flex;
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
    width: 90vw;
    height: 100%;
  }
  #songname {
    color: rgb(218, 218, 218);
    background: rgba(42, 42, 51, 0.9);
    letter-spacing: 0.1rem;
    padding: 1rem 3rem;
    margin: 1rem 3rem;
    text-shadow: 0px 0px;
    font-size: 1.5rem;
    font-weight:300;
  }
</style>
