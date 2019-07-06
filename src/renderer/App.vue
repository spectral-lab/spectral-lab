<template>
  <div id="app">
    <keyboard-manager/>
    <v-app id="inspire" dark>
      <title-bar/>
      <v-content>
        <v-container fluid fill-height>
          <v-layout column>
            <audio-toolbar/>
            <v-flex>
              <piano-roll/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <transport/>
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
import KeyboardManager from './components/KeyboardManager';

export default {
  name: 'app',
  store,
  components: {
    PianoRoll,
    AudioToolbar,
    Transport,
    TrackList,
    TitleBar,
    KeyboardManager
  }
};
</script>