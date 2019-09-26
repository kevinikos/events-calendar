<template>
  <div class="calendar">
    <event-legend />

    <div class="calendar__month-switcher">
      <img class="month-switcher__button"
           src="@/assets/icons/left-arrow/left-arrow.svg"
           alt="left arrow"
           @click="previousMonth">

      <span class="month-switcher__current-date">
        {{ month }} {{ year }}
      </span>

      <img class="month-switcher__button"
           src="@/assets/icons/right-arrow/right-arrow.svg"
           alt="right arrow"
           @click="nextMonth">

    </div>
    <ul class="calendar__fields">
      <li class="calendar__weekday-name"
          v-for="weekday in weekdays">

        {{ weekday }}
      </li>
      <li class="calendar__another-month-day"
          v-for="day in includePrevMonth">

      </li>
      <li class="calendar__current-month-day"
          v-for="day in daysInMonth"
          :class="{'calendar__current-month-day--current-day': markToday(day),
                   'calendar__current-month-day--event-day': markSingleEvent(day),
                   'calendar__current-month-day--long-event-day': markLongEvent(day),
                   'calendar__current-month-day--selected-day': markSelectedField(day)}"

          @click="selectField(day)">

        {{ day }}
      </li>
      <li class="calendar__another-month-day"
          v-for="day in includeNextMonth">

        {{ day }}
      </li>
    </ul>
  </div>
</template>

<script>
import moment      from 'moment';
import EventLegend from './event-legend.component.vue';

export default {
  name: 'calendar',
  components: {
    EventLegend,
  },
  data() {
    return {
      today: moment(),
      dateContext: moment(),
      weekdays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      selected: {
        day: moment()
          .get('date'),
        month: moment()
          .format('MMMM'),
        year: moment()
          .format('Y'),
      },
    };
  },
  mounted() {
    this.$store.state.selectedDate = `${this.initialYear}-${this.dateContext.format('M')}-${this.initialDate}`;
  },
  computed: {
    initialYear() {
      return this.today.format('Y');
    },
    initialMonth() {
      return this.today.format('MMMM');
    },
    initialDate() {
      return this.today.get('date');
    },
    year() {
      return this.dateContext.format('Y');
    },
    month() {
      return this.dateContext.format('MMMM');
    },
    date() {
      return this.dateContext.get('date');
    },
    daysInMonth() {
      return this.dateContext.daysInMonth();
    },
    includePrevMonth() {
      return moment(this.dateContext)
        .subtract((this.date - 1), 'days')
        .weekday();
    },
    includeNextMonth() {
      const calendarFields = 42;
      return calendarFields - (this.daysInMonth + this.includePrevMonth);
    },
  },
  methods: {
    nextMonth() {
      this.dateContext = moment(this.dateContext)
        .add(1, 'month');
    },
    previousMonth() {
      this.dateContext = moment(this.dateContext)
        .subtract(1, 'month');
    },
    markToday(day) {
      return this.initialDate === day
        && this.initialMonth === this.month
        && this.initialYear === this.year;
    },
    markSingleEvent(day) {
      const { events } = this.$store.state;
      const fullDate = `${this.year}-${this.month}-${day}`;
      const fieldEvents = events.filter(event => moment(fullDate)
        .isSame(event.date));
      return fieldEvents.length;
    },
    markLongEvent(day) {
      const { events } = this.$store.state;
      const fullDate = `${this.year}-${this.month}-${day}`;
      const fieldEvents = events.filter(event => moment(fullDate)
        .isBetween(event.dateStart, event.dateEnd));
      return fieldEvents.length;
    },
    markSelectedField(day) {
      return this.selected.year === this.year
        && this.selected.month === this.month
        && this.selected.day === day;
    },
    selectField(day) {
      this.selected.day = day;
      this.selected.month = this.month;
      this.selected.year = this.year;
      this.$store.commit('selectField', {
        year: this.year,
        month: this.dateContext.format('M'),
        day,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  width: 70rem;
  height: 50rem;
  padding: 1rem;
  background-color: $white;
  box-shadow: $box-shadow;
  position: relative;

  .event-legend {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  &__month-switcher {
    font-size: 2.4rem;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .month-switcher {
      &__current-date {
        width: 24rem;
        text-align: center;
      }

      &__button {
        height: 2.4rem;;
        cursor: pointer;
      }
    }
  }

  &__fields {
    font-size: 1.4rem;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
  }

  &__weekday-name,
  &__another-month-day,
  &__current-month-day {
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__weekday-name {
    background-color: $mint;
    color: $white;
    font-weight: 700;
    margin: 0.25rem 0;
  }

  &__another-month-day {
    background-color: $grey-300;
    opacity: 0.8;
    margin: 0.25rem;
  }

  &__current-month-day {
    margin: 0.25rem;

    &--current-day {
      position: relative;

      &::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-top: 2rem solid $mint;
        border-right: 2rem solid transparent;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    &--event-day {
      background-color: $purple;
      color: $white;
    }

    &--long-event-day {
      background-color: $blue;
      color: $white;
    }

    &:hover {
      border: 3px solid $mint;
      cursor: pointer;
    }

    &--selected-day {
      border: 3px solid $mint;
    }
  }
}

</style>
