<template>
  <div id="app">
    <keyboard-manager/>
    <v-app id="inspire" dark>
      <title-bar/>
      <v-content>
        <v-container fluid fill-height>
          <v-layout column>
            <v-flex>
              <audio-info/>
            </v-flex>
            <v-flex>
              <toolbar/>
            </v-flex>
            <v-flex>
              <info-bar/>
            </v-flex>
            <v-flex>
              <piano-roll-container/>
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
import PianoRollContainer from './components/PianoRollContainer';
import AudioInfo from './components/AudioInfo';
import Transport from './components/Transport';
import TitleBar from './components/TitleBar';
import KeyboardManager from './components/KeyboardManager';
import Toolbar from './components/Toolbar';
import InfoBar from './components/InfoBar';

export default {
  name: 'app',
  store,
  components: {
    PianoRollContainer,
    Toolbar,
    InfoBar,
    AudioInfo,
    Transport,
    TitleBar,
    KeyboardManager
  }
};
</script>
