<template>
  <div
    ref="pianoRollLayout"
    class="piano-roll-layout"
  >
    <elastic-div-stack
      :border-width="24"
      :upper-content-height="upperContentHeight"
      @change-height="upperContentHeight = $event.upperContentHeight"
    >
      <template #upper>
        <div class="upper-content">
          <div
            ref="rulerViewport"
            class="ruler-viewport scrollbar-hidden"
          >
            <div
              ref="rulerContent"
              class="ruler-content"
            >
              <slot name="ruler" />
            </div>
          </div>
          <div
            ref="noteDisplayViewport"
            class="note-display-viewport scrollbar-hidden"
          >
            <div
              ref="noteDisplayContent"
              class="note-display-content"
            >
              <slot name="note-display" />
            </div>
          </div>
          <div
            ref="midiKeyboardViewport"
            class="midi-keyboard-viewport scrollbar-hidden"
          >
            <div
              ref="midiKeyboardContent"
              class="midi-keyboard-content"
            >
              <slot name="midi-keyboard" />
            </div>
          </div>
        </div>
      </template>
      <template #lower>
        <div class="lower-content">
          <div
            ref="automationSelector"
            class="automation-selector"
          />
          <div
            ref="automationDisplayViewport"
            class="automation-display-viewport scrollbar-hidden"
          >
            <div
              ref="automationDisplayContent"
              class="automation-display-content"
            >
              <slot name="automation-display" />
            </div>
          </div>
        </div>
      </template>
    </elastic-div-stack>
  </div>
</template>

<script>
import ElasticDivStack from '../misc/ElasticDivStack';
import { getZoomManager } from '../../utils/view/pianoRoll/ZoomManager';
import { syncScroll } from '../../utils/view/pianoRoll/scroll';

export default {
  components: {
    ElasticDivStack
  },
  data () {
    return {
      upperContentHeight: 350
    };
  },
  mounted () {
    this.upperContentHeight = this.$refs.pianoRollLayout.offsetHeight * 0.75;
    getZoomManager().initialize({
      resizeBasis: this.$refs.noteDisplayViewport,
      horizontalZoomTargets: [
        this.$refs.noteDisplayContent,
        this.$refs.rulerContent,
        this.$refs.automationDisplayContent
      ],
      verticalZoomTargets: [this.$refs.noteDisplayContent, this.$refs.midiKeyboardContent]
    });
    syncScroll({
      verticalScrollTargets: [this.$refs.noteDisplayViewport, this.$refs.midiKeyboardViewport],
      horizontalScrollTargets: [
        this.$refs.noteDisplayViewport,
        this.$refs.rulerViewport,
        this.$refs.automationDisplayViewport
      ]
    });
  }
};
</script>

<style scoped>
.piano-roll-layout {
    background: rgb(66,66,66);
    height: 100%;
    animation: fadein 1s;
}

.upper-content {
  height: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 40px 1fr;
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

.midi-keyboard-viewport {
  overflow: auto;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: end;
}

.midi-keyboard-content {
  width: 100%;
  height: 200%;
}

.note-display-viewport {
  overflow: auto;
  grid-column-start: 2;
  grid-column-end: end;
  grid-row-start: 2;
  grid-row-end: end;
}

.note-display-content {
  width: 100%;
  height: 200%;
}

.ruler-viewport {
  overflow: auto;
  grid-column-start: 2;
  grid-column-end: end;
  grid-row-start: 1;
  grid-row-end: 2;
}

.ruler-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.lower-content {
  height: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr;
}

.automation-selector {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: end;
  background: rgb(55, 55, 55);
}

.automation-display-viewport {
    grid-column-start: 2;
    grid-column-end: end;
    grid-row-start: 1;
    grid-row-end: end;
    background: rgb(50,50,50);
    overflow: auto;
    border-top: solid 2px rgb(100, 112, 114);
}

.automation-display-content {
    position: relative;
    height: 100%;
    width: 100%;
}

.scrollbar-hidden::-webkit-scrollbar  {
    display:none;
    width:0px;
    background-color:transparent;
}
</style>
