<template>
  <div class="creation-panel"
       :class="{'creation-panel--visible': isPanelVisible}">

    <h2 class="creation-panel__title">
      Create New Event
    </h2>

    <input class="creation-panel__event-name"
           type="text"
           placeholder="Event Name"
           v-model="name">

    <textarea class="creation-panel__event-description"
              placeholder="Event Description"
              v-model="description">
    </textarea>

    <input class="creation-panel__event-datepicker"
           type="date"
           v-model="date">

    <span class="creation-panel__message"
          :class="{'creation-panel__message--success': isSuccess,
                   'creation-panel__message--warning': isWarning}">
      {{ message }}
    </span>

    <div class="creation-panel__button-wrapper">
      <button class="creation-panel__create"
              @click="createEvent">
        Create
      </button>

      <button class="creation-panel__close"
              @click="closePanel">
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create-event',
  data() {
    return {
      isVisible: false,
      message: '',
      isSuccess: false,
      isWarning: false,
      name: '',
      description: '',
      date: '',
    };
  },
  computed: {
    isPanelVisible() {
      return this.$store.state.isPanelVisible;
    },
  },
  methods: {
    closePanel() {
      this.$store.state.isPanelVisible = false;
      this.message = '';
    },
    createEvent() {
      if (this.name && this.date) {
        const idList = this.$store.state.events.map(event => event.id);
        const event = {
          id: Math.max.apply(null, idList) + 1,
          name: this.name,
          description: this.description,
          date: this.date,
        };
        this.$store.state.events.push(event);
        this.message = 'Event has been created successfully';
        this.isWarning = false;
        this.isSuccess = true;
      } else {
        this.message = 'Complete the missing fields';
        this.isWarning = true;
        this.isSuccess = false;
      }
      this.name = '';
      this.description = '';
      this.date = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.creation-panel {
  width: 32rem;
  height: 100%;
  background-color: $white;
  border-left: 3px solid $blue;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  &__title {
    font-size: 2.2rem;
    font-weight: 400;
    margin: 2rem 0;
  }

  &__event-name,
  &__event-description,
  &__event-datepicker {
    font-family: inherit;
    font-size: 1.6rem;
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;

    &:focus {
      outline-color: $blue;
    }
  }

  &__event-description {
    resize: none;
    min-height: 20rem;
  }

  &__message {
    font-size: 1.4rem;

    &--success {
      color: #2ECC40;
    }

    &--warning {
      color: #FF4136;
    }
  }

  &__create,
  &__close {
    font-size: 1.4rem;
    letter-spacing: $primary-spacing;
    background-color: $white;
    color: $blue;
    border: 2px solid $blue;
    padding: 0.8rem 1.4rem;
    cursor: pointer;
    transition: .5s;

    &:hover {
      background-color: $blue;
      color: $white;
    }

    &:focus {
      outline: none;
    }
  }

  &__button-wrapper {
    margin-top: 2rem;

    :first-child {
      border-radius: 0.5rem 0 0 0.5rem;
    }

    :last-child {
      border-left: none;
      border-radius: 0 0.5rem 0.5rem 0;
    }
  }
}
</style>
