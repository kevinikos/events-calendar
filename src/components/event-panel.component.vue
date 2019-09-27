<template>
  <div class="event-panel">
    <div class="event-panel__heading">
      <h1 class="event-panel__title">
        Scheduled Events
      </h1>

      <img class="event-panel__icon"
           src="@/assets/icons/schedule/schedule.svg"
           alt="schedule icon">

    </div>

    <h2 class="event-panel__event-date">
      {{ selectedDate }}
    </h2>

    <div class="event-panel__event-list"
         v-if="allEvents.length">

      <div class="event-panel__event-details"
           v-for="(event, index) in allEvents"
           :key="index">

        <h2 class="event-details__event-name">
          {{ event.name }}
        </h2>

        <div class="single-event-underline"
             v-if="event.date">
        </div>

        <div class="long-event-underline"
             v-else>
        </div>

        <p class="event-details__event-description">
          {{ event.description }}
        </p>

        <span class="remove-btn"
              @click="removeEvent(event.id)">
          &#10006;
        </span>
      </div>
    </div>

    <div class="event-panel__no-events"
         v-else>

      <span class="event-panel__no-events__message">
        There aren't any events scheduled for this day
      </span>

      <img class="event-panel__no-events__avatar"
           src="@/assets/images/campfire/campfire.gif"
           alt="campfire image">

    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'event-panel',
  computed: {
    selectedDate() {
      return this.$store.state.selectedDate;
    },
    availableSingleEvents() {
      const { events } = this.$store.state;
      return events.filter(event => moment(this.selectedDate)
        .isSame(event.date));
    },
    availableLongEvents() {
      const { events } = this.$store.state;
      return events.filter(event => moment(this.selectedDate)
        .isBetween(event.dateStart, event.dateEnd));
    },
    allEvents() {
      return this.availableSingleEvents.concat(this.availableLongEvents);
    },
  },
  methods: {
    removeEvent(id) {
      this.$store.commit('removeEvent', id);
    },
  },
};
</script>


<style lang="scss" scoped>
.event-panel {
  width: 40rem;
  height: 60rem;
  padding: 1rem;
  background-color: $white;
  box-shadow: $box-shadow;
  overflow: hidden;
  position: relative;

  &__heading {
    height: 8rem;
    @include center-element;
  }

  &__title {
    font-size: 2.4rem;
    font-weight: 400;
    margin-right: 1rem;
  }

  &__icon {
    height: 3rem;
  }

  &__event-date {
    height: 5rem;
    font-size: 2rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: $primary-spacing;
    color: $white;
    background-color: $mint;
    @include center-element;
  }

  &__event-list {
    padding: 0 1rem;
    max-height: 44rem;
    overflow-y: auto;
  }

  &__event-details {
    margin: 1.5rem 0;
    padding: 2rem;
    min-height: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    position: relative;

    .event-details {
      &__event-name {
        font-size: 2rem;
        font-weight: 400;
        letter-spacing: $primary-spacing;
      }

      &__event-description {
        font-size: 1.2rem;
      }
    }

    .single-event-underline,
    .long-event-underline {
      margin: 0.5rem 0 2rem;
      height: 0.6rem;
      width: 100%;
    }

    .single-event-underline {
      background-color: $blue;
    }

    .long-event-underline {
      background-color: $purple;
    }

    .remove-btn {
      font-size: 1.8rem;
      position: absolute;
      top: 0.5rem;
      right: 0.8rem;
      cursor: pointer;
      transition: .3s;
    }
  }

  &__no-events {
    width: 32rem;
    margin: 15rem auto;
    text-align: center;

    &__message {
      font-size: 2rem;
      color: $grey-900;
    }

    &__avatar {
      height: 40%;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-47%, 0);
    }
  }
}
</style>
