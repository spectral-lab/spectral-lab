<template>
  <div id="app">
    <project-manager/>
    <v-app id="inspire" dark>
      <title-bar/>
      <v-content>
        <v-container fluid fill-height>
          <v-layout column>
            <v-flex>
              <audio-info-container/>
            </v-flex>
            <v-flex>
              <toolbar-container/>
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
import Transport from './components/Transport';
import TitleBar from './components/TitleBar';
import ProjectManager from './components/ProjectManager';
import ToolbarContainer from './components/ToolbarContainer';
import InfoBar from './components/InfoBar';
import AudioInfoContainer from './components/AudioInfoContainer';

export default {
  name: 'app',
  store,
  components: {
    AudioInfoContainer,
    PianoRollContainer,
    ToolbarContainer,
    InfoBar,
    Transport,
    TitleBar,
    ProjectManager
  }
};
</script>
