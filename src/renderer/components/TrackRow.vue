<template>
    <div class="track-row">
        <div class="track-header-panel">
            track header panel
        </div>
        <div class="track-content">
            <div class="clip"></div>
        </div>
    </div>
</template>

<script>

export default {
  components: {
  }
};
</script>

<style scoped>
    .track-row {
        background: grey;
        height: 150px;
        position: relative;
        display: grid;
        grid-template-columns: 250px 1fr;
    }
    .track-header-panel {
        background: blueviolet;
    }
    .track-content {
        background: darkgreen;
    }
    .clip {
        width:100px;
        height: 100px;
        resize: horizontal;
        overflow: auto;
        background: darkred;
    }
</style>
