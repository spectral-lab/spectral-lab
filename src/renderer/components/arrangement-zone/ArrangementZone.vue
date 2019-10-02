<template>
  <div class="arrangement-zone">
    <div class="arrangement-zone-content">
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
    }
    .track-area {
        overflow: scroll;
    }
</style>
