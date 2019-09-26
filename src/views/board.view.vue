<template>
  <div class="board">
    <calendar />
    <event-panel />
  </div>
</template>

<script>
import Calendar   from '@/components/calendar.component.vue';
import EventPanel from '@/components/event-panel.component.vue';

export default {
  name: 'board',
  components: {
    Calendar,
    EventPanel,
  },
};
</script>

<style lang="scss" scoped>
.board {
  min-height: 100vh;
  max-width: 130rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  position: relative;

  .calendar,
  .event-panel {
    margin-top: 10rem;
  }
}
</style>
