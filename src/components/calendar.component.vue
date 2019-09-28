<template>
  <div class="calendar">
    <event-legend />

    <span class="calendar__create-event"
          @click="openPanel">
      create event
    </span>

    <creation-panel />

    <div class="calendar__month-switcher">
      <img class="month-switcher__button"
           src="@/assets/icons/left-arrow/left-arrow.svg"
           alt="left arrow"
           @click="switchToPrevMonth">

      <span class="month-switcher__current-date">
        {{ monthName }} {{ year }}
      </span>

      <img class="month-switcher__button"
           src="@/assets/icons/right-arrow/right-arrow.svg"
           alt="right arrow"
           @click="switchToNextMonth">

    </div>
    <ul class="calendar__fields">
      <li class="calendar__weekday-name"
          v-for="weekday in weekdays">

        {{ weekday }}
      </li>

      <li class="calendar__current-month"
          v-for="day in includePrevMonth"
          @click="switchToPrevMonth"
          :class="{'calendar__current-month--grayed-out': true,
                   'calendar__current-month--single-event'
                   : markSingleEvent(day, checkPrevMonth, checkPrevYear),
                   'calendar__current-month--long-event'
                   : markLongEvent(day, checkPrevMonth, checkPrevYear)}">

        {{ day }}
      </li>

      <li class="calendar__current-month"
          v-for="day in daysInMonth"
          @click="selectField(day)"
          :class="{'calendar__current-month--current-day': markToday(day),
                   'calendar__current-month--single-event': markSingleEvent(day, month, year),
                   'calendar__current-month--long-event': markLongEvent(day, month, year),
                   'calendar__current-month--selected-day': markSelectedField(day)}">

        {{ day }}
      </li>

      <li class="calendar__current-month"
          v-for="day in includeNextMonth"
          @click="switchToNextMonth"
          :class="{'calendar__current-month--grayed-out': true,
                   'calendar__current-month--single-event'
                   : markSingleEvent(day, checkNextMonth, checkNextYear),
                   'calendar__current-month--long-event'
                   : markLongEvent(day, checkNextMonth, checkNextYear)}">

        {{ day }}
      </li>
    </ul>
  </div>
</template>

<script>
import moment        from 'moment';
import EventLegend   from './event-legend.component.vue';
import CreationPanel from './creation-panel.component.vue';

export default {
  name: 'calendar',
  components: {
    EventLegend,
    CreationPanel,
  },
  data() {
    return {
      today: moment(),
      dateContext: moment(),
      dateContextSupp: moment(),
      weekdays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      selected: {
        day: moment()
          .get('date'),
        month: moment()
          .format('MM'),
        year: moment()
          .format('Y'),
      },
    };
  },
  mounted() {
    this.$store.state.selectedDate = `${this.selected.year}-${this.selected.month}-${this.selected.day}`;
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
      return this.dateContext.format('MM');
    },
    monthName() {
      return this.dateContext.format('MMMM');
    },
    date() {
      return this.dateContext.get('date');
    },
    daysInMonth() {
      return this.dateContext.daysInMonth();
    },
    includePrevMonth() {
      const endOfPrevMonth = moment(this.dateContext)
        .subtract(1, 'months')
        .endOf('month')
        .get('date');
      const numberOfDays = moment(this.dateContext)
        .subtract((this.date - 1), 'days')
        .weekday();
      const startDay = endOfPrevMonth - numberOfDays;
      const days = [];
      for (let i = startDay + 1; i <= endOfPrevMonth; i++) {
        days.push(i);
      }
      return days;
    },
    includeNextMonth() {
      const calendarFields = 42;
      return calendarFields - (this.daysInMonth + this.includePrevMonth.length);
    },
    checkPrevMonth() {
      const prevMonth = parseInt(this.month, 10) - 1;
      return prevMonth === 0 ? 12 : prevMonth;
    },
    checkNextMonth() {
      const nextMonth = parseInt(this.month, 10) + 1;
      return nextMonth === 13 ? 1 : nextMonth;
    },
    checkPrevYear() {
      const year = parseInt(this.year, 10);
      return this.checkPrevMonth === 12 ? year - 1 : year;
    },
    checkNextYear() {
      const year = parseInt(this.year, 10);
      return this.checkNextMonth === 1 ? year + 1 : year;
    },
  },
  methods: {
    switchToNextMonth() {
      this.dateContext = moment(this.dateContext)
        .add(1, 'month');
    },
    switchToPrevMonth() {
      this.dateContext = moment(this.dateContext)
        .subtract(1, 'month');
    },
    markToday(day) {
      return this.initialDate === day
        && this.initialMonth === this.monthName
        && this.initialYear === this.year;
    },
    markSingleEvent(day, month, year) {
      const { events } = this.$store.state;
      const fullDate = `${year}-${month}-${day}`;
      const fieldEvents = events.filter(event => moment(fullDate)
        .isSame(event.date));
      return fieldEvents.length;
    },
    markLongEvent(day, month, year) {
      const { events } = this.$store.state;
      const fullDate = `${year}-${month}-${day}`;
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
        month: this.month,
        day,
      });
    },
    openPanel() {
      this.$store.state.isPanelVisible = true;
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
  overflow: hidden;
  position: relative;

  .event-legend {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  &__create-event {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    cursor: pointer;
    transition: .3s;

    &:hover {
      color: $mint;
    }
  }

  .creation-panel {
    position: absolute;
    top: 0;
    right: -32rem;
    transition: .5s ease-in-out;;

    &--visible {
      right: 0
    }
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
  &__current-month {
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

  &__current-month {
    margin: 0.25rem;
    border: 1px solid $grey-300;

    &--current-day {
      position: relative;

      &::before {
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

    &--grayed-out {
      opacity: 0.4;
      margin: 0.25rem;
      background-color: $grey-300;
    }

    &--single-event {
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: $rounded-corners;
        background-color: $blue;
        color: $white;
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
      }
    }

    &:hover {
      border: 3px solid $mint;
      cursor: pointer;
    }

    &--selected-day {
      border: 3px solid $mint;
    }

    &--long-event {
      background-color: $purple;
      color: $white;
    }
  }
}
</style>
