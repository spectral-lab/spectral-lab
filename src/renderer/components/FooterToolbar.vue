<template>
    <div>
        <v-layout row align-center>
            <v-flex>
                <opacity-slider></opacity-slider>
            </v-flex>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
        </v-layout>
    </div>

</template>

<script>
  import OpacitySlider from './OpacitySlider';

  export default {
    components: {
      OpacitySlider
    }
  };
</script>

<style scoped>

</style>
