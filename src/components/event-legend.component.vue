<template>
  <div class="event-legend">
    <div class="event-legend__single-event">
      <div class="event-legend__single-event__color"></div>
      <span class="event-legend__single-event__name">
        Single Event
      </span>
    </div>
    <div class="event-legend__long-event">
      <div class="event-legend__long-event__color"></div>
      <span class="event-legend__long-event__name">
        Long Event
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'event-legend',
};
</script>

<style lang="scss" scoped>
.event-legend {
  height: 5rem;
  background-color: $white;
  font-size: 1.4rem;
  display: grid;

  &__single-event {
    display: flex;
    align-items: center;

    &__color {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 0.5rem;
      background-color: $blue;
      border-radius: $rounded-corners;
    }
  }

  &__long-event {
    display: flex;
    align-items: center;

    &__color {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 0.5rem;
      background-color: $purple;
    }
  }
}
</style>
