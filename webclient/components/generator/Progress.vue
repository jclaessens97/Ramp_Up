<template>
  <div class="d-flex flex-column">
    <div v-for="status in statusses" :key="status.id">
      <v-progress-circular
        v-if="isActive(status)"
        indeterminate
        color="primary"
      />
      <v-icon large color="green" v-if="isDone(status)">far fa-check-circle</v-icon>
      <v-icon color="red" v-if="isFailed(status)">far fa-times-circle</v-icon>

      <span class="ml-2">{{ $vuetify.lang.t(getText(status)) }}...</span>
    </div>
  </div>
</template>

<script>
import ProgressState from '~/data/progressState';

export default {
  props: {
    progress: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    statusses: [{
      id: 0,
      text: '$vuetify.generator.retrievingLikedTracks',
      textDone: '$vuetify.generator.retrievedLikedTracks',
      textFailed: '$vuetify.generator.failedRetrievingLikedTracks',
    }],
  }),
  methods: {
    isActive(status) {
      return this.progress.find((p) => p.id === status.id).status === ProgressState.ACTIVE;
    },
    isDone(status) {
      return this.progress.find((p) => p.id === status.id).status === ProgressState.DONE;
    },
    isFailed(status) {
      return this.progress.find((p) => p.id === status.id).status === ProgressState.FAILED;
    },
    getText(status) {
      if (this.isDone(status)) {
        return status.textDone;
      }

      if (this.isFailed(status)) {
        return status.textFailed;
      }

      return status.text;
    },
  },
};
</script>
