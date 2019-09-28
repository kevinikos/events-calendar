<template>
  <div class="board">
    <draggable class="board__draggable-wrapper">
      <calendar />
      <event-panel />
    </draggable>
  </div>
</template>

<script>
import draggable  from 'vuedraggable';
import Calendar   from '@/components/calendar.component.vue';
import EventPanel from '@/components/event-panel.component.vue';

export default {
  name: 'board',
  components: {
    Calendar,
    EventPanel,
    draggable,
  },
};
</script>


<style lang="scss" scoped>
.board {
  min-height: 100vh;
  max-width: 130rem;
  margin: 0 auto;
  position: relative;

  &__draggable-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .calendar,
    .event-panel {
      margin-top: 10rem;

      @media (max-width: $break-large) {
        margin-top: 5rem;
      }
    }
  }
}
</style>
