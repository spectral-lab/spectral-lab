<template>
    <div class="arrangement-zone">
        <v-content>
            <v-container fluid fill-height>
                <v-layout column>
                    <v-flex>
                        <div class="arrangement-ruler">
                            ruler
                        </div>
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
  export default {
    components: {
      TrackRow
    }
  };
</script>

<style scoped>
    .arrangement-zone {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .arrangement-ruler {
        background: darkcyan;
        width: 100%;
        height: 50px;
    }

</style>
