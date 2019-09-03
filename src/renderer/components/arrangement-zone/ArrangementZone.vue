<template>
  <div class="arrangement-zone">
    <div class="arrangement-zone-content">
      <div class="arrangement-ruler">
        ruler
      </div>
      <div class="track-area">
        <track-row-container />
      </div>
    </div>
  </div>
</template>

<script>
import TrackRowContainer from './TrackRowContainer';
export default {
  components: {
    TrackRowContainer
  }
};
</script>

<style scoped>
    .arrangement-zone {
        width: 100%;
        height: 100%;
        padding: 24px;
    }
    .arrangement-zone-content {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 20px 1fr;
    }
    .track-area {
        grid-area: 2 / 1 / 3 / 2;
        overflow: scroll;
    }
    .arrangement-ruler {
        grid-area: 1 / 1 / 2 / 2;
        background: darkcyan;
    }
</style>
