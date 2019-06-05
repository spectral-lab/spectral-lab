<template>
  <div id="app">
    <v-app id="inspire" dark>
      <title-bar />
      <track-list />
      <v-content>
        <v-container fluid fill-height>
          <v-layout column>
            <v-flex>
              <audio-toolbar />
              <main-toolbar />
              <viewer />
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
import Viewer from './components/Viewer.vue';
import AudioToolbar from './components/AudioToolbar.vue';
import MainToolbar from './components/MainToolbar.vue';
import Transport from './components/Transport';
import TrackList from './components/TrackList';
import TitleBar from './components/TitleBar';

export default {
  name: 'app',
  store,
  components: {
    Viewer,
    AudioToolbar,
    MainToolbar,
    Transport,
    TrackList,
    TitleBar
  }
};
</script>