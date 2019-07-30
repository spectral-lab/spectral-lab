<template>
  <div
    :style="{ background: bgColor, color: strokeColor }"
    class="row-item-wrapper"
  >
    <div
      v-if="visibleLine==='CENT'"
      class="line-wrapper"
      :style="{borderBottomColor: strokeColor}"
    >
      <div
        v-for="cent in positiveCents"
        :key="cent"
        class="cent"
      >
        <span>+{{ cent }}</span>
      </div>
      <div class="note-name">
        <span>{{ noteName }}</span>
      </div>
      <div
        v-for="cent in negativeCents"
        :key="cent"
        class="cent"
      >
        <span>{{ cent }}</span>
      </div>
    </div>
    <div
      v-if="visibleLine==='NOTE'"
      class="line-wrapper"
      :style="{borderBottomColor: strokeColor}"
    >
      <div class="note-name">
        <span>{{ noteName }}</span>
      </div>
      <div class="empty" />
    </div>
    <div
      v-if="visibleLine==='OCTAVE'"
      class="line-wrapper"
      :style="{borderBottomColor: strokeColor}"
    >
      <div
        v-if="isC"
        class="octave-note-name"
      >
        <span>{{ noteName }}</span>
      </div>
    </div>
    <div
      v-if="visibleLine==='NONE'"
      class="line-wrapper"
    >
      <div class="empty" />
    </div>
  </div>
</template>

<script>
import * as teoria from 'teoria';

export default {
  props: {
    noteNumber: Number,
    visibleLine: {
      type: String,
      validator: (val) => ['OCTAVE', 'NOTE', 'CENT', 'NONE'].includes(val)
    }
  },
  data () {
    return {
      positiveCents: [40, 30, 20, 10],
      negativeCents: [-10, -20, -30, -40, -50]
    };
  },
  computed: {
    noteName () {
      return teoria.note.fromMIDI(this.noteNumber).scientific();
    },
    accidental () {
      return teoria.note.fromMIDI(this.noteNumber).accidental();
    },
    isWhiteKey () {
      return this.accidental === '';
    },
    isC () {
      return teoria.note.fromMIDI(this.noteNumber).name() === 'c';
    },
    bgColor () {
      return this.isWhiteKey ? 'rgb(95,95,95)' : 'rgb(61,61,61)';
    },
    strokeColor () {
      return this.isWhiteKey ? 'rgb(45,45,45)' : 'rgb(140,140,140)';
    }
  }
};
</script>

<style scoped>
    .row-item-wrapper {
        border-bottom: solid rgb(61,61,61) 1px;
        width: 100%;
        height: 100%;
        min-height: 0;
        overflow: hidden;

    }
    .line-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        min-height: 0;
        overflow: hidden;

    }
    .note-name {
        font-size: 10px;
        border-bottom: dashed 1px;
        width: 100%;
        position: relative;
        flex: 1 1;
        z-index: 50;
        min-height: 0;
        overflow: hidden;
    }
    .octave-note-name {
        font-size: 10px;
        width: 100%;
        position: relative;
        flex: 1 1;
        z-index: 50;
        min-height: 0;
        overflow: hidden;
    }
    .empty {
        width: 100%;
        position: relative;
        flex: 1 1;
        z-index: 50;
        min-height: 0;
        overflow: hidden;
    }
    .cent {
        font-size: 8px;
        border-bottom: dotted 1px;
        width: 100%;
        position: relative;
        flex: 1 1;
        min-height: 0;
        overflow: hidden;
    }
    span {
        position: absolute;
        bottom: 0;
        left: 2px;
    }
</style>
