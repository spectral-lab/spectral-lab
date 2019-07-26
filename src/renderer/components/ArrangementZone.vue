<template>
    <div class="arrangement-zone">
        <div class="arrangement-zone-content">
            <div class="arrangement-ruler">
                ruler
            </div>
            <div class="track-container">
                <track-row/>
                <track-row/>
                <track-row/>
                <track-row/>
                <track-row/>
                <track-row/>
                <track-row/>
                <track-row/>
                <track-row/>
            </div>
        </div>
    </div>
</template>

<script>
  import TrackRow from './TrackRow';

  export default {
    components: {
      TrackRow
    }
  };
</script>

<style scoped>
    .arrangement-zone {
        padding: 24px;
        width: 100%;
        height: 100%;
    }
    .arrangement-zone-content {
        width: 100%;
        height: 100%;
    }
    .track-container {
        height: 90%;
        overflow: scroll;
    }
    .arrangement-ruler {
        background: darkcyan;
        width: 100%;
        height: 50px;
    }
</style>
