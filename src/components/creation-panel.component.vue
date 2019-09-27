<template>
  <div class="creation-panel"
       :class="{'creation-panel--visible': isPanelVisible}">

    <h2 class="creation-panel__title">
      Create New Event
    </h2>

    <input class="creation-panel__event-name"
           type="text"
           placeholder="Event Name">

    <textarea class="creation-panel__event-description"
              placeholder="Event Description">
    </textarea>

    <input class="creation-panel__event-datepicker"
           type="date">

    <span class="creation-panel__close"
          @click="closePanel">
      close panel
    </span>
  </div>
</template>

<script>
export default {
  name: 'create-event',
  data() {
    return {
      isVisible: false,
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

  &__close {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    font-size: 2rem;
    cursor: pointer;
    transition: .3s;

    &:hover {
      color: $blue;
    }
  }
}
</style>
