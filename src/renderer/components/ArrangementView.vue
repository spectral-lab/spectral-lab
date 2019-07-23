<template>
    <div>
        <v-content>
            <v-container fluid fill-height>
                <v-layout column>
                    <v-flex>
                        <toolbar-container/>
                    </v-flex>
                    <v-flex>
                        <info-bar/>
                    </v-flex>
                    <v-flex>
                        <track-row/>
                    </v-flex>
                    <v-flex>
                        <track-row/>
                    </v-flex>
                    <v-flex>
                        <track-row/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
  import TrackRow from './TrackRow';
  import InfoBar from './InfoBar';
  import ToolbarContainer from './ToolbarContainer';
  export default {
    components: {
      TrackRow,
      InfoBar,
      ToolbarContainer
    }
  };
</script>

<style scoped>

</style>
