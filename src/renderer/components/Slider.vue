<template>
  <div id="sliderContainer">
    <span>Spectrogram</span>
    <div id="inputContainer">
      <input type="range" class="range blue" min=0 v-model="viewerOpacity" max=100>
    </div>
    <span>Waveform</span>
  </div>
</template>
<script>
export default {
  props: ['value'],
  computed: {
    viewerOpacity: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style scoped>
#sliderContainer {
  display: flex;
}
#inputContainer {
 width: 300px;
 margin: 0 12px;
}
.range {
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
}

input[type=range]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  background: rgba(59,173,227,1);
  background: -moz-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(206,158,115,1) 51%, rgba(255, 205, 0, 1) 100%);
  background: -webkit-gradient(left bottom, right top, color-stop(0%, rgba(59,173,227,1)), color-stop(25%, rgba(87,111,230,1)), color-stop(51%, rgba(206,158,115,1)), color-stop(100%, rgba(255, 205, 0, 1)));
  background: -webkit-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(206,158,115,1) 51%, rgba(255, 205, 0, 1) 100%);
  background: -o-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(206,158,115,1) 51%, rgba(255, 205, 0, 1) 100%);
  background: -ms-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(206,158,115,1) 51%, rgba(255, 205, 0, 1) 100%);
  background: linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(206,158,115,1) 51%, rgba(255, 205, 0, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3bade3 ', endColorstr='#ff357f ', GradientType=1 );
  height: 2px;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-moz-range-track {
  -moz-appearance: none;
  background: rgba(59,173,227,1);
  background: -moz-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(206,158,115,1) 51%, rgba(255, 205, 0, 1) 100%);
  background: -webkit-gradient(left bottom, right top, color-stop(0%, rgba(59,173,227,1)), color-stop(25%, rgba(87,111,230,1)), color-stop(51%, rgba(206,158,115,1)), color-stop(100%, rgba(255, 205, 0, 1)));
  background: -webkit-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(206,158,115,1) 51%, rgba(255, 205, 0, 1) 100%);
  background: -o-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(206,158,115,1) 51%, rgba(255, 205, 0, 1) 100%);
  background: -ms-linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(206,158,115,1) 51%, rgba(255, 205, 0, 1) 100%);
  background: linear-gradient(45deg, rgba(59,173,227,1) 0%, rgba(87,111,230,1) 25%, rgba(206,158,115,1) 51%, rgba(255, 205, 0, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3bade3 ', endColorstr='#ff357f ', GradientType=1 );
  height: 2px;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 2px solid;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  max-width: 80px;
  position: relative;
  bottom: 11px;
  background-color: #1d1c25;
  cursor: -webkit-grab;

  -webkit-transition: border 1000ms ease;
  transition: border 1000ms ease;
}

input[type=range]::-moz-range-thumb {
  -moz-appearance: none;
  border: 2px solid;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  max-width: 80px;
  position: relative;
  bottom: 11px;
  background-color: #1d1c25;
  cursor: -moz-grab;
  -moz-transition: border 1000ms ease;
  transition: border 1000ms ease;
}



.range.blue::-webkit-slider-thumb {
   border-color: rgb(59,173,227);
}

.range.ltpurple::-webkit-slider-thumb {
   border-color: rgb(87,111,230);
}

.range.purple::-webkit-slider-thumb {
  border-color: rgb(206,158,115);
}

.range.pink::-webkit-slider-thumb {
   border-color: rgb(255, 205, 0);
}

.range.blue::-moz-range-thumb {
   border-color: rgb(59,173,227);
}

.range.ltpurple::-moz-range-thumb {
   border-color: rgb(87,111,230);
}

.range.purple::-moz-range-thumb {
   border-color: rgb(206,158,115);
}

.range.pink::-moz-range-thumb {
   border-color: rgb(255, 205, 0);
}

input[type=range]::-webkit-slider-thumb:active {
  cursor: -webkit-grabbing;
}

input[type=range]::-moz-range-thumb:active {
  cursor: -moz-grabbing;
}
</style>

