<template>
  <div id="app">
    <v-app id="inspire" dark>
      <title-bar />
      <v-content>
        <v-container fluid fill-height>
          <v-layout column>
            <audio-toolbar />
            <v-flex>
              <piano-roll />
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <transport />
    </v-app>
  </div>
</template>

<script>
import store from './store';
import PianoRoll from './components/PianoRoll';
import AudioToolbar from './components/AudioToolbar.vue';
import Transport from './components/Transport';
import TrackList from './components/TrackList';
import TitleBar from './components/TitleBar';

export default {
  name: 'app',
  store,
  components: {
    PianoRoll,
    AudioToolbar,
    Transport,
    TrackList,
    TitleBar
  }
};
</script>