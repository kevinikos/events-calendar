<template>
  <div id="app">
    <board />
  </div>
</template>

<script>
import Board from './views/board.view.vue';

export default {
  name: 'app',
  components: {
    Board,
  },
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-image: url('assets/images/app-background/app-background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
